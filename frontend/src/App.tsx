import "./App.css";
import { Route, Routes } from "react-router-dom";
import Login from "./Pages/auth/Login";
import SignUp from "./Pages/auth/SignUp";
import PageNotFound from "./Pages/errors/NotFound";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        {/* Wild card routing */}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default App;
