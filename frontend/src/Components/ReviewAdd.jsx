import React, { useState, useEffect } from "react";
import Classes from "../Styles/Addreview.module.css";
import Alert from "./Alert";
import login from "./Login";
import { useNavigate } from "react-router-dom";
import port from "./port";
import web from "./port";

const ReviewAdd = () => {
  const [review, setReview] = useState({
    location: "",
    review: "",
  });

  const [currentUser, setCurrentUser] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [showUserAlert, setShowUserAlert] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("currentuser"));
    if (storedUser) {
      setCurrentUser(storedUser);
    }
  }, []);

  const onChange = (event) => {
    setReview({ ...review, [event.target.name]: event.target.value });
  };

  const saveReview = async (username, review) => {
    try {
      const response = await fetch(
        // `http://localhost:${port}/api/itinerary/saveReview`,
        `${web}/api/itinerary/saveReview`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username,
            review: {
              location: review.location,
              review: review.review,
            },
          }),
        }
      );

      const data = await response.json();

      if (data.success) {
        setShowAlert(true);
        console.log("Review saved successfully");
      } else {
        console.error("Failed to save review:", data.msg);
      }
    } catch (error) {
      console.error("Error saving review information:", error);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!currentUser) {
      setShowUserAlert(true); // Show alert if no user is logged in
      return;
    }
    saveReview(currentUser.username,review);
    // if (currentUser) {
    //   saveReview(currentUser.username, review);
    // }
    

  };
  const redirectToLogin = () => {
    navigate('/login');
  };

  return (
    <section id="review" className={Classes.review}>
      {showAlert && (
        <Alert
          message="Review saved successfully"
          onClose={() => setShowAlert(false)}
          onConfirm={() => setShowAlert(false)}
        />
      )}
       {showUserAlert && (
          <Alert
            message="Login to search."
            onClose={() => setShowUserAlert(false)}
          onConfirm={redirectToLogin}
          />
        )}
      <div className={Classes.reviewtitle}>
        <h1 style={{ marginTop: "2%", fontStyle: "" }}>
          Want to leave some review about your trip?
        </h1>
      </div>
      <div className={Classes.mainDivReview}>
        <div className={Classes.boxContainer}>
          <form onSubmit={handleSubmit}>
            <div className={Classes.locationcontainer}>
              <input
                type="text"
                className={Classes.locipbox}
                placeholder="Location"
                name="location"
                id="location"
                aria-label="default input example"
                value={review.location}
                onChange={onChange}
                required
              />
            </div>
            <div className={Classes.reviewcontainer}>
              <input
                type="text"
                className={Classes.revipbox}
                placeholder="Review"
                name="review"
                id="review"
                aria-label="default input example"
                value={review.review}
                onChange={onChange}
                required
              />
            </div>
            <button type="submit" className={Classes.savebutton}>
              Submit
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ReviewAdd;
