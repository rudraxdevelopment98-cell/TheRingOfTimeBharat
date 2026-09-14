import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { getBookPrice } from "@/lib/pricing";
import { getPurchaseDelegate, PRISMA_GENERATE_HINT } from "@/lib/purchase-client";

export const runtime = "nodejs";

export async function GET(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) {
    return NextResponse.json({ error: "Authentication required" }, { status: 401 });
  }

  const bookId = params.id;

  try {
    const { prisma } = await import("@/lib/prisma");

    const book = await prisma.book.findUnique({
      where: { id: bookId },
      select: { id: true, title: true, slug: true, priceCents: true, isDownloadable: true },
    });

    if (!book) {
      return NextResponse.json({ error: "Book not found" }, { status: 404 });
    }

    const priceCents = getBookPrice(book);

    const purchaseModel = getPurchaseDelegate(prisma);
    if (!purchaseModel) {
      return NextResponse.json({ error: PRISMA_GENERATE_HINT }, { status: 503 });
    }

    const purchase = await purchaseModel.findFirst({
      where: { userId, bookId, status: "COMPLETED" },
    });

    if (!purchase) {
      return NextResponse.json(
        { error: "Purchase required", priceCents },
        { status: 403 }
      );
    }

    await purchaseModel.update({
      where: { id: purchase.id },
      data: { downloadCount: { increment: 1 } },
    });

    /* ================================================================
     * INTEGRATION POINT — time-limited Cloudflare R2 presigned URL
     * ================================================================
     * `@aws-sdk/client-s3` is already a dependency; add
     * `@aws-sdk/s3-request-presigner` and replace the placeholder below:
     *
     *   import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
     *   import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
     *
     *   const r2 = new S3Client({
     *     region: "auto",
     *     endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
     *     credentials: {
     *       accessKeyId: process.env.R2_ACCESS_KEY_ID!,
     *       secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
     *     },
     *   });
     *
     *   const downloadUrl = await getSignedUrl(
     *     r2,
     *     new GetObjectCommand({
     *       Bucket: process.env.R2_BUCKET_NAME!,
     *       Key: `summaries/${book.slug}.pdf`,
     *       ResponseContentDisposition:
     *         `attachment; filename="${book.slug}.pdf"`,
     *     }),
     *     { expiresIn: 300 } // 5 minutes — keep links short-lived
     *   );
     *
     * Serve EPUB the same way from `summaries/${book.slug}.epub` (accept a
     * `?format=epub` query param).
     * ================================================================ */
    const downloadUrl: string | null = null;

    return NextResponse.json({
      downloadUrl,
      bookId: book.id,
      title: book.title,
      downloadCount: purchase.downloadCount + 1,
      note: downloadUrl
        ? undefined
        : "File storage is not configured yet — wire up the Cloudflare R2 presigner in this route.",
    });
  } catch {
    return NextResponse.json({ error: "Database not connected" }, { status: 503 });
  }
}
