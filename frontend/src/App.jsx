import { BrowserRouter, Routes, Route } from "react-router-dom";
import OptionChain from "./pages/OptionChain";
import Navbar from "./components/nav/Navbar";
import OptionAnalysis from "./components/option-analysis/OptionAnalysis";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<OptionAnalysis />} />
          <Route path="/optionChain" element={<OptionChain />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
