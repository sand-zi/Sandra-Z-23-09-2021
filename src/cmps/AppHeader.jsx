import { useHistory, NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { setColorMode } from '../store/actions/weatherActions.js'
import { useCallback } from 'react'


export const AppHeader = () => {
    const { isDarkMode } = useSelector(state => state.weatherModule)
    const history = useHistory()

    const dispatch = useDispatch()
    const onSetColorMode = useCallback(() => {
        dispatch(setColorMode(!isDarkMode))

    }, [dispatch, isDarkMode])

    const onGoHome = () => {
        history.push('/')
    }
    return (
        <header className={`app-header flex justify-space-between align-center ${isDarkMode ? 'dark' : ''}`}>
            <h1 className="logo" onClick={onGoHome}>Weather App</h1>
            <nav className='main-nav'>
                <ul className="flex auto-center clean-list">
                    <li><NavLink className="main-link" activeClassName="active-nav" exact to='/'>Home</NavLink></li>
                    <li><NavLink className="main-link" to='/favorites' activeClassName="active-nav">Favorites</NavLink></li>

                </ul>
            </nav>
            <div className="theme-changer">

                <img src={(isDarkMode) ? require('../assets/icons/theme-icon-dark.svg').default : require('../assets/icons/theme-icon-light.svg').default} alt="color-mode-changer" onClick={onSetColorMode} />
            </div>

        </header>
    )
}