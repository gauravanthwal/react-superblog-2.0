import React from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/ui/Navbar";
import HomePage from "./pages/homePage/HomePage";
import SignupPage from "./pages/signupPage/SignupPage";
import LoginPage from "./pages/loginPage/LoginPage";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser, updateUserFromStorage } from "./store/actions/userAction";
import Alert from "./components/ui/Alert";
import { getStorage } from "./utils/storage";
import BlogsPage from "./pages/blogs/BlogsPage";
import ProfilePage from "./pages/profile/ProfilePage";
import Blog from "./pages/blogs/Blog";
import CreateBlog from "./pages/createBlog/CreateBlog";
import BasicModal from "./components/ui/Modal";
import "./app.css";
import PrivateRoute from "./components/auth/PrivateRoute";

const App = () => {
  const { isAuth } = useSelector((state) => state.user);
  const { alerts } = useSelector((state) => state.alert);
  const { showModal } = useSelector((state) => state.alert);
  const dispatch = useDispatch();

  useEffect(() => {
    if (getStorage("auth") && getStorage("token")) {
      dispatch(updateUserFromStorage());
    }
  }, []);
  return (
    <div className="">
      <Navbar />
      {alerts.length > 0 &&
        alerts.map((alert) => <Alert key={alert.id} alert={alert} />)}
      <div className="max-w-[1000px] mx-auto">
        <Routes>
          <Route element={<BlogsPage />} path="/" />
          <Route element={<BlogsPage />} path="/blogs" />
          <Route element={<Blog />} path="/blog/:blogId" />
          <Route
            element={
              <PrivateRoute>
                <CreateBlog />
              </PrivateRoute>
            }
            path="/create-blog"
          />
          <Route
            element={
              <PrivateRoute>
                <ProfilePage />
              </PrivateRoute>
            }
            path="/profile"
          />
          <Route element={<LoginPage />} path="/login" />
          <Route element={<SignupPage />} path="/signup" />
        </Routes>
        {showModal && <BasicModal />}
      </div>
    </div>
  );
};

export default App;
