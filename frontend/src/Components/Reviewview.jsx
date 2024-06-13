import React, { useState, useEffect } from "react";
import Classes from "../Styles/Reviewview.module.css";
import port from "./port";

const Reviewview = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch(
          `${port}/api/itinerary/getAllReviews`
        );
        const data = await response.json();

        console.log("Server response:", data); // Log the entire response

        if (data.success) {
          console.log("Fetched reviews:", data.reviews);
          setReviews(data.reviews);
        } else {
          console.error("Failed to fetch reviews:", data.msg);
        }
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    fetchReviews();
  }, []);

  return (
    <div className={Classes.reviewContainer}>
      {reviews.map((user, userIndex) => (
        <div key={userIndex} className={Classes.reviewCardContainer}>
          {user.reviews.map((review, reviewIndex) => (
            <div
              key={`${userIndex}-${reviewIndex}`}
              className={Classes.reviewcard}
            >
              <p>
                <strong>User:</strong> {user.username}
              </p>
              <p>
                <strong>Location:</strong> {review.location}
              </p>
              <p>
                <strong>Review:</strong> {review.review}
              </p>
              <hr />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Reviewview;