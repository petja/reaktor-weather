import React, {Component} from 'react'

import jss from './JSS.jsx'
import CitySelect from './CitySelect.jsx'

const {classes} = jss.createStyleSheet({
    root                : {
        display             : 'flex',
        overflow            : 'auto',
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
                    onClick={this._toggleCity(cityId)}
                    {...city}
                />
            )
        })

        return (
            <div>
                <div className={classes.helpText}>Click a city to filter results or to add new observation</div>
                <div className={classes.root}>
                    {cities}
                </div>
            </div>
        )
    }

    componentDidMount() {
        this._getSummary()
    }

    _toggleCity = (cityId) => () => {
        const {selectedCities} = this.state

        const index = selectedCities.indexOf(cityId)

        if (index === -1) {
            selectedCities.push(cityId)
        } else {
            selectedCities.splice(index, 1)
        }

        this.setState({
            selectedCities,
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
        })
    }
}

export default Summary
