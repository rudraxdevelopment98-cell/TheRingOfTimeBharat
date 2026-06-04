"use client";

import { useEffect, useRef, useState } from "react";
import { Send, Sparkles, BookOpen, Loader2 } from "lucide-react";

interface AIChatWindowProps {
  bookTitle: string;
  authorName?: string;
  year?: string;
  genre?: string;
  language?: string;
  aiSummary?: string;
  themes?: string[];
}

type Role = "user" | "assistant";
interface Message {
  role: Role;
  content: string;
  error?: boolean;
}

const SUGGESTIONS = [
  "What are the major themes?",
  "Explain the historical context",
  "Who was this written for?",
  "Compare this to similar works",
];

export function AIChatWindow({
  bookTitle,
  authorName,
  year,
  genre,
  language,
  aiSummary,
  themes,
}: AIChatWindowProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [streaming, setStreaming] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, streaming]);

  async function sendMessage(text: string) {
    const trimmed = text.trim();
    if (!trimmed || streaming) return;

    const nextMessages: Message[] = [
      ...messages,
      { role: "user", content: trimmed },
    ];
    setMessages(nextMessages);
    setInput("");
    setStreaming(true);

    // Index where the assistant reply will live.
    const assistantIndex = nextMessages.length;

    try {
      const res = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          bookTitle,
          authorName,
          year,
          genre,
          language,
          aiSummary,
          themes,
          messages: nextMessages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      if (!res.ok || !res.body) {
        let errMsg = "Something went wrong reaching Bibliosphere AI.";
        try {
          const data = await res.json();
          if (data?.error) errMsg = data.error;
        } catch {
          /* non-JSON body */
        }
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: errMsg, error: true },
        ]);
        return;
      }

      // Seed an empty assistant message we'll progressively fill.
      setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

      const reader = res.body.getReader();
      const decoder = new TextDecoder();

      // eslint-disable-next-line no-constant-condition
      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        if (!chunk) continue;
        setMessages((prev) => {
          const updated = [...prev];
          const current = updated[assistantIndex];
          if (current && current.role === "assistant") {
            updated[assistantIndex] = {
              ...current,
              content: current.content + chunk,
            };
          }
          return updated;
        });
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "The connection was interrupted. Please try again.",
          error: true,
        },
      ]);
    } finally {
      setStreaming(false);
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    sendMessage(input);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  }

  const isEmpty = messages.length === 0;

  return (
    <div className="flex h-full flex-col">
      {/* Message list */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-4 py-6 sm:px-6"
      >
        {isEmpty ? (
          <div className="flex h-full flex-col items-center justify-center text-center">
            <div
              className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl"
              style={{
                backgroundColor: "var(--bg-elevated)",
                border: "1px solid var(--border)",
              }}
            >
              <BookOpen className="h-7 w-7" style={{ color: "var(--accent-gold)" }} />
            </div>
            <h3
              className="mb-2 text-2xl font-light"
              style={{
                fontFamily: "var(--font-cormorant)",
                color: "var(--text-primary)",
              }}
            >
              Begin your conversation
            </h3>
            <p
              className="mb-7 max-w-md text-sm"
              style={{
                color: "var(--text-muted)",
                fontFamily: "var(--font-source-serif)",
              }}
            >
              Ask anything about{" "}
              <span style={{ color: "var(--text-primary)" }}>{bookTitle}</span> —
              its themes, history, characters, or place in the literary canon.
            </p>
            <div className="flex flex-wrap justify-center gap-2.5">
              {SUGGESTIONS.map((q) => (
                <button
                  key={q}
                  type="button"
                  onClick={() => sendMessage(q)}
                  className="rounded-full border px-4 py-2 text-sm transition-opacity hover:opacity-80"
                  style={{
                    borderColor: "var(--border)",
                    color: "var(--text-muted)",
                    backgroundColor: "var(--bg-surface)",
                    fontFamily: "var(--font-dm-sans)",
                  }}
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="mx-auto flex max-w-2xl flex-col gap-6">
            {messages.map((m, i) =>
              m.role === "user" ? (
                <div key={i} className="flex justify-end">
                  <div
                    className="max-w-[85%] rounded-2xl rounded-br-md px-4 py-3 text-sm text-white"
                    style={{
                      backgroundColor: "var(--accent-primary)",
                      fontFamily: "var(--font-dm-sans)",
                    }}
                  >
                    <p className="whitespace-pre-wrap leading-relaxed">
                      {m.content}
                    </p>
                  </div>
                </div>
              ) : (
                <div key={i} className="flex flex-col items-start">
                  <div className="mb-1.5 flex items-center gap-1.5 pl-1">
                    <Sparkles
                      className="h-3.5 w-3.5"
                      style={{ color: "var(--accent-gold)" }}
                    />
                    <span
                      className="text-xs uppercase tracking-widest"
                      style={{
                        color: "var(--text-faint)",
                        fontFamily: "var(--font-dm-sans)",
                      }}
                    >
                      Bibliosphere AI
                    </span>
                  </div>
                  <div
                    className="max-w-[90%] rounded-2xl rounded-tl-md px-4 py-3 text-[15px]"
                    style={{
                      backgroundColor: "var(--bg-surface)",
                      border: "1px solid var(--border)",
                      color: m.error ? "var(--accent-secondary)" : "var(--text-primary)",
                      fontFamily: "var(--font-source-serif)",
                    }}
                  >
                    {m.content ? (
                      <p className="whitespace-pre-wrap leading-relaxed">
                        {m.content}
                      </p>
                    ) : (
                      <TypingDots />
                    )}
                  </div>
                </div>
              )
            )}
          </div>
        )}
      </div>

      {/* Input bar */}
      <form
        onSubmit={handleSubmit}
        className="sticky bottom-0 border-t px-4 py-3 sm:px-6"
        style={{
          borderColor: "var(--border)",
          backgroundColor: "var(--bg-base)",
        }}
      >
        <div
          className="mx-auto flex max-w-2xl items-end gap-2 rounded-2xl border px-3 py-2"
          style={{
            borderColor: "var(--border)",
            backgroundColor: "var(--bg-surface)",
          }}
        >
          <textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            rows={1}
            placeholder={`Ask about ${bookTitle}…`}
            disabled={streaming}
            className="max-h-40 flex-1 resize-none bg-transparent px-1 py-1.5 text-sm outline-none disabled:opacity-60"
            style={{
              color: "var(--text-primary)",
              fontFamily: "var(--font-dm-sans)",
            }}
          />
          <button
            type="submit"
            disabled={streaming || !input.trim()}
            aria-label="Send message"
            className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
            style={{ backgroundColor: "var(--accent-primary)" }}
          >
            {streaming ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

function TypingDots() {
  return (
    <span className="flex items-center gap-1 py-1" aria-label="Bibliosphere AI is typing">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="inline-block h-1.5 w-1.5 rounded-full"
          style={{
            backgroundColor: "var(--text-faint)",
            animation: "bibliosphere-bounce 1.2s infinite ease-in-out",
            animationDelay: `${i * 0.18}s`,
          }}
        />
      ))}
      <style>{`
        @keyframes bibliosphere-bounce {
          0%, 80%, 100% { opacity: 0.3; transform: translateY(0); }
          40% { opacity: 1; transform: translateY(-3px); }
        }
      `}</style>
    </span>
  );
}
