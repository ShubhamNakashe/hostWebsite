import React, { useState, useRef, useEffect } from "react";
import Classes from "../Styles/Testimonials.module.css";
import Loader from "./Loader";
import port from "./port";
import web from "./port";


function Testimonials() {
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState("");
  const [results, setResults] = useState([]);
  const [lat, setLat] = useState("");
  const [lon, setLon] = useState("");
  const [currentWeather, setCurrentWeather] = useState({});
  const [forecast, setForecast] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const queryParamsRef = useRef("");
  // const apiBaseUrl = `http://localhost:${port}/api/weather`;
  const apiBaseUrl = `${web}/api/weather`;


  const search = async () => {
    setLoading(true); 
    try {
      const locationResponse = await fetch(`${apiBaseUrl}/location?city=${queryParamsRef.current.value}`);
      const locationData = await locationResponse.json();
      setLocation(locationData.city);
      setLat(locationData.lat);
      setLon(locationData.lon);
      console.log(locationData.city);
      console.log(locationData.lat);
      console.log(locationData.lon);


            const currentResponse = await fetch(`${apiBaseUrl}/location?city=${queryParamsRef.current.value}`);
            const currentData = await currentResponse.json();
            setCurrentWeather(currentData);
            console.log("current:"+currentData.temperature);
            console.log("current:"+currentData.humidity);
            console.log("current:"+currentData.feels_like);
            console.log("current:"+currentData.weather);
            console.log("current:"+currentData.description);
            console.log("current:"+currentData.clouds);
            console.log("mintemp"+currentData.mintemp)
          

      const forecastResponse = await fetch(`${apiBaseUrl}/forecast?lon=${locationData.lon}&lat=${locationData.lat}`);
      const forecastData = await forecastResponse.json();
      setForecast(forecastData);
      console.log("forecast:");
      console.log(forecastData);
      console.log("temp forecast:");
      forecastData.forEach(dayData => {
        console.log(dayData.temperaturefor);
      });
      const groupedData = groupByDay(forecastData);

      console.log("Grouped Forecast Data:");
      console.log(groupedData);

      // Set the forecast data in the state
      setResults(groupedData);
      setLoaded(true);

    } catch (error) {
      console.error("Error fetching data:", error.message);
    } finally {
      setLoading(false); // Stop loading
    }
  };
  const groupByDay = (data) => {
    const groupedData = {};
    data.forEach(item => {
      const date = new Date(item.datetime);
      const day = date.getDate();
      if (!groupedData[day]) {
        groupedData[day] = [];
      }
      groupedData[day].push(item);
    });
    return groupedData;
  };

  useEffect(() => {
    if (loaded) {

    }
  }, [loaded]);

  return (
    <section id="testimonials" className={Classes.testimonials}>
      <div className={Classes.testimonialBox}>
        <p>Before you pack your bag,Take a peek at your forecast real quick!</p>
        <input
          type="text"
          placeholder="Search City/Country.."
          className={Classes.searchinput}
          ref={queryParamsRef}
        />
        <button className={Classes.searchbuttonweather} onClick={() => search()}>Search</button>
      </div>

      
      
      {loading ? (
        <Loader />
      ) : (
        loaded && (
          <>
          <div className={Classes.tempContainer}>
            <div className={Classes.minmax}>
              <div className={Classes.temp}>
                Temperature : {currentWeather.temperature} ºC
              </div>
              <div className={Classes.humidity}>Humidity : {currentWeather.humidity}%</div>
            </div>
            <div className={Classes.minmax}>
              <div className={Classes.mintemp}>Min-Max Temperature:
                <div></div>{currentWeather.mintemp} ºC to {currentWeather.maxtemp} ºC
              </div>
              <div className={Classes.mintemp}>Feels Like: {currentWeather.feels_like} ºC</div>
            </div>
            <div className={Classes.minmax}>
              <div className={Classes.weatherInfo}>
                {currentWeather.weather} - {currentWeather.description}
              </div>
              <div className={Classes.weathInfo}>Clouds: {currentWeather.clouds}%</div>
            </div>
          </div>

          <div className={Classes.dataContainer}>
            {Object.keys(results).map((day, index) => (
              <div key={index} className={Classes.element}>
                <div className={Classes.day}>Date {day}</div>

                {results[day].map((item, innerIndex) => (
                  <div key={innerIndex} className={Classes.data}>
                    <div className={Classes.datetime}>{item.datetime}</div>
                    <hr /><br />
                    <div className="temptablebox">
                      <div className={Classes.tabletemperature}>Temperature: {item.temperature}°C</div>
                      <div className={Classes.tablehumidity}>Humidity: {item.humidity}%</div>
                      <div className={Classes.tablefeelslike}>Feels Like: {item.feels_like}°C</div>
                      <div className={Classes.tablemintemp}>Min Temperature: {item.mintemp}°C</div>
                      <div className={Classes.tablemaxtemp}>Max Temperature: {item.maxtemp}°C</div>
                      <div className={Classes.tableweather}>Description: {item.weather}</div>
                      <div className={Classes.tableclouds}>Clouds: {item.clouds}%</div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </>
      ))}
    </section>
  );
};

export default Testimonials;



