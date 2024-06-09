import React, { useState, useEffect, useRef } from "react";
import { Form, FormGroup, Card, CardTitle, CardText } from "reactstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Classes from "../Styles/Restaurants.module.css";
import bg from "../assets/bg1.jpeg";
import Loader from "./Loader";
import NavBar from "./NavBar";
import Footer from "./Footer";
import Alert from "./Alert";
import login from "./Login";
import { useNavigate } from "react-router-dom";
import port from "./port";

function Rest1() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [searchLocation, setSearchLocation] = useState("");
  const [searchDate, setSearchDate] = useState(new Date());
  const [selectedRating, setSelectedRating] = useState("");
  const [locationId, setLocationId] = useState(null);
  const [secondJson, setSecondJson] = useState({ status: false, data: [] });
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const today = new Date();
  const [showAlert, setShowAlert] = useState(false);
  const user = JSON.parse(localStorage.getItem("currentuser"));
  

  const fetchLocationId = async (query) => {
    try {
      const response = await fetch(`http://localhost:${port}/api/rest/searchLocation?query=${query}`);
      if (!response.ok) {
        throw new Error("Location search failed");
      }
      const data = await response.json();
      if (data.status && data.data.length > 0) {
        return data.data[0];
      } else {
        throw new Error("Location not found");
      }
    } catch (error) {
      console.error("Error fetching location data:", error);
      setLoading(false);
      return null;
    }
  };

  const fetchRestaurants = async (locationId) => {
    try {
      const response = await fetch(`http://localhost:${port}/api/rest/searchRestaurants?locationId=${locationId}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      if (!data.data) {
        console.error("Invalid data in the response:", data);
        throw new Error("Invalid data in the response");
      }
      return data.data.data;
    } catch (error) {
      console.error("Error fetching restaurants data:", error);
      setLoading(false);
      return [];
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      setShowAlert(true); // Show alert if no user is logged in
      return;
    }

    setLoading(true);
    setShowAlert(false);

    const locationData = await fetchLocationId(searchLocation);
    if (locationData) {
      const restaurantData = await fetchRestaurants(locationData.locationId);
      setSecondJson({ status: true, data: restaurantData });
      applyFilters(restaurantData, selectedRating); // Apply filters
    }

    setLoading(false);
  };

  const applyFilters = (restaurants, rating) => {
    const filtered = restaurants.filter(restaurant => restaurant.averageRating >= rating);
    setFilteredRestaurants(filtered);
    console.log("Filters applied");
  };
  const redirectToLogin = () => {
    navigate('/login');
  };

  return (
    <section id="Restaurant">
      <NavBar />
      <div className={Classes.container}>
        {showAlert && (
          <Alert
            message="Login to search Restaurants"
            onClose={() => setShowAlert(false)}
            onConfirm={redirectToLogin}
          />
        )}
        <div className={Classes.mainimage}>
          <img src={bg} alt="mainbckg" />
          <div className={Classes.hotelsearchContainer}>
            <div className={Classes.search}>
              <Form onSubmit={handleFormSubmit}>
                <div className={Classes.locDate}>
                  <FormGroup className={Classes.searchFormGroup}>
                    <h5 className={Classes.title}>Location</h5>
                    <input
                      className={Classes.input}
                      type="text"
                      placeholder="Enter Location"
                      value={searchLocation}
                      onChange={(e) => setSearchLocation(e.target.value)}
                    />
                  </FormGroup>
                  <FormGroup className={Classes.searchFormGroup}>
                    <h5 className={Classes.title}>Date</h5>
                    <DatePicker
                      selected={searchDate}
                      onChange={(date) => setSearchDate(date)}
                      className={Classes.input}
                      placeholderText="Select Date"
                      dateFormat="yyyy-MM-dd"
                      minDate={today}
                    />
                  </FormGroup>
                </div>
                
                <FormGroup>
                  <h5 className={Classes.title}>Filter by Rating</h5>
                  <select
                    className={Classes.input}
                    value={selectedRating}
                    onChange={(e) => setSelectedRating(e.target.value)}
                  >
                    <option value="">Select Rating</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </select>
                </FormGroup>
                <button className={Classes.filterButton} type="submit">
                  Apply Filters
                </button>
              </Form>
            </div>
          </div>
        </div>

        <div className={Classes.resultContainer}>
          {loading && <Loader />}
          {!loading && filteredRestaurants.length > 0 && (
            <div className="row">
              <div className={Classes.hotelsrecomline}>
                PLANNING ON A BUDGET? DON'T WORRY, WE GOT YOU COVERED
              </div>
              <div className={Classes.hotelsrecomlinetwo}>
                LIST OF TOP RECOMMENDATIONS
              </div>
              {filteredRestaurants.map((restaurant, index) => (
                <div key={index} className={`col-md-4 ${Classes.restaurantItem}`}>
                  <Card className={Classes.cardMainContainer}>
                    <div className={Classes.cardContent}>
                      <div className={Classes.imageContainer}>
                        {restaurant.heroImgUrl && (
                          <img
                            src={restaurant.heroImgUrl}
                            alt={restaurant.name}
                            className={Classes.restaurantImage}
                          />
                        )}
                      </div>
                      <div className={Classes.cardBody}>
                        <CardTitle tag="h5">{restaurant.name}</CardTitle>
                        <CardText className={Classes.cardText}>
                          <p>Average Rating: {restaurant.averageRating}</p>
                          <p>User Review Count: {restaurant.userReviewCount}</p>
                          <p>
                            Establishment Type:{" "}
                            {restaurant.establishmentTypeAndCuisineTags.join(", ")}
                          </p>
                          <p>Open Status: {restaurant.currentOpenStatusText}</p>
                          
                        </CardText>
                      </div>
                    </div>
                  </Card>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </section>
  );
}

export default Rest1;




