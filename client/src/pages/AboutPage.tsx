import React from "react";

import AboutHero from "../components/about/AboutHero";
import FounderQuote from "../components/about/FounderQuote";
import FounderSection from "../components/about/FounderSection";
import CoreValuesSection from "../components/about/CoreValuesSection";
// import TeamSection from "../components/about/TeamSection";
import BoardSection from "../components/about/BoardSection";
import SEO from "../components/common/SEO";

const AboutPage: React.FC = () => {
  return (
    <main>
      <SEO
        title="About Us"
        description="Learn about our vision, mission, and the dedicated team behind Hope Behind Bars. Discover the story that drives our commitment to justice and rehabilitation."
        url="/about"
      />
      <AboutHero />
      <FounderQuote />
      <FounderSection />
      <CoreValuesSection />
      <BoardSection />
      {/* will be added in future  */}
      {/* <TeamSection /> */}
    </main>
  );
};

export default AboutPage;
