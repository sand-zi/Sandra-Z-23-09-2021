import { useSelector } from "react-redux";

export const TempScalePreview = ({ isFahrenheit, setIsFahrenheit }) => {
  const { isDarkMode } = useSelector((state) => state.weatherModule);
  const firstSign = isFahrenheit ? "°F " : "°C";

  const secondSign = isFahrenheit ? "°C" : "°F ";
  return (
    <span className="temp-scale-preview">
      <span className="active-sign">{firstSign}</span>
      <span className={`border ${isDarkMode ? "dark" : ""} `}></span>
      <span
        className={`non-active-sign  ${isDarkMode ? "dark" : ""}`}
        onClick={() => setIsFahrenheit(!isFahrenheit)}
      >
        {secondSign}
      </span>
    </span>
  );
};
