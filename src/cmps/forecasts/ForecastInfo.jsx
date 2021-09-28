import { useState } from "react";


import { CurrLocationForecast } from "./CurrLocationForecast"
import { ForecatsList } from "./ForecastsList"

export const ForecastInfo = ({ forecasts, currLocation, toggleFavorite }) => {
    const [isFahrenheit, setIsFahrenheit] = useState(false)

    return (
        <section className="forecast-info">
            <CurrLocationForecast forecast={forecasts[0]} currLocation={currLocation} isFahrenheit={isFahrenheit} setIsFahrenheit={setIsFahrenheit} toggleFavorite={toggleFavorite}/>
            <ForecatsList forecasts={forecasts} isFahrenheit={isFahrenheit} />
           
        </section>
    )
}