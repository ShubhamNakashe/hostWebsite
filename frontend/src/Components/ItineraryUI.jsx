import React from "react";
import PropTypes from "prop-types";
import Classes from '../Styles/Generatedplan.module.css';

function ItineraryUI({ generatedPlan }) {
  if (typeof generatedPlan !== 'string' || generatedPlan.trim() === '') {
    return <div>No itinerary available.</div>;
  }


  return (
    <table className={Classes.travelTable} id="itinerary-content">


      <tbody>
        {generatedPlan.split("\n").map((line, index) => {
          if (line.match(/Day \d+/)) {
            const dayNumber = line.match(/\d+/)[0];
            return (
              <tr className={Classes.Daysched} key={index}>
                <td className={Classes.dayHeader}>Day {dayNumber}</td>
              </tr>
            );
          } else if (line.includes("Safety Tips")) {
            return (
              <tr className={Classes.Daysched} key={index}>
                <td className={Classes.dayHeader} style={{ backgroundColor: "white" }}>Safety Tips</td>
              </tr>
            );
          } else if (line.includes("Emergency Contacts")) {
            return (
              <tr className={Classes.Daysched} key={index}>
                <td className={Classes.dayHeader}>Emergency Contacts</td>
              </tr>
            );
          } else if (
            line.includes("Morning:") ||
            line.includes("Afternoon:") ||
            line.includes("Evening:") ||
            line.includes("Restaurants:") ||
            line.includes("Transportation:") ||
            line.includes("Accommodation:")
          ) {
            const timeOfDay = line.replace(/\*/g, "").toUpperCase();
            return (
              <tr key={index}>
                <td className={`${Classes.dayHeader} ${Classes.timeOfDay}`} style={{ backgroundColor: 'rgb(216, 236, 253)', color: 'rgb(0, 75, 80)', fontSize: '18px' }}>{timeOfDay}</td>
                <td></td>
              </tr>
            );
          } else {
            const cleanedLine = line.replace(/\*/g, "").trim();
            if (!cleanedLine) {
              return null;
            }
            return (
              <tr key={index}>
                <td>
                  <span className={Classes.itinerarydescription}>
                    {cleanedLine.split(/\b(morning|evening|afternoon|night|lunch|dinner|breakfast|Police|Ambulance|Fire Brigade|Tourist Helpline|Local Embassy|Consulate)\b/gi).map((word, index) => (
                      /\b(morning|evening|afternoon|night|lunch|dinner|breakfast|Police|Ambulance|Fire Brigade|Tourist Helpline|Local Embassy|Consulate)\b/gi.test(word) ? (
                        <span key={index} className={Classes.highlightword}>{word.toUpperCase()}</span>
                      ) : (
                        word
                      )
                    ))}
                  </span>
                </td>
                <td></td>
              </tr>
            );
          }
        })}
      </tbody>
    </table>
  );
}

ItineraryUI.propTypes = {
  generatedPlan: PropTypes.string,
};

ItineraryUI.defaultProps = {
  generatedPlan: '',
};

export default ItineraryUI;





