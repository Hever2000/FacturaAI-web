import { Header } from '@/components/sections/header';
import { Hero } from '@/components/sections/hero';
import { Demo } from '@/components/sections/demo';
import { HowItWorks } from '@/components/sections/how-it-works';
import { Features } from '@/components/sections/features';
import { APISection } from '@/components/sections/api-section';
import { PricingSection } from '@/components/sections/pricing';
import { Footer } from '@/components/sections/footer';

export default function Home() {
  return (
    <main className="relative">
      <Header />
      <Hero />
      <Demo />
      <HowItWorks />
      <Features />
      <APISection />
      <PricingSection />
      <Footer />
    </main>
  );
}
