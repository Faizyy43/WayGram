import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import NotFound from "../components/NotFound";

// Eagerly import all page modules using Vite's import.meta.glob
const modules = import.meta.glob("../pages/**/*.jsx", { eager: true });

const getComponent = (pageName) => {
  // Try exact match first (e.g., "../pages/discover.jsx")
  // Then try index file (e.g., "../pages/message/index.jsx")
  const exactKey = `../pages/${pageName}.jsx`;
  const indexKey = `../pages/${pageName}/index.jsx`;

  const key = Object.keys(modules).find(
    (k) => k === exactKey || k === indexKey
  );
  return key ? modules[key].default : null;
};

const PageRender = () => {
  const { page, id } = useParams();
  const { auth } = useSelector((state) => state);

  if (!auth.token || !page) return <NotFound />;

  const pageName = id ? `${page}/[id]` : page;
  const Component = getComponent(pageName);

  return Component ? <Component /> : <NotFound />;
};

export default PageRender;
