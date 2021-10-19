// Describe application state as plain objects and arrays.

const initialState = {
  currLocation: {
    localizedName: "Tel Aviv",
    key: "215854",
    country: "Israel",
    isFavorite: false,
    locationId: "125487",
  },
  forecasts: [],
  favoriteCities: [],
  isDarkMode: true,
};

// Describe the logic for handling changes as pure functions.

export function weatherReducer(state = initialState, action) {
  switch (action.type) {
    case "SET_CURRLOCATION":
      return { ...state, currLocation: action.currLocation };
    case "SET_FORECASTS":
      return { ...state, forecasts: action.forecasts };
    case "SET_COLOR_MODE":
      return { ...state, isDarkMode: action.isDarkMode };
    case "SET_FAVORITE_CITIES":
      return { ...state, favoriteCities: action.favoriteCities };
    default:
      return state;
  }
}
