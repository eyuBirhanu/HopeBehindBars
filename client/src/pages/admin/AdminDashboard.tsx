import React from "react";
import { Link } from "react-router-dom";
import {
  BlogIcon,
  GalleryIcon,
  VideoIcon,
  PublicationIcon,
  VolunteerIcon,
  MessageIcon,
} from "../../components/common/admin/AdminIcons";
import SEO from "../../components/common/SEO";

const dashboardCards = [
  {
    to: "/admin/blogs",
    title: "Manage Blogs",
    description: "Create, edit, and delete blog posts.",
    icon: <BlogIcon />,
  },
  {
    to: "/admin/gallery",
    title: "Manage Gallery",
    description: "Upload and organize gallery images.",
    icon: <GalleryIcon />,
  },
  {
    to: "/admin/videos",
    title: "Manage Videos",
    description: "Add and categorize YouTube videos.",
    icon: <VideoIcon />,
  },
  {
    to: "/admin/publications",
    title: "Manage Publications",
    description: "List news articles and links.",
    icon: <PublicationIcon />,
  },
  {
    to: "/admin/volunteers",
    title: "View Volunteers",
    description: "Review and manage volunteer applications.",
    icon: <VolunteerIcon />,
  },
  {
    to: "/admin/messages",
    title: "View Messages",
    description: "Read and archive contact form submissions.",
    icon: <MessageIcon />,
  },
];

const AdminDashboard = () => {
  return (
    <div>
      <SEO title="Dashboard" noIndex={true} />
      <h1 className="text-3xl font-bold text-brand-dark-gray mb-2">
        Dashboard
      </h1>
      <p className="mb-8 text-gray-600">
        Welcome! Manage your website content from here.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {dashboardCards.map((card) => (
          <Link
            key={card.to}
            to={card.to}
            className="block bg-white p-6 rounded-lg shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          >
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 h-12 w-12 bg-brand-sky-blue/10 rounded-lg flex items-center justify-center">
                {card.icon}
              </div>
              <div>
                <h3 className="font-bold text-xl text-brand-dark-gray">
                  {card.title}
                </h3>
                <p className="text-sm text-gray-500 mt-1">{card.description}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
