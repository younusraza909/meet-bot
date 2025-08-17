import CTASection from "./components/landing/CTASection";
import FeaturesSection from "./components/landing/FeaturesSection";
import Footer from "./components/landing/Footer";
import HeroSection from "./components/landing/HeroSection";
import HowItWorksSection from "./components/landing/HowItWorksSection";
import IntegrationsSection from "./components/landing/IntegrationsSection";
import MoreFeaturesSection from "./components/landing/MoreFeaturesSection";
import StatsSection from "./components/landing/StatsSection";

export default function Home() {
  return (
    <div className="min-h-screen bg-black">
      <HeroSection />
      <FeaturesSection />
      <IntegrationsSection />
      <HowItWorksSection />
      <StatsSection />
      <MoreFeaturesSection />
      <CTASection />
      <Footer />
    </div>
  );
}
