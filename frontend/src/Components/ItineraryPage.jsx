// ItineraryPage.jsx
import React from "react";
import { useLocation } from "react-router-dom";
import ItineraryUI from "./ItineraryUI";
import NavBar from "./NavBar";
import PDFiti from "./PDFiti";

function ItineraryPage() {
  const location = useLocation();
  const { generatedPlan } = location.state;

  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
  };

  return (
    <>
      <NavBar />
      <div style={{ paddingTop: "80px" }}>
        <div style={containerStyle}>
          <h2>Itinerary Details </h2>
          <PDFiti generatedPlan={generatedPlan} />
        </div>
        <ItineraryUI generatedPlan={generatedPlan} />
      </div>
    </>
  );
}

export default ItineraryPage;
// import React from 'react';
// import { useLocation } from 'react-router-dom';
// import ItineraryUI from './ItineraryUI';
// import NavBar from './NavBar';

// function ItineraryPage() {
//   const location = useLocation();
//   const { generatedPlan } = location.state;

//   return (
//     <>
//       <NavBar/>
//     <div>
//       <h2>Itinerary Details</h2>
//       <ItineraryUI generatedPlan={generatedPlan} />
//     </div>
//     </>
//   );
// }

// export default ItineraryPage;
