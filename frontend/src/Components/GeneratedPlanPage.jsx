import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Use useNavigate instead of useHistory
import axios from "axios";
import "jspdf-autotable";
import NavBar from "./NavBar";
import { Col, Container, Form, FormGroup, Row } from "reactstrap";
import Classes from "../Styles/Generatedplan.module.css";
import Footer from "./Footer";
import Loader from "./Loader";
import ItineraryUI from "./ItineraryUI";
import PDFiti from "./PDFiti";
import Alert from "./Alert";
import port from "./port";

const formatContent = (text) => {
  const lines = text.split("\n");

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].toLowerCase();

    if (
      line.includes("morning") ||
      line.includes("afternoon") ||
      line.includes("evening") ||
      line.includes("night") ||
      line.includes("day ")
    ) {
      lines[i] = `${lines[i]}`;
    }
  }

  return lines.join("\n");
};

function Generatedplan() {
  const navigate = useNavigate(); // Use useNavigate
  const [generatedPlan, setGeneratedPlan] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [removeItiShowAlert, setremoveItiShowAlert] = useState(false);
  const [loading, setLoading] = useState(false);
  const [bookmarkedItineraries, setBookmarkedItineraries] = useState([]);
  const [showBookmarkedItineraries, setShowBookmarkedItineraries] =
    useState(false);
  const user = JSON.parse(localStorage.getItem("currentuser"));

  useEffect(() => {
    // Fetch bookmarked itineraries when the component mounts
    fetchBookmarkedItineraries();
    const storedBookmarkedItineraries = JSON.parse(
      localStorage.getItem("bookmarkedItineraries")
    );
    if (storedBookmarkedItineraries) {
      setBookmarkedItineraries(storedBookmarkedItineraries);
    }
  }, []);

  const fetchBookmarkedItineraries = async () => {
    try {
      setLoading(true);
      // Make API call to fetch bookmarked itineraries
      const response = await axios.get(
        `${port}/api/itinerary/getBookmarkedItineraries/${user.username}`
      );
      setBookmarkedItineraries(response.data.bookmarkedItineraries);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching bookmarked itineraries:", error);
      setLoading(false);
    }
  };

  const handleToggleDisplay = () => {
    setShowBookmarkedItineraries((prevState) => !prevState);
    if (!showBookmarkedItineraries) {
      navigate("/BookmarkedItineraries"); // Correctly navigate to the BookmarkedItineraries page
    }
  };

  const handleBookmark = async () => {
    try {
      // Prepare the bookmarked itinerary data
      const bookmarkedItinerary = formatContent(generatedPlan || "");
      if (!bookmarkedItinerary || bookmarkedItinerary === "") {
        console.error("Invalid bookmarked itinerary");
        return;
      }
      let destination = localStorage.getItem("destination");
      // Ensure destination is not undefined
      if (!destination) {
        console.error("Destination is undefined");
        destination = "Unknown"; // Set a default value or handle it appropriately
      }

      // Make a POST request to the API endpoint
      const response = await fetch(
        `${port}/api/itinerary/saveBookmarkedItinerary`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: user.username,
            itinerary: bookmarkedItinerary,
            destination: destination,
          }),
        }
      );

      const data = await response.json();

      if (data.success) {
        // Show a confirmation that the itinerary has been bookmarked
        // alert("Itinerary bookmarked successfully!");
        setShowAlert(true);
        console.log("itinerary saved");
      } else {
        console.error("Failed to save bookmarked itinerary:", data.msg);
      }
    } catch (error) {
      console.error("Error saving bookmarked itinerary:", error);
    }
  };

  useEffect(() => {
    // Retrieve the data from local storage
    const storedPlan = localStorage.getItem("generatedPlan");
    const formattedPlan = formatContent(storedPlan || "");
    setGeneratedPlan(formattedPlan);
    console.log(formattedPlan);
    // setGeneratedPlan(storedPlan || "");
  }, []);

  return (
    <>
      <NavBar />

      <Container className={Classes.maincontainer}>
        {showAlert && (
          <Alert
            message="Itinerary saved successfully"
            onClose={() => setShowAlert(false)}
            onConfirm={() => setShowAlert(false)}
          />
        )}

        <div className={Classes.allbuttons}>
          <div className={Classes.buttonContainer}>
            <PDFiti generatedPlan={generatedPlan} />
          </div>
          <div className={Classes.buttonContainer}>
            <button onClick={handleBookmark} className={Classes.displayButton}>
              Save Itinerary
            </button>
          </div>
          <div className={Classes.buttonContainer}>
            <button
              onClick={handleToggleDisplay}
              className={Classes.bookmarksdisplayButton}
            >
              {showBookmarkedItineraries
                ? "Hide Saved Itineraries"
                : "Display Saved Itineraries"}
            </button>
          </div>
        </div>

        {showBookmarkedItineraries && (
          <div className={Classes.bookmarkedItineraries}>
            <h2>Bookmarked Itineraries</h2>

            <ul>
              {bookmarkedItineraries.map((itinerary, index) => (
                <li key={itinerary.id}>
                  <p className={Classes.bookmarkedParagraph}>{itinerary}</p>

                  <button
                    className={Classes.removebookmark}
                    onClick={() => handleRemoveBookmark(index)}
                    style={{ color: "white", backgroundColor: "#144c52" }}
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
        <Row className={Classes.justifycontentcenter}>
          {loading ? <Loader /> : <ItineraryUI generatedPlan={generatedPlan} />}
        </Row>
      </Container>

      <Footer />
    </>
  );
}

export default Generatedplan;
