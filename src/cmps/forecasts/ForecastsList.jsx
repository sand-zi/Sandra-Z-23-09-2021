import { ForecastPreview } from "./ForecastPreview";

export const ForecatsList = ({ forecasts, isFahrenheit }) => {
  return (
    <section className="forecasts-list grid-gallery">
      {forecasts.map((forecast) => (
        <ForecastPreview
          forecast={forecast}
          key={forecast.forecastId}
          isFahrenheit={isFahrenheit}
        />
      ))}
    </section>
  );
};
