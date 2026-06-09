import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import Home from "@/pages/Home";
import CaseStudy from "@/pages/CaseStudy";
import CustomCursor from "@/components/CustomCursor";

function App() {
  return (
    <div className="App hide-default-cursor">
      <CustomCursor />
      <Toaster position="top-center" richColors closeButton />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/case-studies/:slug" element={<CaseStudy />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
