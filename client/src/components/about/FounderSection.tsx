const FounderSection = () => (
  <section id="story" className="bg-white flex justify-center py-20 md:py-28">
    <div className="container w-11/12 mx-auto px-4">
      <div className="grid grid-cols-1 lg:grid-cols-10 gap-12 items-center max-w-6xl mx-auto">
        <div className="lg:col-span-4 flex justify-center">
          <img
            src="https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961&auto=format&fit=crop"
            alt="Oluwafunke Adeoye"
            className="rounded-lg shadow-xl w-full max-w-sm h-auto object-cover"
          />
        </div>
        <div className="lg:col-span-6 text-left">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-brand-sky-blue">
            Our Founder's Story
          </h2>
          <h3 className="mt-2 font-display text-3xl font-bold text-brand-dark-gray">
            Oluwafunke Adeoye
          </h3>
          <p className="mt-1 font-semibold text-brand-rose">
            Executive Director
          </p>
          <p className="mt-4 text-gray-600 leading-relaxed">
            Our founder’s childhood was adversely impacted by the criminal
            justice system, as her father endured detention for a crime he did
            not commit. Motivated by a desire for change, she pursued a legal
            education to confront the inequities inherent in the system. With a
            background in law and as a Commonwealth scholar at Oxford, she has
            dedicated over a decade to creating systemic change through
            innovation and brilliance.
          </p>
        </div>
      </div>
    </div>
  </section>
);

export default FounderSection;
