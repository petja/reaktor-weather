import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'

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
        const {summary} = this.state
        const selectedCities = this.props.cities
        //const selectedCities = Object.keys(summary) || []

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

    _toggleCity = cityId => () => {
        const selectedCities = this.props.cities
        const allCities = Object.keys(this.state.summary) || []

        const index = selectedCities.indexOf(cityId)

        if (index === -1) {
            selectedCities.push(cityId)
        } else {
            selectedCities.splice(index, 1)

            console.log({selectedCities, allCities})

            // If all items have been removed
            /*if(selectedCities.length < 1) {
                allCities.forEach(city => {
                    if(city !== cityId) selectedCities.push(city)
                })
            }*/
        }

        this.props.history.push('/?cities=' + selectedCities.join(','))
    }

    _getSummary() {
        fetch('/api/summary').then(resp => {

            return resp.json()

        }).then(summary => {

            this.setState({
                summary
            })

        }).catch(err => {

            // Ugly but at least it works
            console.error(err)
            alert('Cannot add new observation')

        })
    }
}

export default withRouter(Summary)
