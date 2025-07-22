import React, { useState } from "react";
import { Link } from "react-router-dom";
import SEO from "../components/common/SEO";

import CallToActionCarousel from "../components/home/CallToActionCarousel";
import VisionMissionSection from "../components/home/VisionMissionSection";
import ImpactSection from "../components/home/ImpactSection";

import { Button } from "../components/common/Button";
import DonationModal from "../components/common/DonationModal";
import SpecificNeedsSection from "../components/home/SpecificNeedsSection";
import FaqSection from "../components/common/FaqSection";
import HomeGallery from "../components/home/HomeGalleryGrid";
import HomeVideoSection from "../components/home/HomeVideoSection";

const BackgroundShapes = () => (
  <div className="absolute top-0 right-0 h-full w-1/2 -z-10" aria-hidden="true">
    <div className="absolute top-1/4 -right-1/4 h-64 w-64 bg-brand-sky-blue/10 rounded-full blur-3xl"></div>
    <div className="absolute bottom-1/4 -right-1/3 h-80 w-80 bg-brand-rose/10 rounded-full blur-3xl"></div>
  </div>
);
const HomePage: React.FC = () => {
  const [isDonationModalOpen, setIsDonationModalOpen] = useState(false);
  const [initialAmount, setInitialAmount] = useState<number | undefined>();

  const openDonationModal = (amount?: number) => {
    setInitialAmount(amount); 
    setIsDonationModalOpen(true);
  };
  return (
    <div className="bg-white">
      <SEO
        title="Home"
        description="Join Hope Behind Bars in our mission to empower incarcerated women and their children with dignity, education, and hope. Donate or volunteer today to make a difference."
        url="/"
      />
      <DonationModal
        isOpen={isDonationModalOpen}
        onClose={() => setIsDonationModalOpen(false)}
        initialAmount={initialAmount}
      />
      {/* 1. Hero Section */}

      <section
        id="home"
        className="relative bg-white py-16 sm:py-20 lg:py-28 overflow-hidden "
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 w-11/12 flex items-center justify-center">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left Column: Headline */}
            <div className="text-left">
              <h1 className="font-display text-5xl sm:text-6xl md:text-7xl font-extrabold text-brand-dark-gray tracking-tighter">
                Behind Bars.
                <br />
                <span className="bg-gradient-to-r from-brand-sky-blue to-brand-rose bg-clip-text text-transparent">
                  Beyond Limits.
                </span>
              </h1>
            </div>

            {/* Right Column: Description and CTAs */}
            <div className="flex flex-col gap-8 text-left">
              <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
                We empower incarcerated women in Ethiopia with essential skills,
                vital support, and a true second chance—fostering
                entrepreneurship and hope from within prison walls.
              </p>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <Button onClick={() => setIsDonationModalOpen(true)}>
                  Donate Now
                </Button>

                <Link to="/join-team">
                  <button className="font-semibold text-brand-dark-gray/80 hover:text-brand-dark-gray py-3 border-brand-dark-gray/20 border-[.2px]  px-6 rounded-lg hover:border-brand-dark-gray/40 transition-colors duration-300">
                    Become a Partner →
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <BackgroundShapes />
      </section>

      <section className="w-full flex items-center justify-center ">
        <CallToActionCarousel onDonateClick={openDonationModal} />
      </section>
      <section className="w-full flex items-center justify-center ">
        <VisionMissionSection />
      </section>

      <ImpactSection />
      <SpecificNeedsSection />

      <section className="w-full flex items-center justify-center">
        <HomeGallery />
      </section>
      {/* <HomeGalleryGrid /> */}
      <HomeVideoSection />
      <FaqSection />
    </div>
  );
};

export default HomePage;
