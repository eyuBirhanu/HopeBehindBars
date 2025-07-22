import React from "react";

const AboutHero = () => (
  <section
    id="vision-mission"
    className="bg-white flex justify-center py-20 md:py-28"
  >
    <div className="container w-11/12 mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-12 items-start">
        <div className="md:col-span-3 text-left">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-brand-sky-blue">
            Our Vision
          </h2>
          <p className="mt-2 font-display text-4xl lg:text-5xl font-bold text-brand-dark-gray">
            A society that protects dignity, upholds justice, and fosters safer
            communities for all.
          </p>
        </div>
        <div className="md:col-span-2 text-left md:pt-1">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-brand-sky-blue">
            Our Mission
          </h2>
          <p className="mt-2 text-xl text-gray-600 leading-relaxed">
            We are closing the justice and inequality gap using legal support,
            evidence-based advocacy, and technology.
          </p>
        </div>
      </div>
    </div>
  </section>
);

export default AboutHero;
