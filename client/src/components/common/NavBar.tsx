import React, { useState, useEffect } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import type { NavItem, NavLink as NavLinkType } from "../../types";
import Logo from "./Logo";
import { Button } from "./Button";
import DonationModal from "./DonationModal";

const HamburgerIcon = ({ className = "" }: { className?: string }) => (
  <svg
    className={`w-6 h-6 ${className}`}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M4 6h16M4 12h16m-7 6h7"
    />
  </svg>
);
const CloseIcon = ({ className = "" }: { className?: string }) => (
  <svg
    className={`w-6 h-6 ${className}`}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M6 18L18 6M6 6l12 12"
    />
  </svg>
);
const ChevronDownIcon = ({
  open,
  className = "",
}: {
  open?: boolean;
  className?: string;
}) => (
  <svg
    className={`w-4 h-4 ml-1 transition-transform duration-300 ${
      open ? "rotate-180" : "rotate-0"
    } ${className}`}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M19 9l-7 7-7-7"
    />
  </svg>
);

const navItems: NavItem[] = [
  { title: "Home", path: "/" },
  {
    title: "Who We Are",
    path: "/about",
    children: [
      { title: "Our Vision & Mission", path: "/about#vision-mission" },
      { title: "Our Story", path: "/about#story" },
      { title: "Theory of Change", path: "/about#theory-of-change" },
      { title: "Core Values", path: "/about#values" },
      { title: "Our Team", path: "/about#team" },
      { title: "Our Board", path: "/about#board" },
    ],
  },
  {
    title: "Our Impact",
    path: "/impact",
    children: [
      // { title: "Impact Stories", path: "/impact/stories" },
      { title: "Impact Videos", path: "/impact/videos" },
      { title: "Gallery", path: "/impact/gallery" },
    ],
  },
  {
    title: "Resources",
    path: "/resources",
    children: [
      { title: "Blog", path: "/blog" },
      { title: "News & Publications", path: "/publications" },
    ],
  },
  { title: "Join Our Team", path: "/join-team" },
  { title: "Contact", path: "/contact" },
];

interface MobileNavItemProps {
  item: NavItem;
  isOpen: boolean;
  onToggle: () => void;
  closeMobileMenu: () => void;
}

const MobileNavItem: React.FC<MobileNavItemProps> = ({
  item,
  isOpen,
  onToggle,
  closeMobileMenu,
}) => {
  const hasChildren = item.children && item.children.length > 0;

  const handleLinkClick = () => {
    if (hasChildren) {
      onToggle();
    } else {
      closeMobileMenu();
    }
  };

  const handleSubLinkClick = () => {
    closeMobileMenu();
  };

  return (
    <div className="border-b border-gray-100 last:border-b-0">
      <div className="flex items-center justify-between px-4 py-3 text-base font-medium text-gray-600 hover:bg-gray-50 cursor-pointer">
        <NavLink
          to={item.path || "#"}
          onClick={handleLinkClick}
          className="flex-grow"
        >
          {item.title}
        </NavLink>
        {hasChildren && (
          <div onClick={onToggle} className="p-2 -mr-2">
            <ChevronDownIcon open={isOpen} />
          </div>
        )}
      </div>

      <div
        className={`grid transition-all duration-300 ease-in-out ${
          isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden bg-gray-50">
          {hasChildren && (
            <div className="pl-8 pr-4 py-2 space-y-1">
              {item.children?.map((child) => (
                <NavLink
                  key={child.title}
                  to={child.path}
                  onClick={handleSubLinkClick}
                  className="block px-3 py-2 rounded-md text-sm font-medium text-gray-500 hover:bg-gray-100"
                >
                  {child.title}
                </NavLink>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace("#", "");
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);

  const toggleAccordion = (title: string) => {
    setOpenAccordion(openAccordion === title ? null : title);
  };

  const linkStyles = ({ isActive }: { isActive: boolean }) =>
    `py-2 transition-colors duration-300 text-base ${
      isActive
        ? "text-brand-dark-gray"
        : "text-gray-500 hover:text-brand-dark-gray"
    }`;
  const [isDonationModalOpen, setIsDonationModalOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <DonationModal
        isOpen={isDonationModalOpen}
        onClose={() => setIsDonationModalOpen(false)}
      />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0">
            <Link to="/">
              <Logo className="h-12 w-auto" />
            </Link>
          </div>

          <div className="hidden md:flex md:items-center md:space-x-8">
            {navItems.map((item) =>
              item.children ? (
                <div key={item.title} className="relative group">
                  <span
                    className={`${linkStyles({
                      isActive: false,
                    })} flex items-center cursor-default`}
                  >
                    {item.title}{" "}
                    <ChevronDownIcon className="group-hover:rotate-180" />
                  </span>
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-10">
                    <div className="py-1" role="menu">
                      {item.children.map((child: NavLinkType) => (
                        <NavLink
                          key={child.title}
                          to={child.path}
                          className="block px-4 py-2 text-sm text-brand-dark-gray hover:bg-gray-100"
                          role="menuitem"
                        >
                          {child.title}
                        </NavLink>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <NavLink
                  key={item.title}
                  to={item.path!}
                  className={linkStyles}
                >
                  {item.title}
                </NavLink>
              )
            )}
          </div>

          <div className="hidden md:block">
            <Button onClick={() => setIsDonationModalOpen(true)}>
              Donate Now
            </Button>
          </div>

          <div className="md:hidden flex items-center gap-2">
            <Button onClick={() => setIsDonationModalOpen(true)}>
              Donate Now
            </Button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-brand-dark-gray hover:bg-gray-100 focus:outline-none"
              aria-controls="mobile-menu"
              aria-expanded={isMobileMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? <CloseIcon /> : <HamburgerIcon />}
            </button>
          </div>
        </div>
      </div>

      <div
        className={`md:hidden absolute top-0 inset-x-0 p-2 transition transform origin-top-right ${
          isMobileMenuOpen
            ? "duration-200 ease-out opacity-100 scale-100"
            : "duration-100 ease-in opacity-0 scale-95 pointer-events-none"
        }`}
        id="mobile-menu"
      >
        <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y divide-gray-100">
          <div className="px-5 pt-4 pb-3 flex items-center justify-between">
            <div>
              <Logo className="h-8 w-auto" />
            </div>
            <div className="-mr-2">
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100"
              >
                <span className="sr-only">Close menu</span>
                <CloseIcon />
              </button>
            </div>
          </div>
          <div className="py-3">
            {navItems.map((item) => (
              <MobileNavItem
                key={item.title}
                item={item}
                isOpen={openAccordion === item.title}
                onToggle={() => toggleAccordion(item.title)}
                closeMobileMenu={() => setIsMobileMenuOpen(false)}
              />
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
