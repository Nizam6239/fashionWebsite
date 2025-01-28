import { CardFile } from "./components/CardFile";
import Footer from "./components/Footer";
import HeroSection from "./components/HeroSection";
import MovingCard from "./components/MovingCard";
import MovingImage from "./components/MovingImage";
import { RandomCard } from "./components/RandomCard";

export default function Home() {
  return (
    <main className="min-h-screen bg-black/[0.96] antialiased bg-grid-white/[0.02]">
      <HeroSection />
      <MovingCard />
      <CardFile />
      <RandomCard />
      <MovingImage />
    </main>
  );
}
