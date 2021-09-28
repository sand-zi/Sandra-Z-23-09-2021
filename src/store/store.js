import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'

import { weatherReducer } from './reducers/weatherReducer.js'


const rootReducer = combineReducers({
    weatherModule: weatherReducer
})



export const store = createStore(rootReducer, applyMiddleware(thunk))