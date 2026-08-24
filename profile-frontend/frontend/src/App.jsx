import { Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/Home";
import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";
import ChangePassword from "./pages/ChangePassword";
import PageNotFound from "./pages/PageNotFound";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/profile" />} />

      <Route path="/home" element={<Home />} />

      <Route path="/profile" element={<Profile />} />

      <Route path="/edit-profile" element={<EditProfile />} />

      <Route path="/change-password" element={<ChangePassword />} />

      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}

export default App;
