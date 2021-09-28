import { weatherService } from '../../services/weatherService.js'


export function loadForeacsts(key) {
    return async dispatch => {
        try {
            const forecasts = await weatherService.getForecasts(key)
            console.log('loadForeacsts action forecasts', forecasts)
            dispatch({ type: 'SET_FORECASTS', forecasts })
        } catch (err) {
            console.log('there is a problem in loading forecasts in loadForeacsts action', err)
        }

    }
}



export function loadInitialLocation() {
    return async dispatch => {
        try {
            const currLocation = await weatherService.getLocation()
            console.log('from loadinitial location', currLocation)
            dispatch({ type: 'SET_CURRLOCATION', currLocation })
        } catch (err) {
            console.log('there is a problem in loading currLocation in loadCurrentLocation action', err)
        }

    }
}

export function updateCurrtLocation(location) {
    const currLocation = weatherService.saveLocation(location)
    return (dispatch) => dispatch({ type: 'SET_CURRLOCATION', currLocation })
}

export function addToFavorites(location) {
    console.log(location)
    const { newLocation, favoriteLocations } = weatherService.addToFavoriteCities(location)
    console.log(newLocation)
    return (dispatch) => {
        dispatch({ type: 'SET_CURRLOCATION', currLocation: newLocation })
        dispatch({ type: 'SET_FAVORITE_CITIES', favoriteCities: favoriteLocations })
    }

}

export function removeFromFavorites(location) {
    const { newLocation, favoriteLocations } = weatherService.removeFromFavoriteCities(location)
    return (dispatch) => {
        dispatch({ type: 'SET_CURRLOCATION', currLocation: newLocation })
        dispatch({ type: 'SET_FAVORITE_CITIES', favoriteCities: favoriteLocations })
    }

}

export function loadFavoriteCities() {
    const favoriteCities = weatherService.getFavoriteCities()
    return (dispatch) => dispatch({ type: 'SET_FAVORITE_CITIES', favoriteCities })
}

export function setColorMode(boolean) {
    return (dispatch) => dispatch({ type: 'SET_COLOR_MODE', isDarkMode: boolean })
}