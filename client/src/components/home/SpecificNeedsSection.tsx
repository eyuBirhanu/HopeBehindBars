import React, { useState } from "react";
import SectionIndicator from "../common/SectionIndicator";
import NeedCard from "./NeedCard";
import DonationModal from "../common/DonationModal";

const needsData = [
  {
    imageUrl:
      "https://images.unsplash.com/photo-1542913019-7341c3d3f4d4?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "Child Support",
    title: "Provide a Child's Care Package",
    description:
      "Fund a package with diapers, formula, and clothing for a child living with their mother in prison.",
    goal: 2000,
    raised: 800,
    ctaText: "Donate $25",
    ctaAmount: 25,
    ctaColor: "rose",
  },
  {
    imageUrl:
      "https://images.unsplash.com/photo-1623578059518-bbdb071eab81?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "Skills Training",
    title: "Fund a Sewing Machine",
    description:
      "Contribute to purchasing a durable sewing machine for our vocational tailoring workshops.",
    goal: 5000,
    raised: 1000,
    ctaText: "Donate Now",
    ctaAmount: 50,
    ctaColor: "white",
  },
  {
    imageUrl:
      "https://images.unsplash.com/photo-1684604909475-5236cebcff87?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "Entrepreneurship",
    title: "Sponsor a Business Start-up Kit",
    description:
      "Provide a woman with the materials and tools to start her own small business upon release.",
    goal: 10000,
    raised: 400,
    ctaText: "Donate $100",
    ctaAmount: 100,
    ctaColor: "white",
  },
];

const SpecificNeedsSection: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [initialDonation, setInitialDonation] = useState<number | undefined>();

  const handleDonateClick = (amount: number) => {
    setInitialDonation(amount);
    setIsModalOpen(true);
  };

  return (
    <>
      <DonationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialAmount={initialDonation}
      />
      <section className="bg-neutral-light py-16 flex justify-center md:py-24">
        <div className="container w-11/12 mx-auto px-4">
          <div className="max-w-3xl mx-auto flex flex-col items-center  text-center mb-16">
            <SectionIndicator text="Ways to Give" />
            <h2 className="mt-4 font-display text-4xl md:text-5xl font-bold text-brand-dark-gray tracking-tight">
              Support a Specific Need
            </h2>
            <p className="mt-4 text-lg text-gray-500">
              Your contribution can directly fund a tangible item or program,
              making an immediate and measurable difference in a woman's life.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {needsData.map((need) => (
              <NeedCard
                key={need.title}
                imageUrl={need.imageUrl}
                category={need.category}
                title={need.title}
                description={need.description}
                goal={need.goal}
                raised={need.raised}
                progress={(need.raised / need.goal) * 100}
                ctaText={need.ctaText}
                ctaColor={need.ctaColor as "white" | "rose"}
                onDonateClick={() => handleDonateClick(need.ctaAmount)}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default SpecificNeedsSection;
