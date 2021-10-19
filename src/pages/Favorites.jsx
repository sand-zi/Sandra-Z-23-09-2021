import { useSelector, useDispatch } from "react-redux";
import { loadFavoriteCities, updateCurrtLocation } from "../store/actions/weatherActions.js";
import { useEffect, useCallback, useState } from "react";
import { useHistory } from "react-router-dom";
import { FavoriteCityList } from "../cmps/favorites/FavoriteCityList.jsx";
import { NoFavoriteCities } from "../cmps/favorites/NoFavoriteCities.jsx";

export const Favorites = () => {
  const { favoriteCities, isDarkMode } = useSelector((state) => state.weatherModule);
  const [isFahrenheit, setIsFahrenheit] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(loadFavoriteCities());
  }, [dispatch]);

  const onSelectLocation = useCallback(
    (location) => {
      dispatch(updateCurrtLocation({ ...location }));
      history.push("/");
    },
    [dispatch]
  );

  return (
    <section className={`favorites  ${isDarkMode ? "dark" : ""}`}>
      {!favoriteCities.length && <NoFavoriteCities />}
      <FavoriteCityList
        favoriteCities={favoriteCities}
        isFahrenheit={isFahrenheit}
        onSelectLocation={onSelectLocation}
        setIsFahrenheit={setIsFahrenheit}
      />
    </section>
  );
};
