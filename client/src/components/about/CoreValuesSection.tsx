import React from "react";

const ValueIcon = ({ children }: { children: React.ReactNode }) => (
  <div className="flex-shrink-0 h-10 w-10 bg-brand-dark-blue/10 text-brand-dark-blue rounded-full flex items-center justify-center">
    {children}
  </div>
);
const HumanRightsIcon = () => (
  <ValueIcon>
    <svg
      className="w-5 h-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
      />
    </svg>
  </ValueIcon>
);
const OpennessIcon = () => (
  <ValueIcon>
    <svg
      className="w-5 h-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
      />
    </svg>
  </ValueIcon>
);
const PartnershipIcon = () => (
  <ValueIcon>
    <svg
      className="w-5 h-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M13 10V3L4 14h7v7l9-11h-7z"
      />
    </svg>
  </ValueIcon>
);

const coreValues = [
  {
    title: "Human Rights",
    description:
      "Our unwavering commitment to the inherent dignity and equality of every person.",
    icon: <HumanRightsIcon />,
  },
  {
    title: "Openness",
    description:
      "Cultivating a culture of transparency, inclusivity, integrity, and honest communication.",
    icon: <OpennessIcon />,
  },
  {
    title: "Partnership",
    description:
      "Uniting with government bodies, private entities, and communities to enhance our collective impact.",
    icon: <PartnershipIcon />,
  },
];

const CoreValuesSection = () => (
  <section id="values" className="bg-white flex justify-center py-20 md:py-28">
    <div className="container w-11/12 mx-auto px-4">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
        <div className="lg:col-span-1 text-left">
          <h2 className="font-display text-5xl font-bold text-brand-dark-gray">
            Our Core Values
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            These principles guide every decision we make and action we take.
          </p>
        </div>

        <div className="lg:col-span-2">
          <div className="space-y-10">
            {coreValues.map((value) => (
              <div key={value.title} className="flex items-start gap-6">
                {value.icon}
                <div>
                  <h3 className="text-xl font-bold text-brand-dark-gray">
                    {value.title}
                  </h3>
                  <p className="mt-1 text-gray-600">{value.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default CoreValuesSection;
