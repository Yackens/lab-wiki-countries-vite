import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
function CountryDetails() {
  const [country, setCountry] = useState(null);
  const [borders, setBorders] = useState(null);
  const { countryId } = useParams();
  console.log("here are the params", countryId);

  useEffect(() => {
    const fetchOneCountry = async () => {
      try {
        const res = await axios.get(
          `https://ih-countries-api.herokuapp.com/countries/${countryId}`
        );
        console.log("here are the country details", res.data);
        setCountry(res.data);

        //magic for the borders
        // This is to create an array of promises to get all the info for each border
        const bordersData = res.data.borders.map((oneBorder) => {
          return axios.get(
            `https://ih-countries-api.herokuapp.com/countries/${oneBorder}`
          );
        });
        //This handles the array of promises and returns all the data for each country border
        const PromiseAllResponse = await Promise.all(bordersData);

        const commonNamesArray = PromiseAllResponse.map((e) => {
          return {
            name: e.data.name.common,
            code: e.data.alpha3Code,
          };
        });
        console.log("Array of names with the alpha3codes", commonNamesArray);
        setBorders(commonNamesArray);
      } catch (err) {
        console.log(err);
      }
    };
    fetchOneCountry();
  }, [countryId]);
  if (country === null && borders === null) {
    return <p>Loading....</p>;
  }
  console.log("here is the real name of the borders", borders);
  return (
    <div>
      <img
        src={`https://flagpedia.net/data/flags/icon/72x54/${country.alpha2Code.toLowerCase()}.png`}
        alt={country.name.common}
        style={{ height: "30px" }}
      />
      <h2>{country.name.common}</h2>
      <h4>Capital:{country.capital} </h4>
      <h4>Area:{country.area} </h4>
      <h4>
        Borders:
        {borders &&
          borders.map((oneBorder) => {
            return (
              <Link key={oneBorder.code} to={`/${oneBorder.code}`}>
                <h6>{oneBorder.name}</h6>
              </Link>
            );
          })}
      </h4>
    </div>
  );
}

export default CountryDetails;