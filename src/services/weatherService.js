import axios from 'axios'
import { utilService } from './utilService'
import { storageService } from './storageService'


export const weatherService = {
    getLocation,
    getForecasts,
    getLocationsList,
    getCityForecast,
    saveLocation,
    addToFavoriteCities,
    removeFromFavoriteCities,
    getFavoriteCities

}


const CURRENT_FORECAST = 'CurrForecast'
const CURRENT_LOCATION = 'CurrLocation'
const FAVORITE_LOCATIONS = 'FavoriteLocations'


const API_KEY = '1w3CF38kDW5s83rMMyJNieup0SEwoQtk'

const initialLocation = {
    localizedName: 'Tel Aviv',
    key: '215854',
    country: 'Israel',
    isFavorite: false,
    locationId: '125487'

}



// API CALLING FUNCTIONS

// 1. getLocation function based on coordinates used when firstTime page App Loads

async function getLocation() {
    let currLocation = storageService.load(CURRENT_LOCATION) || null
    if (!currLocation) {
        try {
            const { coords } = await utilService.getCurrentPosition()
            const { latitude, longitude } = coords
            currLocation = await _getLocationByCoords(latitude, longitude)
        }
        catch (err) {
            console.log(`getLocation function error from weatherService`, err)
        }
    }
    storageService.save(CURRENT_LOCATION, currLocation)
   
    return currLocation

}


async function _getLocationByCoords(lat = '32.045', lon = '34.77') {
    try {
        const res = await axios.get(`https://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=${API_KEY}&q=${lat},${lon}`) || null

        return (res) ? _getFormatedLocation(res.data['LocalizedName'], res.data['Key'], res.data['Country']['LocalizedName']) : { ...initialLocation }
    } catch (err) {
        console.log(`getLocationByCoords function error from weatherService`, err)
    }
}

// 2. getForecasts gets 5 day forecast based on city key
async function getForecasts(cityKey = '215854') {

    try {
        const res = await axios.get(`https://dataservice.accuweather.com/forecasts/v1/daily/5day/${cityKey}?apikey=${API_KEY}&metric=true`)
        if ((res.data['DailyForecasts'].length)) {

            const forecasts = res.data['DailyForecasts'].map(forecast => _getFormatedForecast(forecast))

            storageService.save(CURRENT_FORECAST, { forecasts, cityKey })

            return forecasts
        } else {
            return []
        }
    } catch (err) {
        console.log(`getForecasts function error from weatherService`, err)
    }

}
// getForecast For Specific city

async function getCityForecast(cityKey = initialLocation.key) {

    try {
        const res = await axios.get(`https://dataservice.accuweather.com/forecasts/v1/daily/1day/${cityKey}?apikey=${API_KEY}&metric=true`)
       
        if ((res.data['DailyForecasts'].length)) {
            const forecast = _getFormatedForecast(res.data['DailyForecasts'][0])
            return forecast
        } else {
            return null
        }
    } catch (err) {
        console.log(`getCityForecast function error from weatherService`, err)
    }
}

// Autocomplete API CALL
async function getLocationsList(userInput) {
    try {
        const res = await axios.get(`https://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${API_KEY}&q=${userInput}`)
        if (!res.data || res.data.length === 0) return []
        const locations = res.data.map(city => {
            return _getFormatedLocation(city['LocalizedName'], city['Key'], city['Country']['LocalizedName'])
        }
        )
        return locations

    } catch (err) {
        console.log(`There is an error in getLocationsList function`, err)

    }
}

// Location function with no API CALL

function saveLocation(location) {
    const locationToSave = { ...location }
    storageService.save(CURRENT_LOCATION, locationToSave)
    return locationToSave
}

// Favorite Locations functions

function getFavoriteCities() {
    return storageService.load(FAVORITE_LOCATIONS) || []
}

function addToFavoriteCities(location) {

    const newLocation = saveLocation({ ...location, isFavorite: true })
    let favoriteLocations = getFavoriteCities()
    if (favoriteLocations.length) {
        favoriteLocations = [...favoriteLocations, newLocation]
    } else favoriteLocations = [newLocation]

    storageService.save(FAVORITE_LOCATIONS, favoriteLocations)
    return { newLocation, favoriteLocations }
}

function removeFromFavoriteCities(location) {
    const newLocation = saveLocation({ ...location, isFavorite: false })
    let favoriteLocations = getFavoriteCities()
    if (favoriteLocations.length) {
        favoriteLocations = favoriteLocations.filter(location => location.locationId !== newLocation.locationId)
        storageService.save(FAVORITE_LOCATIONS, favoriteLocations)
    } else favoriteLocations = []

    return { newLocation, favoriteLocations }
}



// Helper Functions: to transform data

function _getFormatedLocation(localizedName, key, country) {
    return { localizedName, key, country, locationId: utilService.makeId(), isFavorite: false }
}


function _getFormatedForecast(forecast) {
    let dateTime = new Date(forecast['Date'])
    return {
        forecastId: utilService.makeId(),
        date: dateTime.toDateString(),
        dayForecast: {
            icon: forecast['Day']['Icon'],
            iconPhrase: forecast['Day']['IconPhrase'],
            temperature: forecast['Temperature']['Maximum']['Value']
        },
        nightForecast: {
            icon: forecast['Night']['Icon'],
            iconPhrase: forecast['Night']['IconPhrase'],
            temperature: forecast['Temperature']['Minimum']['Value']
        }

    }
}











