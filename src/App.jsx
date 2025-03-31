import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import PlaceOrder from "./pages/PlaceOrder";
import Orders from "./pages/Orders";
import SubNav from "./components/SubNav";
import Footer from "./components/Footer";
import SearchBar from "./components/SearchBar";
import { ToastContainer, toast } from "react-toastify";
import FreqAskedQues from "./components/FreqAskedQues";
import TermsConditions from "./components/TermsConditions";
import Privacy from "./components/Privacy";

function App() {
  return (
    <main>
      <Navbar />
      <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
        <ToastContainer />
        <SearchBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/product/:productId" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/place-order" element={<PlaceOrder />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/faqs" element={<FreqAskedQues />} />
          <Route path="/terms" element={<TermsConditions />} />
          <Route path="/privacy" element={<Privacy />} />
        </Routes>
      </div>
      <Footer />
    </main>
  );
}

export default App;
