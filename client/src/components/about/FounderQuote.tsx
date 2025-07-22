import React from "react";
const FadingBars = () => (
  <div className="absolute inset-y-0 left-0 w-1/3 flex items-center justify-start opacity-30 md:opacity-50 pointer-events-none">
    <div className="flex items-end h-full max-h-[400px] gap-3">
      <div className="w-4 h-[60%] bg-gradient-to-t from-brand-sky-blue/0 to-brand-sky-blue/50 rounded-full"></div>
      <div className="w-4 h-[100%] bg-gradient-to-t from-brand-sky-blue/0 to-brand-sky-blue/70 rounded-full"></div>
      <div className="w-4 h-[80%] bg-gradient-to-t from-brand-sky-blue/0 to-brand-sky-blue/40 rounded-full"></div>
      <div className="w-4 h-[40%] bg-gradient-to-t from-brand-sky-blue/0 to-brand-sky-blue/60 rounded-full"></div>
    </div>
  </div>
);

const FounderQuote: React.FC = () => {
  return (
    <section className="bg-brand-dark-blue py-24 sm:py-32 overflow-hidden">
      <div className="container mx-auto px-4 relative">
        <FadingBars />

        <div className="max-w-4xl mx-auto text-center relative">
          <span className="absolute -top-8 -left-8 font-serif text-9xl text-white/5 z-0">
            “
          </span>

          <blockquote className="relative z-10">
            <p className="font-display text-3xl md:text-4xl lg:text-5xl leading-tight md:leading-tight lg:leading-tight text-white">
              Justice should not be a privilege determined by economic status,
              but a fundamental right for all. My father's story is the reason
              this organization exists.
            </p>
          </blockquote>

          <figcaption className="mt-10 inline-block">
            <div className="border-t border-white/20 w-24 mx-auto mb-6"></div>
            <p className="text-lg font-semibold text-white">
              Oluwafunke Adeoye
            </p>
            <p className="text-sm text-brand-sky-blue">
              Founder & Executive Director
            </p>
          </figcaption>

          <span className="absolute -bottom-16 -right-8 font-serif text-9xl text-white/5 z-0">
            ”
          </span>
        </div>
      </div>
    </section>
  );
};

export default FounderQuote;
