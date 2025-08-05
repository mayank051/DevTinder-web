import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Body from "./Body";
import Login from "./components/Login";
import FeedPage from "./pages/FeedPage";
import ProfilePage from "./pages/ProfilePage";
import ConnectionPage from "./pages/ConnectionPage";
import RequestsPage from "./pages/RequestsPage";
function App() {
  return (
    <>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Body />}>
            <Route index element={<FeedPage />} />
            <Route path="feed" element={<FeedPage />} />
            <Route path="login" element={<Login />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="connections" element={<ConnectionPage />} />
            <Route path="requests" element={<RequestsPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
