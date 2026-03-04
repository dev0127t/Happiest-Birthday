import HeroSection from "./components/HeroSection";
import ReelSection from "./components/ReelSection";
import ScrollContainer from "./components/ScrollContainer";

export default function Home() {
  return (
    <ScrollContainer>
      <HeroSection />
      <ReelSection />
    </ScrollContainer>
  );
}
