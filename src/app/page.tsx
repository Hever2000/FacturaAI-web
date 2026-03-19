import { Header } from "@/components/sections/header";
import { Hero } from "@/components/sections/hero";
import { HowItWorks } from "@/components/sections/how-it-works";
import { Demo } from "@/components/sections/demo";
import { Features } from "@/components/sections/features";
import { APISection } from "@/components/sections/api-section";
import { Footer } from "@/components/sections/footer";

export default function Home() {
  return (
    <main className="relative">
      <Header />
      <Hero />
      <HowItWorks />
      <Demo />
      <Features />
      <APISection />
      <Footer />
    </main>
  );
}
