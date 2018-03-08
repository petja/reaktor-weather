import React, {Component} from 'react'

import jss from './JSS.jsx'
import {ReduxStore, ReduxActions} from './Redux.js'
import ObservationItem from './ObservationItem.jsx'

const {classes} = jss.createStyleSheet({
    root                : {
        //
    },
    allLoaded           : {
        textAlign           : 'center',
        fontSize            : '2em',
        padding             : '2em',
        boxSizing           : 'border-box',
    },
}).attach()

class ObservationList extends Component {
    state = {
        observations        : [],
        pagesLoaded         : -1,
        loading             : false,
        allLoaded           : false,
        selectedCities      : [],
    }

    render() {
        const {observations, allLoaded} = this.state

        // Find min and max temperatures of the data set
        const range = observations.reduce((acc, cur) => {
            return {
                min         : Math.min(acc.min, cur.temperature),
                max         : Math.max(acc.max, cur.temperature),
                sum         : acc.sum + cur.temperature,
            }
        }, {min: 0, max: 0, sum: 0})

        const observationComponents = observations.map(observation => {
            return (
                <ObservationItem
                    key={observation.id}
                    temperature={observation.temperature}
                    city={observation.city}
                    timestamp={observation.timestamp}
                    range={range}
                    avg={range.sum / observations.length}
                />
            )
        })

        return (
            <div>
                {observationComponents}

                {allLoaded ? (
                    <div className={classes.allLoaded}>
                        &#x1f44f;<br />
                        That's all we got
                    </div>
                ): null}
            </div>
        )
    }

    componentDidMount() {
        ReduxStore.subscribe(() => {
            const {selectedCities} = ReduxStore.getState()

            this.setState({
                selectedCities,
                observations        : [],
                pagesLoaded         : -1,
                loading             : false,
                allLoaded           : false,
            }, () => this._getObservations())
        })


        // Attach event listeners for infinite scroll
        const xxx = ['scroll', 'touchstart', 'touchend', 'touchmove', 'touchcancel']
        xxx.forEach(eventName => {
            document.addEventListener(eventName, e => this.handleScroll())
        })

        //this._getObservations()
    }

    handleScroll() {
        const details = document.body
        window.requestAnimationFrame(() => {
            const scrollBottom = details.scrollHeight - details.scrollTop - details.clientHeight
            const threshold = details.clientHeight

            if (scrollBottom <= threshold && !this.state.loading && !this.state.allLoaded) {
                this._getObservations()
            }
        })
    }

    _getObservations() {
        this.setState({
            loading             : true,
        }, () => {
            const {pagesLoaded, selectedCities} = this.state

            if(selectedCities.length < 1) return

            // Construct API URL
            const url = new URL('/api/observations', location.origin)
            url.searchParams.set('cities', selectedCities.join(','))
            url.searchParams.set('page', pagesLoaded + 1)

            fetch(url, {
                // Config
            }).then(resp => {
                return resp.json()

            }).then(observations => {
                const prevObservations = this.state.observations

                this.setState({
                    allLoaded           : (observations.length === 0),
                    loading             : false,
                    observations        : [...prevObservations, ...observations],
                    pagesLoaded         : pagesLoaded + 1,
                }, () => this.handleScroll())

            }).catch(err => {
                // If error occurred on request
                console.error(err)

                // This is pretty awful but enough
                alert('Cannot load observations')

                this.setState({
                    loading             : false,
                })
            })
        })
    }
}

export default ObservationList
