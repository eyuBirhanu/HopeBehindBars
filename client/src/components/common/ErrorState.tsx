import React from "react";

const ErrorIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-12 w-12 text-brand-rose/50 mx-auto"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

const RefreshIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5 mr-2"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M4 4v5h5M20 20v-5h-5M20 4h-5v5M4 20h5v-5"
    />
  </svg>
);

interface ErrorStateProps {
  message: string;
  onRetry: () => void;
}

const ErrorState: React.FC<ErrorStateProps> = ({ message, onRetry }) => {
  return (
    <div className="text-center py-20 px-4">
      <ErrorIcon />
      <h3 className="mt-4 text-lg font-semibold text-brand-dark-gray">
        Something went wrong
      </h3>
      <p className="mt-2 text-sm text-gray-500">{message}</p>
      <div className="mt-6">
        <button
          onClick={onRetry}
          className="inline-flex items-center bg-white text-brand-rose font-bold py-2.5 px-6 rounded-lg border-2 border-brand-rose 
                     transition-all duration-300 hover:bg-brand-rose/5 
                     shadow-[0_4px_14px_0_rgb(184,122,127,39%)] hover:shadow-[0_6px_20px_0_rgb(184,122,127,23%)]"
        >
          <RefreshIcon />
          Try Again
        </button>
      </div>
    </div>
  );
};

export default ErrorState;
