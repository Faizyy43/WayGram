import { BrowserRouter as Router, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import io from "socket.io-client";
import { BACKEND_URL } from "./utils/config";

import PageRender from "./customRouter/PageRender";
import PrivateRouter from "./customRouter/PrivateRouter";
import Login from "./pages/login";
import Register from "./pages/register";
import Home from "./pages/home";
import Alert from "./components/alert/Alert";
import SidebarNav from "./components/header/SidebarNav";
import StatusModal from "./components/StatusModal";
import { refreshToken } from "./redux/actions/authAction";
import { getPosts } from "./redux/actions/postAction";
import { getSuggestions } from "./redux/actions/suggestionsAction";
import { getNotifies } from "./redux/actions/notifyAction";

import AdminDashboard from "./pages/adminDashboard";
import { GLOBALTYPES } from "./redux/actions/globalTypes";
import SocketClient from "./SocketClient";

function App() {
  const { auth, status, modal, userType, socket } = useSelector((state) => state);
  const dispatch = useDispatch();
  const showUserShell = userType === "user" && auth.token;
  const isSocketReady = socket && typeof socket.emit === "function" && typeof socket.on === "function";

  useEffect(() => {
    dispatch(refreshToken());
  }, [dispatch]);

  useEffect(() => {
    if (!auth.token) return;
    const socket = io(BACKEND_URL, {
      transports: ["websocket", "polling"],
      withCredentials: true,
    });

    dispatch({ type: GLOBALTYPES.SOCKET, payload: socket });
    return () => {
      dispatch({ type: GLOBALTYPES.SOCKET, payload: null });
      socket.close();
    };
  }, [dispatch, auth.token]);

  useEffect(() => {
    if (auth.token) {
      dispatch(getPosts(auth.token));
      dispatch(getSuggestions(auth.token));
      dispatch(getNotifies(auth.token));
    }
  }, [dispatch, auth.token]);

  useEffect(() => {
    if (!("Notification" in window)) {
      alert("This browser does not support desktop notification");
    } else if (Notification.permission === "granted") {
    } else if (Notification.permission !== "denied") {
      Notification.requestPermission().then(function (permission) {
        if (permission === "granted") {
        }
      });
    }
  }, []);

  return (
    <Router>
      <Alert />
      <input type="checkbox" id="theme" />
      <div className={`App app-shell ${(status || modal) && "mode"}`}>
        {showUserShell && <SidebarNav />}
        <div
          className={`text-slate-100 ${
            showUserShell
              ? "min-h-screen pb-[calc(72px+env(safe-area-inset-bottom))] lg:pl-[76px] lg:pb-0"
              : "h-[100dvh] overflow-hidden"
          }`}
        >
          {status && <StatusModal />}
          {auth.token && isSocketReady && <SocketClient />}
          <Route
            exact
            path="/"
            component={
              userType === "user"
                ? auth.token
                  ? Home
                  : Login
                : auth.token
                ? AdminDashboard
                : Login
            }
          />

          {userType === "user" && (
            <>
              <Route exact path="/register" component={Register} />
              {auth.token && (
                <div className="wrap_page">
                  <PrivateRouter exact path="/:page" component={PageRender} />
                  <PrivateRouter exact path="/:page/:id" component={PageRender} />
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </Router>
  );
}

export default App;
