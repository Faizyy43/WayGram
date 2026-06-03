import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import NotFound from "../components/NotFound";

const PageRender = () => {
  const { page, id } = useParams();
  const { auth } = useSelector((state) => state);

  if (!auth.token || !page) return <NotFound />;

  const pageName = id ? `${page}/[id]` : page;

  try {
    // eslint-disable-next-line global-require, import/no-dynamic-require
    const Component = require(`../pages/${pageName}`).default;
    return <Component />;
  } catch {
    return <NotFound />;
  }
};

export default PageRender;
