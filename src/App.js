import "./App.css";
import Layout from "./components/Layout";
import { ProtectedRoute } from "./components/ProtectedRoute";
import HomePage from "./pages/HomePage";
import NoPage from "./pages/NoPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserProfile from "./pages/UserProfile";
import SignIn from "./pages/SignIn";
import PortfolioPage from "./pages/PortfolioPage";
import SignUp from "./pages/SignUp";
import BlogDetails from "./pages/BlogDetails";
import AdminPage from "./pages/Admin";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/" element={<Layout children={<HomePage />} />}>
          <Route index element={<HomePage />} />
          <Route path="/blog/:id" element={<BlogDetails />} />
          <Route path="/portfolio" element={<PortfolioPage />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/profile" element={<UserProfile />} />
            <Route path="admin" element={<AdminPage />} />
          </Route>
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
