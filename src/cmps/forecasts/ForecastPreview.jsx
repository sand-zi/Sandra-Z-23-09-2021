import { useState } from "react";
import { useSelector } from "react-redux";

export const ForecastPreview = ({ forecast, isFahrenheit }) => {
  const [isDayForecastShown, setIsDayForecastShown] = useState(true);
  const { isDarkMode } = useSelector((state) => state.weatherModule);
  const tempSign = isFahrenheit ? "°F " : "°C";
  const convertTemp = (temp) => {
    return isFahrenheit ? Math.round((temp * 9) / 5 + 32) : Math.round(temp);
  };

  return (
    <div
      className={`forecast-preview flex column align-center ${
        isDarkMode ? "dark" : ""
      }`}
    >
      <div className="img-container grow flex auto-center">
        <img
          src={
            isDayForecastShown
              ? require(`../../assets/images/${forecast.dayForecast.icon}.png`)
                  .default
              : require(`../../assets/images/${forecast.nightForecast.icon}.png`)
                  .default
          }
          alt="weather-description"
        />
      </div>
      <div className="weather-description">
        <p> {forecast.date}</p>
        <p>
          {isDayForecastShown
            ? forecast.dayForecast.iconPhrase
            : forecast.nightForecast.iconPhrase}
        </p>
        <p>
          {" "}
          {isDayForecastShown
            ? convertTemp(+forecast.dayForecast.temperature)
            : convertTemp(+forecast.nightForecast.temperature)}
          {tempSign}
        </p>
      </div>
      <button onClick={() => setIsDayForecastShown(!isDayForecastShown)}>
        For {isDayForecastShown ? "Night" : "Day"} Forecast
      </button>
    </div>
  );
};
