import React from "react";
import { Link } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import CountUp from "react-countup";
import SectionIndicator from "../common/SectionIndicator";
import { Button } from "../common/Button";

const impactStats = [
  {
    value: 20,
    suffix: "+",
    label: "Prisons reached, providing vital support and educational programs.",
    link: "/impact/videos",
  },
  {
    value: 50000,
    suffix: "+",
    label:
      "Essential products distributed, restoring dignity one woman at a time.",
    link: "/impact/gallery",
  },
  {
    value: 800,
    suffix: "+",
    label:
      "Children of incarcerated mothers supported through our family programs.",
    link: "/about#theory-of-change",
  },
];

const ImpactSection: React.FC = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  return (
    <section ref={ref} className="bg-neutral-light py-20 md:py-28">
      <div className="container w-11/12 mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-md p-8 md:p-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-left">
              <SectionIndicator text="Our Impact" />
              <h2 className="mt-4 font-display text-4xl md:text-5xl font-bold text-brand-dark-gray tracking-tight">
                Quantifying Hope.{" "}
                <span className="text-brand-rose">Measuring Change.</span>
              </h2>
            </div>
            <div className="hidden lg:flex lg:justify-end">
              <Link to="/impact/gallery">
                <Button size="lg">See Our Full Impact</Button>
              </Link>
            </div>
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {impactStats.map((stat, index) => (
              <div
                key={index}
                className="relative bg-gray-50 rounded-xl p-6 group overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2"
              >
                <div className="flex flex-col h-full">
                  <p className="text-5xl lg:text-6xl font-bold text-brand-dark-blue tracking-tighter">
                    {inView ? <CountUp end={stat.value} duration={2.5} /> : "0"}
                    {stat.suffix}
                  </p>
                  <p className="mt-4 text-gray-600 flex-grow">{stat.label}</p>
                  <div className="absolute bottom-0 left-0 w-full p-6 pt-12 bg-gradient-to-t from-gray-50 via-gray-50 to-transparent transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out">
                    <Link to={stat.link}>
                      <button className="w-full bg-white text-brand-dark-gray py-2.5 rounded-lg shadow-md font-semibold">
                        Read more
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center lg:hidden">
            <Link to="/impact">
              <Button size="lg">See Our Full Impact</Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImpactSection;
