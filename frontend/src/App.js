import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Nav from "./components/Nav";
import Home from "./pages/customer/home/Home.jsx";
import Login from "./pages/customer/Login";
import Register from "./pages/customer/Register";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BusinessHome from "./pages/business/Home.jsx";
import BusinessLogin from "./pages/business/Login.jsx";
import BusinessRegister from "./pages/business/Register.jsx";
import ServiceProviders from "./pages/customer/ServiceProviders.jsx";
import ServiceProvider from "./pages/customer/ServiceProvider.jsx";
import About from "./pages/customer/About.jsx";
import Reviews from "./pages/customer/Reviews.jsx";

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
          <Route path="business/register" element={<BusinessRegister />} />
          <Route path="search" element={<ServiceProviders />} />
          <Route path="/serviceProvider/:id" element={<ServiceProvider />} />
          <Route path="/about" element={<About />} />
          <Route path="/reviews" element={<Reviews />} />
        </Routes>
      </Router>
      <ToastContainer />
    </div>
  );
}

export default App;
