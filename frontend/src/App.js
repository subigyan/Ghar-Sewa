import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Nav from "./components/Nav";
import Home from "./pages/customer/home/Home.jsx";
import Login from "./pages/customer/Login";
import Register from "./pages/customer/Register";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BusinessHome from "./pages/business/Home.jsx";
import BusinessLogin from "./pages/business/Login.jsx";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/*" element={<div>Not found</div>} />
          <Route path="/business" element={<BusinessHome />}></Route>
          <Route path="business/login" element={<BusinessLogin />} />
        </Routes>
      </Router>
      <ToastContainer />
    </div>
  );
}

export default App;
