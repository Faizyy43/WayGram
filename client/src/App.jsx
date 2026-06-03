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
  const showUserShell = userType === "user" && Boolean(auth.token);
  const socketReady = socket?.emit && socket?.on;
  const pageShellClass = showUserShell
    ? "min-h-screen pb-[calc(72px+env(safe-area-inset-bottom))] lg:pl-[76px] lg:pb-0"
    : "h-[100dvh] overflow-hidden";

  useEffect(() => {
    dispatch(refreshToken());
  }, [dispatch]);

  useEffect(() => {
    if (!auth.token) return;

    const socketInstance = io(BACKEND_URL, {
      transports: ["websocket", "polling"],
      withCredentials: true,
    });

    dispatch({ type: GLOBALTYPES.SOCKET, payload: socketInstance });

    return () => {
      socketInstance.close();
      dispatch({ type: GLOBALTYPES.SOCKET, payload: null });
    };
  }, [dispatch, auth.token]);

  useEffect(() => {
    if (!auth.token) return;
    dispatch(getPosts(auth.token));
    dispatch(getSuggestions(auth.token));
    dispatch(getNotifies(auth.token));
  }, [dispatch, auth.token]);

  useEffect(() => {
    if (!("Notification" in window)) return;
    if (Notification.permission === "default") {
      Notification.requestPermission();
    }
  }, []);

  const LandingPage = auth.token
    ? userType === "user"
      ? Home
      : AdminDashboard
    : Login;

  return (
    <Router>
      <Alert />
      <input type="checkbox" id="theme" />
      <div className={`App app-shell ${(status || modal) && "mode"}`}>
        {showUserShell && <SidebarNav />}
        <div className={`text-slate-100 ${pageShellClass}`}>
          {status && <StatusModal />}
          {auth.token && socketReady && <SocketClient />}

          <Route exact path="/" component={LandingPage} />
          <Route exact path="/register" component={Register} />

          {auth.token && userType === "user" && (
            <div className="wrap_page">
              <PrivateRouter exact path="/:page" component={PageRender} />
              <PrivateRouter exact path="/:page/:id" component={PageRender} />
            </div>
          )}
        </div>
      </div>
    </Router>
  );
}

export default App;
