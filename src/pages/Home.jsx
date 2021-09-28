import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { loadInitialLocation } from '../store/actions/weatherActions.js'

import { WeatherApp } from "../cmps/WeatherApp"

export const Home = () => {
    const { isDarkMode } = useSelector(state => state.weatherModule)
    const dispatch = useDispatch()
    useEffect(() => {

        dispatch(loadInitialLocation())
    }, [dispatch])
    return (
        <section className={`home  ${isDarkMode ? 'dark' : ''}`}>
            <WeatherApp />
        </section>
    )
}