import Header from "@/components/Header";
import Hero from "@/components/Hero";
import MoodSpinner from "@/components/MoodSpinner";
import LiveNow from "@/components/LiveNow";
import ObserveSection from "@/components/ObserveSection";
import LearnSection from "@/components/LearnSection";
import DiscussSection from "@/components/DiscussSection";
import SupportSection from "@/components/SupportSection";
import PauseSection from "@/components/PauseSection";
import InTheAirSection from "@/components/InTheAirSection";
import CategoriesSection from "@/components/CategoriesSection";
import OnlineSpaceSection from "@/components/OnlineSpaceSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      <MoodSpinner />
      <LiveNow />
      <ObserveSection />
      <LearnSection />
      <DiscussSection />
      <SupportSection />
      <PauseSection />
      <InTheAirSection />
      <CategoriesSection />
      <OnlineSpaceSection />
      <Footer />
    </div>
  );
};

export default Index;
