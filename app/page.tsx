import AnimatedHero from "@/components/Home/HeroSection/HeroSection";
import Navbar from "@/components/Home/Navbar/Navbar";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <Navbar />
      <AnimatedHero />
    </div>
  );
}
