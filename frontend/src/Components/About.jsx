import React, { useState, useRef, useEffect } from 'react';
import { Col, Form, FormGroup } from "reactstrap";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import NavBar from './NavBar';
import Footer from './Footer';
import Classes from '../Styles/Hotel.module.css';

import bg from "../assets/bg1.jpeg";
import { useNavigate } from "react-router-dom";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Loader from './Loader';
import Alert from './Alert';
import port from './port';
import web from './port';

function About() {
  const [loading, setLoading] = useState(false);
  const [selectedTitle, setSelectedTitle] = useState("");
  const queryParamsRef = useRef("");
  const [secondJson, setSecondJson] = useState({ status: false, data: [] });
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [lat, setLat] = useState("");
  const [lon, setLon] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  // const API_URL_openweather = `http://localhost:${port}/api/weather/current`;
  const API_URL_openweather = `${web}/api/weather/current`;

  const today = new Date();
  const user = JSON.parse(localStorage.getItem("currentuser"));
  const navigate = useNavigate();

  const setSearchHotel = (location, checkin, checkout) => {
    setSearchHotel({
      location: location,
      checkin: checkin,
      checkout: checkout,
    });
  };

  const openURL = (url) => {
    window.open(url, "_blank");
  };

  useEffect(() => {
    const selectedTitle = localStorage.getItem("selectedTitle");
    console.log("Initial selectedTitle:", selectedTitle);
    setSelectedTitle(selectedTitle);
  }, []);



  const fetchData = async () => {
    
    try {
      if (queryParamsRef.current.value === "") {
        return;
      }

      const response = await fetch(
        `${API_URL_openweather}?city=${queryParamsRef.current.value}`
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();

      if (!data.coord) {
        throw new Error("Invalid data in the response");
      }

      // Update the values of lat and lon with the coordinates obtained from the search
      setLat(data.coord.lat);
      setLon(data.coord.lon);

    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    const fetchHotelData = async (lat, lon, checkIn, checkOut) => {
      setLoading(true);
      try {
        if (!lat || !lon) return;

        const formattedCheckIn = new Date(checkIn).toISOString().split('T')[0];
        const formattedCheckOut = new Date(checkOut).toISOString().split('T')[0];



        // const secondResponse = await fetch(`http://localhost:${port}/api/hotel/search?latitude=${lat}&longitude=${lon}&checkIn=${formattedCheckIn}&checkOut=${formattedCheckOut}`);
        const secondResponse = await fetch(`${web}/api/hotel/search?latitude=${lat}&longitude=${lon}&checkIn=${formattedCheckIn}&checkOut=${formattedCheckOut}`);
        
        const secondJson = await secondResponse.json();

        if (!secondJson.data) {
          throw new Error("Invalid data in the response");
        }

        setSecondJson({ status: true, data: secondJson.data });
        setLoading(false);

      } catch (error) {
        console.log("Error fetching data:", error);
        setLoading(false);
      }
    };
    if (lat && lon) {
      fetchHotelData(lat, lon, checkIn, checkOut);
    }
  }, [lat, lon, checkIn, checkOut]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!user) {
      setShowAlert(true); // Show alert if no user is logged in
      return;
    }
    fetchData();
  };

  const redirectToLogin = () => {
    navigate('/login');
  };

  return (
   <>
    <section id='hotel' className={Classes.hotelContainer}> 
    {showAlert && (
        <Alert
          message="Login to search Hotels"
          onClose={() => setShowAlert(false)}
          onConfirm={redirectToLogin}
        />
      )}
      <NavBar />
      <div className={Classes.mainimage}>
        <img src={bg} alt="mainbckg" />
        <div className={Classes.hotelsearchContainer}>

          <div className={Classes.search}>
            <FormGroup>
              <h5 className={Classes.title}>Location</h5>
              <input
                selected={selectedTitle}
                className={Classes.input}
                type="text"
                placeholder="Mumbai,Paris"
                value={selectedTitle}
                onChange={(e) => setSelectedTitle(e.target.value)}
                ref={queryParamsRef}
              />
            </FormGroup>

              <FormGroup>
                <h5 className={Classes.title}>Check-In</h5>
                <DatePicker
                  selected={checkIn}
                  onChange={(date) => setCheckIn(date)}
                  className={Classes.input}
                  placeholderText="Select Date"
                  dateFormat="yyyy-MM-dd"
                  minDate={today}
                />
              </FormGroup>

              <FormGroup>
                <h5 className={Classes.title}>Check-Out</h5>
                <DatePicker
                  selected={checkOut}
                  onChange={(date) => setCheckOut(date)}
                  className={Classes.input}
                  placeholderText="Select Date"
                  dateFormat="yyyy-MM-dd"
                  minDate={today}
                />
              </FormGroup>



              <button className='search_icon' type='submit' onClick={handleFormSubmit}>
                Search
              </button>
            </div>
          </div>
        </div>
      </section>

      <div className={Classes.resultContainer}>
        <div>
          {loading && <Loader />}
          {!loading && (
            <>
              {secondJson.status && (
                <div className={Classes.hotelsrecomline}>
                  PLANNING ON A BUDGET? DON'T WORRY, WE GOT YOU COVERED
                </div>
              )}
              {secondJson.status && (
                <div className={Classes.hotelsrecomlinetwo}>
                  LIST OF TOP RECOMMENDATIONS
                </div>
              )}
              {secondJson.status && (
                <div className={Classes.sliderContainer}>
                  {secondJson.data.map((item, index) => (
                    <div key={index} className={Classes.hotelItem}>
                      <h5 style={{ color: '#144c52' }}>{item.title}</h5>
                      <div className={`${Classes.slider} hotel-slider-${index}`}>
                        <Slider
                          dots={true}
                          infinite={false}
                          speed={400}
                          slidesToShow={1}
                          slidesToScroll={1}
                          arrows={true}
                          centerMode={false}
                          centerPadding="0.5px"
                          customPaging={(i) => (
                            <div
                              style={{
                                width: '7px',
                                height: '7px',
                                borderRadius: '50%',
                                background: '#144c52',
                                position: 'relative',
                              }}
                            ></div>
                          )}
                          appendDots={(dots) => (
                            <div
                              style={{
                                transform: 'translateX(-15%)',
                              }}
                            >
                              <ul style={{ margin: '0px' }}> {dots} </ul>
                            </div>
                          )}
                        >
                          {item.cardPhotos.map((photo, photoIndex) => (
                            <div key={photoIndex}>
                              <img
                                className={Classes.sliderImage}
                                src={photo.sizes.urlTemplate.replace(
                                  /\?w=\{width\}&h=\{height\}/,
                                  "\?w=800&h=500"
                                )}
                                alt={`Hotel Image ${photoIndex}`}
                              />
                            </div>
                          ))}
                        </Slider>
                        <p>Rating: {item.bubbleRating.rating}</p>
                        <p>Review Count: {item.bubbleRating.count}</p>
                        <div className={Classes.linkProvider}>
                          <p style={{ fontSize: 16, color: 'black', marginTop: '1px' }}>
                            Provider:{' '}
                            <button
                              style={{
                                padding: '10px 15px',
                                marginLeft: '10px',
                                fontSize: '16px',
                                backgroundColor: '#009f9d ',
                                color: 'white',
                                border: 'none',
                                borderRadius: '50px',
                                cursor: 'pointer',
                              }}
                              onClick={() => openURL(item.commerceInfo.externalUrl)}
                            >
                              {item.provider}
                            </button>
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
        <Footer />
      </div>
    </>
  );
};

export default About;





























