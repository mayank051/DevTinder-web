import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Body from "./Body";
import Login from "./components/Login";
function App() {
  return (
    <>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Body />}>
            <Route path="/feed" element={<div>Feed Page</div>} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<div>Profile Page</div>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
