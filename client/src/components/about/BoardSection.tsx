import { useState } from "react";

const boardMembers = [
  {
    id: 1,
    name: "Stanley Ibe",
    imageUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop",
    thought:
      "True justice reform begins with empathy. By investing in these women, we are investing in the health and safety of our entire community.",
  },
  {
    id: 2,
    name: "Gabriel Okeowo",
    imageUrl:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961&auto=format&fit=crop",
    thought:
      "Accountability and transparency are the cornerstones of a just society. Our work provides a critical check on the system, ensuring fairness for the vulnerable.",
  },
  {
    id: 3,
    name: "Nguemo Uja",
    imageUrl:
      "https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?q=80&w=1974&auto=format&fit=crop",
    thought:
      "Empowerment is not just about giving resources; it's about restoring a sense of self-worth and agency that the system often strips away.",
  },
  {
    id: 4,
    name: "Winnie Ishaku",
    imageUrl:
      "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=1974&auto=format&fit=crop",
    thought:
      "Every woman we support represents a family strengthened and a community made whole. The ripple effect of this work is immeasurable.",
  },
];

const BoardSection = () => {
  const [selectedMember, setSelectedMember] = useState(boardMembers[0]);

  return (
    <section id="board" className="bg-white py-20 md:py-28">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-brand-dark-gray">
            Our Board
          </h2>
          <p className="mt-4 text-lg text-gray-500">
            We are guided by the wisdom and experience of our dedicated board
            members.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 max-w-6xl mx-auto">
          <div className="lg:col-span-1">
            <ul className="">
              {boardMembers.map((member) => (
                <li className="border-y-[.2px] border-gray-100" key={member.id}>
                  <button
                    onClick={() => setSelectedMember(member)}
                    className={`w-full text-left p-4 rounded-lg text-lg transition-all duration-300 ${
                      selectedMember.id === member.id
                        ? " text-brand-dark-gray hover:border-brand-dark-gray"
                        : "text-gray-500 hover:bg-gray-100/50 hover:border-brand-dark-gray hover:text-brand-dark-gray"
                    }`}
                  >
                    {member.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2 bg-neutral-light rounded-lg p-8 md:p-12">
            <div className="text-left">
              <img
                src={selectedMember.imageUrl}
                alt={selectedMember.name}
                className="w-20 h-20 rounded-full object-cover mb-6 shadow-md"
              />
              <p className="font-display text-lg text-brand-dark-gray">
                “{selectedMember.thought}”
              </p>
              <p className="mt-4 font-bold text-brand-dark-gray">
                {selectedMember.name}
              </p>
              <p className="text-sm text-gray-500">Board Member</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BoardSection;
