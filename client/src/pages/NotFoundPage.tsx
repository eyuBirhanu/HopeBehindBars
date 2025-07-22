import React from "react";
import { Button } from "../components/common/Button"; // Import our reusable Button
import NotFoundIllustration from "../components/common/NotFoundIllustration"; // Import the SVG
import SEO from "../components/common/SEO";

const NotFoundPage: React.FC = () => {
  return (
    <main className="min-h-screen bg-white px-6 py-24 sm:py-32 lg:px-8">
      <SEO
        title="Page Not Found (404)"
        description="The page you were looking for could not be found."
        noIndex={true}
      />
      <div className="text-center">
        <NotFoundIllustration className="mx-auto h-64 w-auto text-gray-400" />
        <h1 className="mt-12 font-display text-3xl font-bold tracking-tight text-brand-dark-gray sm:text-5xl">
          Sorry, page not found!
        </h1>
        <p className="mt-6 text-base leading-7 text-gray-600 max-w-lg mx-auto">
          Sorry, we couldn’t find the page you’re looking for. Perhaps you’ve
          mistyped the URL? Be sure to check your spelling.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Button as="a" href="/" size="lg">
            Go back home
          </Button>
        </div>
      </div>
    </main>
  );
};

export default NotFoundPage;
