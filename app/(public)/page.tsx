import { HeroSection } from "@/components/home/HeroSection";
import { FeaturedCollections } from "@/components/home/FeaturedCollections";
import { DiscoveryFeed } from "@/components/home/DiscoveryFeed";
import { StatsBar } from "@/components/home/StatsBar";
import { FeaturedQuote } from "@/components/home/FeaturedQuote";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StatsBar />
      <FeaturedCollections />
      <FeaturedQuote />
      <DiscoveryFeed />
    </>
  );
}
