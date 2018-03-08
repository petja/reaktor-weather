import React, {Component} from 'react'
import classnames from 'classnames'
import {ReduxStore, ReduxActions} from './Redux.js'
import {Link, withRouter} from 'react-router-dom'

import jss from './JSS.jsx'
import Radio from './Radio.jsx'
import Button from './Button.jsx'

const {classes} = jss.createStyleSheet({
    root                : {
        background          : '#FF5443',
        color               : '#FFF',
        minHeight           : '100%',
        padding             : '6em 3em 3em 3em',
        boxSizing           : 'border-box',
        textAlign           : 'center',
    },
    input               : {
        font                : 'inherit',
        color               : 'inherit',
        border              : 'none',
        background          : 'none',
        outline             : 'none',
        borderBottom        : '0.1em solid #FFF',
    },
    large               : {
        fontSize            : '1.5em',
    },
    section             : {
        margin              : '3em 0',
    },
}).attach()

class ObservationEditor extends Component {
    state = {
    }

    render() {
        const {cities, city} = this.state
        const temperature = parseInt(this.state.temperature)

        const cityButtons = cities ? Object.keys(cities).sort().map(cityId => {
            return (
                <Radio
                    name='city'
                    text={cities[cityId]}
                    key={cityId}
                    value={cityId}
                    checked={this.state.city === cityId}
                    onChange={this.setField('city')}
                />
            )
        }) : null

        const isValid = (
            cities &&
            Object.keys(cities).includes(city) &&
            temperature >= -50 && temperature <= 50
        )

        return (
            <div className={classes.root}>
                <h2>New observation</h2>

                <div className={classes.section}>
                    <div className={classes.large}>
                        <input
                            type='number'
                            min='-50'
                            max='50'
                            value={this.state.temperature}
                            onChange={this.setField('temperature')}
                            className={classes.input}
                        />
                        &deg;C
                    </div>
                </div>

                <div className={classes.section}>
                    {cityButtons}
                </div>

                <div className={classes.section}>
                    <Button
                        primary
                        onClick={this._save}
                        disabled={!isValid}
                    >
                        Save your sighting
                    </Button>
                    <br />
                    <Link to='/'>
                        <Button>Discard</Button>
                    </Link>
                </div>
            </div>
        )
    }

    setField = fieldName => e => {
        this.setState({
            [fieldName]         : e.target.value,
        })
    }

    _save = () => {
        const {city, temperature} = this.state

        const body = JSON.stringify({
            city,
            temperature,
        })

        // Send new observation to the server
        fetch('/api/observations', {
            method              : 'POST',
            headers             : {
                'Content-Type'      : 'application/json',
            },
            body,
        }).then(resp => {

            this.props.history.push('/')

        }).catch(err => {

            // Ugly but at least it works
            console.error(err)
            alert('Cannot add new observation')

        })
    }

    componentDidMount() {
        fetch('/api/cities').then(resp => {
            return resp.json()
        }).then(cities => {
            this.setState({
                cities,
            })
        })
    }
}

export default withRouter(ObservationEditor)
