import { useState, useEffect } from "react";
import axios from "axios";

import "./App.css";

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [location, setLotation] = useState("");
  const [countries, setCountries] = useState([]); //Country List
  const [selectedCoutry, setSelectedCountry] = useState(""); //Selected Countries
  const [cities, setCities] = (useState = ""); //City List
  const [selectedCity, setSelectedCity] = useState(""); // Selected Cities
  
  
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get("https://restcountries.com/v3.1/all");
        const countryNames = response.data.map((country) => country.name.common);
        setCountries(countryNames);
      } catch (error) {
        console.log("Ülke listesi çekilirken hata oluştu:", error);
      }
    };
    fetchCountries();
  }, []);
  

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response =
//           await axios.get(`http://api.weatherapi.com/v1/forecast.json?key=${import.meta.env.VITE_WEATHER_API}&q=${location}&days=5&aqi=yes&alerts=yes
// `);
//         setWeatherData(response.data);
//         console.log(response);
//       } catch (error) {
//         console.log(error);
//       }
//     };
//     if (location) {
//       fetchData();
//     }
//   }, [location]);

//   const handleLocationChange = (event) => {
//     if (event.target.value.length === 0) {
//       setWeatherData(null);
//     } // if input is empty

//     setLotation(event.target.value);
//   };
//   // console.log(weatherData);
  return (
    <>
      {/* <div className="app-container">
        <h1 className="app-title">Weather App</h1>
        <div className="input-container">
          <input
            className="location-input"
            type="text"
            placeholder="Type City Name"
            value={location}
            onChange={handleLocationChange}
          />
        </div>
      </div>

      {weatherData && (
        <div className="weather-container">
          {weatherData.forecast.forecastday.map((day) => (
            <div className="day-container" key={day.date}>
              <h2 className="date">
                {" "}
                {new Date(day.date).toLocaleDateString("en-US", {
                  weekday: "long",
                })}
              </h2>
              <h3 className="date">{day.date}</h3>
              <img
                className="weather-icon"
                src={day.day.condition.icon}
                alt={day.day.condition.text}
              />
              <p className="temparature"> {day.day.maxtemp_c} </p>
              <p className="temparature"> {day.day.condition.text} </p>
            </div>
          ))}
        </div>
      )} */}

      <select value={selectedCoutry}
      onChange={(e) => setSelectedCountry(e.target.value)}>
        <option value="">Select Country</option>
        {countries.map((country) =>(
          <option key={country} value={country}>{country}</option>
        ))}        
      </select>
    </>
  );
}

export default App;
