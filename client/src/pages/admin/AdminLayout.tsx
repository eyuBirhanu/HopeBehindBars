import React, { useState } from "react";
import { Outlet, NavLink, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Logo from "../../components/common/Logo";
import {
  DashboardIcon,
  BlogIcon,
  GalleryIcon,
  VolunteerIcon,
  VideoIcon,
  PublicationIcon,
  MessageIcon,
  LogoutIcon,
  MenuIcon,
} from "../../components/common/admin/AdminIcons";

const adminNavLinks = [
  { to: "/admin", text: "Dashboard", icon: <DashboardIcon /> },
  { to: "/admin/blogs", text: "Blogs", icon: <BlogIcon /> },
  { to: "/admin/gallery", text: "Gallery", icon: <GalleryIcon /> },
  { to: "/admin/videos", text: "Videos", icon: <VideoIcon /> },
  {
    to: "/admin/publications",
    text: "Publications",
    icon: <PublicationIcon />,
  },
  { to: "/admin/volunteers", text: "Volunteers", icon: <VolunteerIcon /> },
  { to: "/admin/messages", text: "Messages", icon: <MessageIcon /> },
];

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { logout } = useAuth();

  const linkClass =
    "flex items-center gap-4 px-4 py-3 rounded-lg text-gray-200 hover:bg-brand-sky-blue/20 hover:text-white transition-colors";
  const activeLinkClass = "bg-brand-sky-blue text-white font-semibold";

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-brand-dark-blue">
      <div className="p-4 border-b border-white/10">
        <Link to="/">
          <Logo className="h-10 w-auto" />
        </Link>
      </div>
      <nav className="flex-grow p-4 space-y-2">
        {adminNavLinks.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            end
            className={({ isActive }) =>
              `${linkClass} ${isActive ? activeLinkClass : ""}`
            }
            onClick={() => setIsSidebarOpen(false)}
          >
            {link.icon}
            <span>{link.text}</span>
          </NavLink>
        ))}
      </nav>
      <div className="p-4 border-t border-white/10">
        <button
          onClick={logout}
          className="w-full flex items-center gap-4 px-4 py-3 rounded-lg text-gray-400 hover:bg-brand-rose/80 hover:text-white transition-colors"
        >
          <LogoutIcon />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-neutral-light md:flex">
      <div
        className={`fixed inset-0 z-40 transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out md:hidden`}
      >
        <SidebarContent />
      </div>
      <div className="hidden md:flex md:flex-shrink-0">
        <div className="flex flex-col w-64">
          <SidebarContent />
        </div>
      </div>
      <div className="flex flex-col flex-1">
        <header className="md:hidden bg-white shadow-md p-4 flex justify-between items-center sticky top-0 z-30">
          <h1 className="text-xl font-bold text-brand-dark-gray">
            Admin Panel
          </h1>
          <button onClick={() => setIsSidebarOpen(true)}>
            <MenuIcon />
          </button>
        </header>
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
