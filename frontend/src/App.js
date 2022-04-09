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
import BusinessDashboard from "./pages/business/dashboard/BusinessDashboard.jsx";
import BusinessReviews from "./pages/business/dashboard/BusinessReviews.jsx";
import BusinessInfo from "./pages/business/dashboard/BusinessInfo.jsx";
import BusinessUpdate from "./pages/business/dashboard/BusinessUpdate.jsx";
import Quotations from "./pages/customer/Quotations.jsx";
import QuotationRequests from "./pages/business/dashboard/QuotationRequests.jsx";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
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
          <Route path="/quotations" element={<Quotations />} />
          <Route path="/business/dashboard" element={<BusinessDashboard />} />
          <Route
            path="/business/dashboard/reviews"
            element={<BusinessReviews />}
          />
          <Route
            path="/business/dashboard/view-info"
            element={<BusinessInfo />}
          />
          <Route
            path="/business/dashboard/manage-info"
            element={<BusinessUpdate />}
          />
          <Route
            path="/business/dashboard/requests"
            element={<QuotationRequests />}
          />
        </Routes>
      </Router>
      <ToastContainer />
    </div>
  );
}

export default App;
