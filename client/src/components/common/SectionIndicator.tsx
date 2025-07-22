import React from "react";

interface SectionIndicatorProps {
  text: string;
}

const SectionIndicator: React.FC<SectionIndicatorProps> = ({ text }) => {
  return (
    <div className="flex items-center gap-3 py-2">
      <span className="h-2 w-2 bg-brand-sky-blue rounded-full"></span>
      <p className="text-sm font-semibold uppercase tracking-wider text-gray-500">
        {text}
      </p>
    </div>
  );
};

export default SectionIndicator;
