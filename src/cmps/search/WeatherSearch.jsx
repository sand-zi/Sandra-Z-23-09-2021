import { useRef } from "react";
import debounce from "lodash.debounce";
import { ToastContainer, toast } from "react-toastify";

import { weatherService } from "../../services/weatherService.js";
const customId = "error-toast";
const throwError = (msg) => {
  toast.error(msg, {
    autoClose: 3000,
    toastId: customId,
    closeOnClick: true,
    hideProgressBar: true,
  });
};

export const WeatherSearch = ({ options, setOptions, value, setValue }) => {
  const performSearch = async (input) => {
    const locationOptions = await weatherService.getLocationsList(input);
    if (locationOptions.length) {
      setOptions([...locationOptions]);
    }
  };
  const debouncedSearch = useRef(
    debounce((input) => performSearch(input), 2000)
  ).current;

  const changeBorders = options.length > 0 ? "active-options" : "";

  const onHandleChange = (event) => {
    const { value } = event.target;
    setValue(value);
    let isEnglish = /^[a-zA-Z\s]*$/.test(value);

    if (value.length > 0 && isEnglish) {
      debouncedSearch(value);
    } else if (value.length > 0) {
      throwError("The search is available on English only");
      setValue("");
      return;
    }
  };

  return (
    <div className="weather-search">
      <ToastContainer />
      <input
        type="text"
        value={value}
        onChange={(ev) => onHandleChange(ev)}
        placeholder="Location search"
        className={changeBorders}
      />
    </div>
  );
};
