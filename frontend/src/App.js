import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProductPage from "./pages/product";
import Chatbot from "./pages/chatbot";  // your chatbot component
import About from "./pages/about";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<ProductPage />} />
        <Route path="/chat" element={<Chatbot />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </>
  );
}

export default App;