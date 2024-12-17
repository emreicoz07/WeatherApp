import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [countries, setCountries] = useState([]); // Ülke listesi
  const [selectedCountry, setSelectedCountry] = useState(""); // Seçilen ülke
  const [cities, setCities] = useState([]); // Şehir listesi
  const [selectedCity, setSelectedCity] = useState(""); // Seçilen şehir
  const [weatherData, setWeatherData] = useState(null); // Hava durumu verisi

  // Ülke listesini çek
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get("https://restcountries.com/v3.1/all");
        const countryData = response.data.map((country) => ({
          name: country.name.common,
          code: country.cca2, // ISO Alpha-2 kodu
        }));
        setCountries(countryData);
      } catch (error) {
        console.log("Ülke listesi çekilirken hata oluştu:", error);
      }
    };
    fetchCountries();
  }, []);

  useEffect(() => {
    const fetchCities = async () => {
      if (!selectedCountry) return;
  
      try {
        const response = await axios.get(
          `http://api.geonames.org/searchJSON?country=${selectedCountry.code}&featureClass=P&maxRows=81&username=emreicoz`
        );
        const cityNames = response.data.geonames.map((city) => city.name);
        setCities(cityNames);
      } catch (error) {
        console.log("Şehir listesi çekilirken hata oluştu:", error);
      }
    };
    fetchCities();
  }, [selectedCountry]);
  
  
  // Hava durumu çek
  useEffect(() => {
    const fetchWeatherData = async () => {
      if (!selectedCity) return;
      try {
        const response = await axios.get(
          `http://api.weatherapi.com/v1/forecast.json?key=${import.meta.env.VITE_WEATHER_API}&q=${selectedCity}&days=5&aqi=yes&alerts=yes`
        );
        setWeatherData(response.data);
      } catch (error) {
        console.log("Hava durumu çekilirken hata oluştu:", error);
      }
    };
    fetchWeatherData();
  }, [selectedCity]);

  return (
    <>
      <div className="app-container">
        <h1 className="app-title">Weather App</h1>

        {/* Ülke Seçimi */}
        <div className="input-container">
          <select
            className="dropdown"
            onChange={(e) => {
              const country = countries.find((c) => c.name === e.target.value);
              setSelectedCountry(country);
            }}
          >
            <option value="">Ülke Seç</option>
            {countries.map((country) => (
              <option key={country.code} value={country.name}>
                {country.name}
              </option>
            ))}
          </select>
        </div>

        {/* Şehir Seçimi */}
        {selectedCountry && (
          <div className="input-container">
            <select
              className="dropdown"
              onChange={(e) => setSelectedCity(e.target.value)}
            >
              <option value="">Şehir Seç</option>
              {cities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Hava Durumu */}
      {weatherData && (
        <div className="weather-container">
          {weatherData.forecast.forecastday.map((day) => (
            <div key={day.date}>
              <h2>
                {new Date(day.date).toLocaleDateString("tr-TR", {
                  weekday: "long",
                })}
              </h2>
              <p>{day.day.maxtemp_c}°C</p>
              <p>{day.day.condition.text}</p>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default App;
