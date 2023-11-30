import "./App.css";
import { Route, Routes } from "react-router-dom";
import Login from "./Pages/auth/Login";
import SignUp from "./Pages/auth/SignUp";
import PageNotFound from "./Pages/errors/NotFound";
import { ToastContainer } from "react-toastify";
import Products from "./Pages/admin/products";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/products" element={<Products />} />
        {/* Wild card routing */}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
