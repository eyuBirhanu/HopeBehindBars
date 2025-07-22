import React, { useState } from "react";
const faqData = [
  {
    id: "q1",
    question: "How can I make a donation?",
    answer:
      "You can make a donation through multiple secure methods. Our primary method is via Card or PayPal through our integrated Stripe payment system. We also provide details for local bank transfers within Ethiopia and maintain a GoFundMe campaign for broader support.",
  },
  {
    id: "q2",
    question: "Is my donation tax-deductible?",
    answer:
      "Yes, 'Hope Behind Bars' is a registered non-profit organization. All donations are tax-deductible to the extent permitted by law. You will receive an official receipt via email after your donation is processed, which you can use for your tax records.",
  },
  {
    id: "q3",
    question: "Can I donate in honor or memory of someone?",
    answer:
      "Absolutely. During the final step of the Stripe checkout process, there is an option to add a note or dedication. Please specify the name of the person you wish to honor, and we will ensure the donation is recognized accordingly.",
  },
  {
    id: "q4",
    question: "How will my donation be used?",
    answer:
      "100% of your donation goes directly to our programs. This includes purchasing essential supplies like hygiene kits and baby care packages, funding vocational skills training like our sewing workshops, and providing start-up kits for women to build a better future upon release.",
  },
  {
    id: "q5",
    question: "Can I set up a recurring donation?",
    answer:
      "Yes! Recurring monthly donations are the most effective way to provide stable, ongoing support. In our donation pop-up, simply select the 'Monthly' option before choosing your amount. This allows us to plan our programs more effectively.",
  },
];

interface FaqItemProps {
  item: { id: string; question: string; answer: string };
  isOpen: boolean;
  onToggle: () => void;
}

const FaqItem: React.FC<FaqItemProps> = ({ item, isOpen, onToggle }) => {
  return (
    <div className="border-b border-gray-200 py-6">
      <button
        onClick={onToggle}
        className="flex justify-between items-center w-full text-left"
        aria-expanded={isOpen}
      >
        <h3 className="text-lg font-medium text-brand-dark-gray">
          {item.question}
        </h3>
        <span className="text-2xl text-gray-400 transform transition-transform duration-300">
          {isOpen ? "−" : "+"}
        </span>
      </button>

      <div
        className={`grid transition-all duration-500 ease-in-out ${
          isOpen
            ? "grid-rows-[1fr] opacity-100 pt-4"
            : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <p className="text-gray-600 leading-relaxed">{item.answer}</p>
        </div>
      </div>
    </div>
  );
};

const FaqSection: React.FC = () => {
  const [openQuestionId, setOpenQuestionId] = useState<string | null>(null);

  const handleToggle = (id: string) => {
    setOpenQuestionId(openQuestionId === id ? null : id);
  };

  return (
    <section className="bg-white py-20 md:py-28">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-brand-dark-gray">
            Frequently Asked Questions.
          </h2>
          <div className="mt-8">
            {faqData.map((item) => (
              <FaqItem
                key={item.id}
                item={item}
                isOpen={openQuestionId === item.id}
                onToggle={() => handleToggle(item.id)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
