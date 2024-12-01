import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
// import "./App.css";
import "./LocationSender.css";

// Configure Leaflet icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

// Component to re-center the map based on position changes
function RecenterMap({ position }) {
  const map = useMap();
  if (position) map.setView(position, 13);
  return null;
}

function LocationSender() {
  const [position, setPosition] = useState([20.5937, 78.9629]); // Default position set to India
  const [locationName, setLocationName] = useState("");
  const [messageSent, setMessageSent] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState(""); // State for phone number
  const apiKey = "31d7c7a10b9f4b2ba2cb5a329c02a5c8"; // Replace with your OpenCage API key
  const navigate = useNavigate();

  // Handle phone number input change
  const handlePhoneNumberChange = (e) => {
    setPhoneNumber(e.target.value);
  };

  // Request location access
  const requestLocationAccess = () => {
    if (window.confirm("Allow access to your location?")) {
      getLocation();
    } else {
      alert("Location access denied. Some features may not work properly.");
    }
  };

  // Get current location
  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          setPosition([latitude, longitude]);
          getLocationName(latitude, longitude);
        },
        (err) => {
          alert("Error getting location: " + err.message);
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  // Fetch location name based on coordinates
  const getLocationName = async (lat, lng) => {
    try {
      const response = await axios.get(
        `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lng}&key=${apiKey}`
      );
      const result = response.data.results[0];
      setLocationName(result?.formatted || "Location name not found");
    } catch (error) {
      console.error("Error fetching location name:", error);
      setLocationName("Error fetching location name");
    }
  };

  // Share location via API
  const shareLocation = async () => {
    if (position) {
      const [latitude, longitude] = position;
      const locationData = {
        phoneNumber: phoneNumber,
        latitude: latitude,
        longitude: longitude,
        locationName: locationName,
      };
  
      try {
        const response = await axios.post("http://localhost:8081/api/location/share", locationData); // Use your backend port here
        console.log(response.data);
        setMessageSent(true);
        setTimeout(() => {
          setMessageSent(false);
          navigate("/success");
        }, 3000);
      } catch (error) {
        console.error("Error sending location:", error);
        if (error.response) {
          alert(`Error: ${error.response.data}`);
        } else if (error.request) {
          alert("No response from server. Please check your network.");
        } else {
          alert("An error occurred. Please try again.");
        }
      }
    } else {
      alert("Location not available yet.");
    }
  };
  
  return (
    <div className="location-container">
  <h2 className="location-header">Share Your Location</h2>
  <input 
    type="text" 
    placeholder="Enter your phone number" 
    value={phoneNumber}
    onChange={handlePhoneNumberChange}
    className="phone-number-input"
  />
  <button onClick={requestLocationAccess} className="location-button">
    Get Current Location
  </button>
  <div className="map-container">
    {position ? (
      <MapContainer center={position} zoom={13} style={{ height: "300px" }}>
        <RecenterMap position={position} />
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={position}>
          <Popup>{locationName || "Your Location"}</Popup>
        </Marker>
      </MapContainer>
    ) : (
      <p>Loading map...</p>
    )}
  </div>
  <p>Location: {locationName}</p>
  <button onClick={shareLocation} className="location-button">Share Location</button>

  {messageSent && (
    <div className="location-message-sent">
      <p>Location shared successfully!</p>
      <div className="location-tick-mark">✔</div>
    </div>
  )}
</div>
  );
}

export default LocationSender;
