import { useState, useEffect } from "react";
import type { Publication } from "../types";
import { format } from "date-fns";
import SEO from "../components/common/SEO";
import api from "../services/api";

const PublicationCard = ({ pub }: { pub: Publication }) => (
  <a
    href={pub.link}
    target="_blank"
    rel="noopener noreferrer"
    className="block group bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-2"
  >
    <div className="h-48 overflow-hidden">
      <img
        src={pub.imageUrl}
        alt={pub.title}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
    </div>
    <div className="p-6">
      <p className="text-sm text-brand-rose font-semibold">{pub.description}</p>
      <h3 className="mt-2 text-xl font-bold text-brand-dark-gray line-clamp-2">
        {pub.title}
      </h3>
      <p className="mt-3 text-xs text-gray-400">
        {format(new Date(pub.createdAt), "MMMM d, yyyy")}
      </p>
      <p className="mt-4 text-sm font-bold text-brand-sky-blue">
        Read Full Article →
      </p>
    </div>
  </a>
);

const PublicationsPage = () => {
  const [publications, setPublications] = useState<Publication[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPublications = async () => {
      try {
        const { data } = await api.get("/api/publications");
        setPublications(data || []);
      } catch (error) {
        console.error("Failed to fetch publications", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPublications();
  }, []);

  return (
    <main className="bg-neutral-light min-h-screen">
      <SEO
        title="News & Publications"
        description="See where our work and mission have been featured in the media, from articles to journals and more."
        url="/publications"
      />
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="font-display text-5xl font-bold text-brand-dark-gray">
            News & Publications
          </h1>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            See where our work and our mission have been featured in the media.
          </p>
        </div>
        {loading ? (
          <p className="text-center">Loading news...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {publications.map((pub) => (
              <PublicationCard key={pub._id} pub={pub} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

export default PublicationsPage;
