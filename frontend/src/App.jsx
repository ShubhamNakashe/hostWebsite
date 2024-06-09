



import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./Components/ScrollToTop";
import Hero from "./Components/Hero";
import Recommendation from "./Components/Recommendation";
import About from "./Components/About";
import Classes from "./Styles/Footer.module.css";
import Login from "./Components/Login";
import Register from "./Components/Register";
import Rest1 from "./Components/Rest1";
import Generatedplan from "./Components/GeneratedPlanPage";
import Loader from "./Components/Loader";
import ItineraryUI from "./Components/ItineraryUI";
import PDFiti from "./Components/PDFiti";
import BookmarkedItineraries from "./Components/BookmarkedItinerary";
import ItineraryPage from "./Components/ItineraryPage";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/About" element={<About />} />
        <Route path="/Recommendation" element={<Recommendation />} />
        <Route path="/Login/*" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/Rest1" element={<Rest1 />} />
        <Route path="/Generatedplan" element={<Generatedplan />} />
        <Route path="/Loader" element={<Loader />} />
        <Route path="/itinerary" element={<ItineraryUI />} />
        <Route path="/PDFiti" element={<PDFiti />} />
        <Route path="/BookmarkedItineraries" element={<BookmarkedItineraries />} />

        <Route path="/itinerary/:id" element={<ItineraryPage />} />

      </Routes>

      <div className={Classes.app}>


        <ScrollToTop />

      </div>
    </>
  );
};
export default App;


