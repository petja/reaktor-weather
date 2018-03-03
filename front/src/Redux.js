import {createStore} from 'redux'

// Actions
const ReduxActions = {
    TOGGLE_CITY_FILTER                  : 0,
    SET_CITIES_LIST                     : 1,
    SCROLL                              : 2,
}

function reducer(state, action) {
    switch(action.type) {

        case ReduxActions.TOGGLE_CITY_FILTER:
            const {selectedCities, allCities} = state

            const index = selectedCities.indexOf(action.cityId)

            if (index === -1) {
                selectedCities.push(action.cityId)
            } else {
                selectedCities.splice(index, 1)

                console.log({selectedCities, allCities})

                // If all items have been removed
                if(selectedCities.length < 1) {
                    allCities.forEach(city => {
                        if(city !== action.cityId) selectedCities.push(city)
                    })
                }
            }

            return {
                ...state,
                selectedCities,
            }

            break;

        case ReduxActions.SET_CITIES_LIST:
            return {
                ...state,
                allCities           : [...action.cities],
                selectedCities      : [...action.cities],
            }

            break;
    }

    return state
}

const ReduxStore = createStore(reducer, {
    selectedCities          : [],
    allCities               : [],
},
window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

export {ReduxStore, ReduxActions}
