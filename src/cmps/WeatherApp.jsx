import { useSelector, useDispatch } from "react-redux";
import {
  loadForeacsts,
  addToFavorites,
  removeFromFavorites,
  updateCurrtLocation,
} from "../store/actions/weatherActions.js";
import { useEffect, useCallback, useState } from "react";
import { ForecastInfo } from "./forecasts/ForecastInfo.jsx";
import { WeatherSearch } from "./search/WeatherSearch.jsx";
import { OptionList } from "./search/OptionList.jsx";
import { ToastContainer, toast } from "react-toastify";

const throwInfo = (msg) => {
  toast.info(msg, {
    autoClose: 2000,
    closeOnClick: true,
    hideProgressBar: true,
  });
};

export const WeatherApp = () => {
  const { currLocation, forecasts } = useSelector((state) => state.weatherModule);
  const [options, setOptions] = useState([]);
  const [value, setValue] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadForeacsts(currLocation.key));
  }, [dispatch, currLocation.key]);

  const addFavorite = useCallback(() => dispatch(addToFavorites(currLocation)), [currLocation, dispatch]);
  const removeFromFavorite = useCallback(() => dispatch(removeFromFavorites(currLocation)), [currLocation, dispatch]);

  const getMessage = (actionStr) => `The ${currLocation.localizedName} was ${actionStr} favorites`;

  const toggleFavorite = () => {
    if (currLocation.isFavorite) {
      removeFromFavorite();
      throwInfo(getMessage("removed from"));
    } else {
      addFavorite();
      throwInfo(getMessage("added to"));
    }
  };
  const onSelectLocation = useCallback(
    (location) => {
      dispatch(updateCurrtLocation({ ...location }));
      setOptions([]);
      setValue("");
    },
    [dispatch]
  );

  return (
    <section className="weather-app">
      <div className="search-container">
        <WeatherSearch setOptions={setOptions} value={value} setValue={setValue} options={options} />
        {options.length > 0 && <OptionList options={options} onSelectLocation={onSelectLocation} />}
      </div>

      {forecasts.length > 0 && (
        <ForecastInfo forecasts={forecasts} currLocation={currLocation} toggleFavorite={toggleFavorite} />
      )}
    </section>
  );
};
