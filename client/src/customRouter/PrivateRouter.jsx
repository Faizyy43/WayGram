import React from "react";
import { Route, Redirect } from "react-router-dom";

const PrivateRouter = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      localStorage.getItem("firstLogin") ? <Component {...props} /> : <Redirect to="/" />
    }
  />
);

export default PrivateRouter;
