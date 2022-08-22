import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import Layout from "./Layout/Layout";
import AboutUs from "./pages/AboutUs.page";
import ContactUs from "./pages/ContactUs.page";
import Home from "./pages/Home.page";
import LogIn from "./pages/LogIn.page";
import SignUp from "./pages/SignUp.page";
import AccountRecovery from "./pages/AccountRecovery.page";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import NewPassword from "./pages/NewPassword.page";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { jwtVerficationRequest } from "./store/actions/auth.actions";

function App() {
  const isDarkMode = useSelector((state) => state.ui.isDarkMode);
  const isLoggedIn = useSelector((state) => state.ui.isLoggedIn);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.authToken);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) return;
    const isSuccess = dispatch(jwtVerficationRequest(token));
    if (isSuccess) {
      navigate("/");
    } else {
      toast.info("Session Expired!");
      navigate("/login");
    }
  }, []);
  return (
    <div className="App">
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/contactus" element={<ContactUs />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/accountrecovery" element={<AccountRecovery />} />
          <Route path="/newpassword" element={<NewPassword />} />
        </Routes>
      </Layout>
      <ToastContainer
        style={{ zIndex: 1, marginBottom: "20px", alignItems: "end" }}
        bodyClassName="text-gray-500 text-left"
        className=""
        progressClassName="bg-green-400"
        toastClassName="right-[3rem]"
        theme={isDarkMode ? "dark" : "light"}
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={true}
        draggable
        pauseOnHover
      />
    </div>
  );
}

export default App;
