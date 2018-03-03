import React, {Component} from 'react'

import jss from './JSS.jsx'
import {ReduxStore, ReduxActions} from './Redux.js'
import CitySelect from './CitySelect.jsx'

const {classes} = jss.createStyleSheet({
    root                : {
        display             : 'flex',
        overflow            : 'auto',
        maxWidth            : '70em',
        margin              : '0 auto',
    },
    helpText            : {
        color               : '#FF5443',
        fontWeight          : 'bold',
    },
}).attach()

class Summary extends Component {
    state = {
        summary         : {},
        selectedCities  : [],
    }

    render() {
        const {summary, selectedCities} = this.state

        const cities = Object.keys(summary).map(cityId => {
            const city = summary[cityId]
            const isSelected = selectedCities.includes(cityId)

            return (
                <CitySelect
                    key={cityId}
                    cityId={cityId}
                    selected={isSelected}
                    {...city}
                />
            )
        })

        //<div className={classes.helpText}>Click a city to filter results or to add new observation</div>

        return (
            <div>
                <div className={classes.root}>
                    {cities}
                </div>
            </div>
        )
    }

    componentDidMount() {
        this._getSummary()

        ReduxStore.subscribe(() => {
            const {selectedCities} = ReduxStore.getState()
            this.setState({
                selectedCities,
            })
        })
    }

    _getSummary() {
        fetch('/api/summary', {
            // Config
        }).then(resp => {
            return resp.json()
        }).then(summary => {
            this.setState({
                summary
            })

            ReduxStore.dispatch({
                type                : ReduxActions.SET_CITIES_LIST,
                cities              : Object.keys(summary),
            })
        })
    }
}

export default Summary
