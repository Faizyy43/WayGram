import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import Avatar from "../Avatar";

const SidebarNav = () => {
  const { auth } = useSelector((state) => state);
  const { pathname } = useLocation();
  const [expanded, setExpanded] = useState(false);
  const [hoverPaused, setHoverPaused] = useState(false);

  const navLinks = [
    { label: "Home", icon: "home", path: "/" },
    { label: "Search", icon: "search", path: "/" },
    { label: "Messages", icon: "near_me", path: "/message" },
    { label: "Explore", icon: "explore", path: "/discover" },
    { label: "Create", icon: "add_circle_outline", path: "/" },
    { label: "Profile", icon: "person", path: `/profile/${auth.user._id}` },
  ];

  const isActive = (link) =>
    link.path === pathname && !["Search", "Create"].includes(link.label)
      ? "font-bold text-white"
      : "text-slate-100 hover:text-white";

  const mobileLinks = navLinks.filter((link) =>
    ["Home", "Search", "Messages", "Explore", "Create", "Profile"].includes(link.label)
  );

  const openSidebar = () => {
    if (!hoverPaused) setExpanded(true);
  };

  const closeSidebar = () => {
    setExpanded(false);
    setHoverPaused(true);
  };

  const resetHover = () => {
    setExpanded(false);
    setHoverPaused(false);
  };

  return (
    <>
      <aside
        className={`fixed inset-y-0 left-0 z-50 hidden flex-col justify-between border-r border-white/10 bg-black/85 px-3 py-6 shadow-2xl backdrop-blur-xl transition-[width] duration-200 ease-out lg:flex ${
          expanded ? "w-[244px]" : "w-[76px]"
        }`}
        onMouseEnter={openSidebar}
        onMouseLeave={resetHover}
      >
        <div>
          <div className="relative mb-7 flex h-11 items-center px-3 py-3 text-white">
          <span className={`material-icons text-[29px] transition duration-150 ${expanded ? "opacity-0" : "opacity-100"}`}>
            photo_camera
          </span>
          <span className={`absolute left-3 max-w-[155px] truncate text-xl font-semibold tracking-tight transition duration-150 ${expanded ? "opacity-100" : "opacity-0"}`}>
            WayGram
          </span>
          {expanded && (
            <button
              type="button"
              onClick={closeSidebar}
              className="absolute right-1 grid h-9 w-9 place-items-center rounded-full text-neutral-400 transition hover:bg-white/10 hover:text-white"
              aria-label="Close sidebar"
            >
              <span className="material-icons text-[21px]">close</span>
            </button>
          )}
          </div>

          <nav className="flex flex-col gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.path}
              title={link.label}
              onClick={closeSidebar}
              className={`flex min-h-[50px] items-center gap-4 whitespace-nowrap rounded-lg px-3 text-base transition hover:bg-white/[0.07] ${isActive(link)}`}
            >
              <span className="material-icons w-7 shrink-0 text-[26px]">{link.icon}</span>
              <span className={`overflow-hidden transition duration-150 ${expanded ? "opacity-100" : "opacity-0"}`}>
                {link.label}
              </span>
            </Link>
          ))}
          </nav>
        </div>

        <Link
          to={`/profile/${auth.user._id}`}
          onClick={closeSidebar}
          className="flex items-center gap-3 whitespace-nowrap rounded-lg px-3 py-3 text-white transition hover:bg-white/[0.07]"
        >
          <div className="grid h-8 w-8 shrink-0 place-items-center overflow-hidden rounded-full bg-neutral-900">
            <Avatar src={auth.user.avatar} size="small-avatar" />
          </div>
          <div className={`max-w-[150px] overflow-hidden transition duration-150 ${expanded ? "opacity-100" : "opacity-0"}`}>
            <p className="m-0 text-sm font-semibold text-white">
              {auth.user.name || "Your Profile"}
            </p>
          </div>
        </Link>
      </aside>

      <nav
        className="fixed inset-x-0 bottom-0 z-50 grid h-[calc(60px+env(safe-area-inset-bottom))] grid-cols-6 items-start border-t border-white/10 bg-black/90 px-2 pt-1 backdrop-blur-xl lg:hidden"
        style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      >
        {mobileLinks.map((link) => (
          <Link
            key={`mobile-${link.label}`}
            to={link.path}
            title={link.label}
            aria-label={link.label}
            className={`grid h-12 min-w-0 place-items-center rounded-lg transition active:bg-neutral-900 ${isActive(link)}`}
          >
            {link.label === "Profile" ? (
              <span className="grid h-7 w-7 place-items-center overflow-hidden rounded-full bg-neutral-900">
                <Avatar src={auth.user.avatar} size="small-avatar" />
              </span>
            ) : (
              <span className="material-icons text-[25px]">{link.icon}</span>
            )}
          </Link>
        ))}
      </nav>
    </>
  );
};

export default SidebarNav;
