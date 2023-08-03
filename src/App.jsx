import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import CountryDetailPage from "./pages/CountryDetailsPage";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    const getCountriesData = async () => {
      try {
        const { data } = await axios.get(
          "https://ih-countries-api.herokuapp.com/countries"
        );
        console.log("here are the countries", data);
        setCountries(data);
      } catch (err) {
        console.log(err);
      }
    };
    getCountriesData();
  }, []);

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage countries={countries} />} />
        <Route path="/:countryId" element={<CountryDetailPage />} />
      </Routes>
    </div>
  );
}

export default App;