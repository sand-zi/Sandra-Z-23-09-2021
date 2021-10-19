import { FavoriteCityPreview } from "./FavoriteCityPreview";

export const FavoriteCityList = ({
  favoriteCities,
  isFahrenheit,
  onSelectLocation,
}) => {
  return (
    <section className="forecasts-list city-grid-gallery ">
      {favoriteCities.map((city) => (
        <FavoriteCityPreview
          city={city}
          key={city.locationId}
          isFahrenheit={isFahrenheit}
          onSelectLocation={onSelectLocation}
        />
      ))}
    </section>
  );
};
