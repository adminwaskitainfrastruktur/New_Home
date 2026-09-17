import { HomeHero } from "@/components/home/HomeHero";
import {
  AboutTeaser,
  BusinessLinesGrid,
  ClosingCta,
  FeaturedProjects,
  NewsTeaser,
  SustainabilityBand,
  WhyChooseUs,
} from "@/components/home/HomeSections";

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <AboutTeaser />
      <BusinessLinesGrid />
      <FeaturedProjects />
      <WhyChooseUs />
      <NewsTeaser />
      <SustainabilityBand />
      <ClosingCta />
    </>
  );
}
