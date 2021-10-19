import { useSelector } from "react-redux";
import { TempScalePreview } from "./TempScalePreview";

export const CurrLocationForecast = ({
  forecast,
  currLocation,
  isFahrenheit,
  setIsFahrenheit,
  toggleFavorite,
}) => {
  const { isDarkMode } = useSelector((state) => state.weatherModule);
  const convertTemp = (temp) => {
    return isFahrenheit ? Math.round((temp * 9) / 5 + 32) : Math.round(temp);
  };

  const transformPhrase = (str) => {
    return str.replaceAll("/", "ith");
  };
  const mode = isDarkMode ? "" : "-dark";

  return (
    <section className="current-location-forecast">
      <div className="info-container">
        <header className={`flex align-center`}>
          <h3>
            {currLocation.localizedName}, {currLocation.country}{" "}
          </h3>
          <img
            src={
              currLocation.isFavorite
                ? require(`../../assets/icons/remove-icon${mode}.svg`).default
                : require(`../../assets/icons/add-icon${mode}.svg`).default
            }
            alt=""
            onClick={toggleFavorite}
          />
        </header>
        <div className="img-container">
          <img
            src={
              require(`../../assets/images/${forecast.dayForecast.icon}.png`)
                .default
            }
          />
        </div>

        <div className="temperature">
          <p className="temp">
            {convertTemp(forecast.dayForecast.temperature)}{" "}
            <TempScalePreview
              isFahrenheit={isFahrenheit}
              setIsFahrenheit={setIsFahrenheit}
            />{" "}
          </p>
        </div>
        <div className="forecast-info">
          <p>
            Day Forecast: {transformPhrase(forecast.dayForecast.iconPhrase)}.
            Night Forecast: {transformPhrase(forecast.nightForecast.iconPhrase)}
            .
          </p>
        </div>
      </div>
    </section>
  );
};
