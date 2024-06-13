// BookmarkedItineraries.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import NavBar from "./NavBar";
import Footer from "./Footer";
import Classes from "../Styles/Generatedplan.module.css";
import Loader from "./Loader";
import Alert from "./Alert";

import port from "./port";

function BookmarkedItineraries() {
  const [bookmarkedItineraries, setBookmarkedItineraries] = useState([]);
  const [loading, setLoading] = useState(false);
  const user = JSON.parse(localStorage.getItem("currentuser"));
  const [removeItiShowAlert, setremoveItiShowAlert] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/Login");
    } else {
      fetchBookmarkedItineraries();
    }
  }, []);

  const fetchBookmarkedItineraries = async () => {
    try {
      setLoading(true);
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

  const handleRemoveBookmark = async (indexToRemove) => {
    try {
      const response = await axios.post(
        `${port}/api/itinerary/removeBookmarkedItinerary`,
        {
          username: user.username,
          indexToRemove: indexToRemove,
        }
      );

      if (response.data.success) {
        const updatedBookmarkedItineraries = [...bookmarkedItineraries];
        updatedBookmarkedItineraries.splice(indexToRemove, 1);
        setBookmarkedItineraries(updatedBookmarkedItineraries);
        setremoveItiShowAlert(true);
        // alert("Bookmarked itinerary removed successfully");
      } else {
        console.error(
          "Failed to remove bookmarked itinerary:",
          response.data.msg
        );
      }
    } catch (error) {
      console.error("Error removing bookmarked itinerary:", error);
    }
  };

  return (
    <>
      <NavBar />
      <div className={Classes.mainContainer}>
        {removeItiShowAlert && (
          <Alert
            message=" Itinerary removed successfully"
            onClose={() => setremoveItiShowAlert(false)}
            onConfirm={() => setremoveItiShowAlert(false)}
          />
        )}
        {loading ? (
          <Loader />
        ) : (
          <div className={Classes.bookmarkedItineraries}>
            <h2>Bookmarked Itineraries</h2>

            <table>
              <thead>
                <tr>
                  <th>Itinerary</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {bookmarkedItineraries.map((itinerary, index) => (
                  <tr key={index}>
                    <td>
                      <a
                        href={`/itinerary/${index}`}
                        onClick={(e) => {
                          e.preventDefault();
                          navigate(`/itinerary/${index}`, {
                            state: { generatedPlan: itinerary.itinerary },
                          });
                        }}
                      >
                        View Itinerary {index + 1} - {itinerary.destination}
                      </a>
                    </td>
                    <td>
                      <button
                        onClick={() => handleRemoveBookmark(index)}
                        style={{ color: "white", backgroundColor: "#144c52" }}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <Footer />
    </>
  );
}

export default BookmarkedItineraries;
