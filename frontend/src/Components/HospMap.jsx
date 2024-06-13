import React, { useState, useEffect, useRef } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import { Icon } from "leaflet";
import "leaflet/dist/leaflet.css";
import location from "../assets/location.png";
import Classes from "../Styles/Map.module.css";
import Alert from "./Alert";
import { useNavigate } from "react-router-dom";
import port from "./port";
const API_URL = `${port}/api/HospMap/search`;
const API_URL_openweather = `${port}/api/weather/current`;

function LocationMarker({ lat, lon }) {
  const [position, setPosition] = useState(null);
  const map = useMapEvents({
    click() {
      map.locate();
    },
    locationfound(e) {
      setPosition(e.latlng);
      map.flyTo(e.latlng, map.getZoom());
    },
  });

  useEffect(() => {
    // Set position when lat and lon are available
    if (lat && lon) {
      setPosition([lat, lon]);
      map.flyTo([lat, lon], map.getZoom());
    }
  }, [lat, lon, map]);

  const customIcon = new Icon({
    iconUrl: location,
    iconSize: [30, 30],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
  });

  return position === null ? null : (
    <Marker position={position} icon={customIcon}>
      <Popup>You are here</Popup>
    </Marker>
  );
}

function HospMap() {
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("hospitals");
  const [locationInput, setLocationInput] = useState("");
  const [lat, setLat] = useState("");
  const [lon, setLon] = useState("");
  const [loading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const user = JSON.parse(localStorage.getItem("currentuser"));
  const queryParamsRef = useRef("");
  const navigate = useNavigate();

  const search = async () => {
    try {
      if (!user) {
        setShowAlert(true); // Show alert if no user is logged in
        return;
      }
      if (locationInput === "") {
        return;
      }

      setLoading(true); // Set loading to true when the search starts
      const response = await fetch(
        `${API_URL_openweather}?city=${locationInput}`
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
    } finally {
      setLoading(false); // Set loading to false when the search finishes
    }
  };

  useEffect(() => {
    const fetchNearbyLocations = async (lat, lon, category) => {
      try {
        if (!lat || !lon) return;

        setLoading(true); // Set loading to true when fetching nearby locations
        const apiUrl = `${API_URL}?lat=${lat}&lng=${lon}&category=${category}`;
        const nearbyLocationsResponse = await fetch(apiUrl);
        if (!nearbyLocationsResponse.ok) {
          throw new Error("Network response was not ok");
        }

        const locationData = await nearbyLocationsResponse.json();
        setLocations(locationData);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false); // Set loading to false when the fetch finishes
      }
    };

    if (lat && lon) {
      fetchNearbyLocations(lat, lon, selectedCategory);
    }
  }, [lat, lon, selectedCategory]);

  const customIcon = new Icon({
    iconUrl: location,
    iconSize: [30, 30],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
  });

  const handleMarkerClick = (location) => {
    setSelectedLocation(location);
  };

  const redirectToLogin = () => {
    navigate('/Login');
  };
  return (
    <section id="location" className={Classes.location}>
      <div className={Classes.container}>
      {showAlert && (
          <Alert
            message="Login to search."
            onClose={() => setShowAlert(false)}
            onConfirm={redirectToLogin}
          />
        )}
        <h2
          style={{ width: "100%", textAlign: "center", marginBottom: "20px" }}
        >
          Find Nearby Locations
        </h2>

        <div className="searchBox">
          <div className="inputContainer">
            <input
              type="text"
              placeholder="Enter location"
              value={locationInput}
              onChange={(e) => setLocationInput(e.target.value)}
              ref={queryParamsRef}
            />
            <button
              onClick={search}
              style={{ color: "white", backgroundColor: " #144c52" }}
            >
              Search
            </button>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className={Classes.selectDropdown}
            >
              <option value="hospitals">Hospitals</option>
              <option value="restaurants">Restaurants</option>
              <option value="cafes">Cafes</option>
            </select>
          </div>
        </div>

        {loading && (
          <div className={Classes.loadingMessage}>
            It might take a few seconds to take you to the location...
          </div>
        )}

        <MapContainer
          center={[lat || 0, lon || 0]} // Use the coordinates of the searched location
          zoom={13}
          scrollWheelZoom={false}
          style={{ height: "500px", width: "100%" }}
          className={Classes.leafletcontainer}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {locations.map((location, index) => (
            <Marker
              key={index}
              position={[location.lat, location.lng]}
              icon={customIcon}
              onClick={() => handleMarkerClick(location)}
            >
              <Popup>
                <div>
                  <h3>{location.name}</h3>
                  <p>Address: {location.address}</p>
                  <p>Rating: {location.rating}</p>
                  <p>Phone: {location.phone}</p>
                  <p>Website: {location.website}</p>
                </div>
              </Popup>
            </Marker>
          ))}
          <LocationMarker lat={lat} lon={lon} />
        </MapContainer>

        {selectedLocation && (
          <div className={Classes.locationdetails}>
            <h2>{selectedLocation.name}</h2>
            <p>Address: {selectedLocation.address}</p>
            <p>Rating: {selectedLocation.rating}</p>
            <p>Phone: {selectedLocation.phone}</p>
            <p>Website: {selectedLocation.website}</p>
          </div>
        )}
      </div>
    </section>
  );
}

export default HospMap;
