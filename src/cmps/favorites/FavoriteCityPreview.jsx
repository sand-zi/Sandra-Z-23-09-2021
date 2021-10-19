import { useEffect, useState } from "react";
import { weatherService } from "../../services/weatherService.js";
import { ForecastPreview } from "../forecasts/ForecastPreview.jsx";

export const FavoriteCityPreview = ({
  city,
  isFahrenheit,
  onSelectLocation,
}) => {
  const [forecast, setForecast] = useState(null);
  const isForecast = !!forecast;
  useEffect(() => {
    const loadForecast = async () => {
      const { key } = city;
      const dayforecast = await weatherService.getCityForecast(key);
      setForecast(dayforecast);
    };
    loadForecast();
  }, []);

  const selectLocation = () => {
    onSelectLocation(city);
  };

  return (
    <div className="favorite-city-preview flex column auto-center">
      <h4 onClick={selectLocation}>
        <span>{city.localizedName}</span> - <span>{city.country}</span>
      </h4>
      {isForecast && (
        <ForecastPreview forecast={forecast} isFahrenheit={isFahrenheit} />
      )}
    </div>
  );
};
