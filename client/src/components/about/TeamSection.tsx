const TwitterIcon = ({ className = "" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231L18.244 2.25zM17.5 19.5h1.5l-8.25-10.875h-1.75L17.5 19.5z" />
  </svg>
);
const LinkedInIcon = ({ className = "" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.783-1.75-1.75s.784-1.75 1.75-1.75 1.75.783 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
  </svg>
);

const teamMembers = [
  {
    name: "Hassan Nurudeen",
    title: "Program Manager",
    imageUrl:
      "https://images.unsplash.com/photo-1627161683084-e64e3e426b84?q=80&w=1974&auto=format&fit=crop",
    twitter: "#",
    linkedin: "#",
  },
  {
    name: "Grace Eche",
    title: "Operations Manager",
    imageUrl:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop",
    twitter: "#",
    linkedin: "#",
  },
  {
    name: "Emmanuel Okorie",
    title: "Legal Officer - Edo State",
    imageUrl:
      "https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=1974&auto=format&fit=crop",
    twitter: "#",
    linkedin: "#",
  },
  {
    name: "Obinna Ejiogu",
    title: "Senior Communications Officer",
    imageUrl:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1976&auto=format&fit=crop",
    twitter: "#",
    linkedin: "#",
  },
  {
    name: "Sylvester Ogaji",
    title: "Partnership & Strategy Manager",
    imageUrl:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1974&auto=format&fit=crop",
    twitter: "#",
    linkedin: "#",
  },
];

const TeamSection = () => (
  <section
    id="team"
    className="bg-neutral-light flex justify-center py-20 md:py-28"
  >
    <div className="container w-11/12 mx-auto px-4">
      <div className="text-center max-w-3xl mx-auto">
        <h2 className="font-display text-4xl md:text-5xl font-bold text-brand-dark-gray">
          Meet Our Passionate Team
        </h2>
        <p className="mt-4 text-lg text-gray-600">
          Our philosophy is simple: find great people and give them the
          resources and support to do their best work.
        </p>
      </div>

      <div className="mt-16 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-x-8 gap-y-12">
        {teamMembers.map((member) => (
          <div key={member.name} className="text-center">
            <img
              src={member.imageUrl}
              alt={member.name}
              className="w-32 h-32 md:w-40 md:h-40 mx-auto rounded-full object-cover shadow-lg grayscale hover:grayscale-0 transition-all duration-300"
            />
            <h3 className="mt-4 text-lg font-bold text-brand-dark-gray">
              {member.name}
            </h3>
            <p className="text-sm text-brand-sky-blue">{member.title}</p>
            <div className="mt-2 flex justify-center items-center gap-x-3">
              <a
                href={member.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-brand-sky-blue transition"
              >
                <span className="sr-only">Twitter</span>
                <TwitterIcon className="h-5 w-5" />
              </a>
              <a
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-brand-sky-blue transition"
              >
                <span className="sr-only">LinkedIn</span>
                <LinkedInIcon className="h-5 w-5" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default TeamSection;
