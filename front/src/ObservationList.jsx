import React, {Component} from 'react'

import jss from './JSS.jsx'

const {classes} = jss.createStyleSheet({
    root                : {
        //
    },
}).attach()

class ObservationList extends Component {
    state = {
        observations    : {},
        pagesLoaded     : -1,
    }

    render() {
        const observations = Object.keys(this.state.observations).map(observationId => {
            const observation = this.state.observations[observationId]
            return (
                <li>
                    {observationId}<br />
                    {observation.temperature}<br />
                    {observation.city}<br />
                    {observation.timestamp}
                </li>
            )
        })

        return (
            <ul>
                {observations}
            </ul>
        )
    }

    componentDidMount() {
        this._getObservations()
    }

    _getObservations() {
        const {pagesLoaded} = this.state

        const url = new URL('/api/observations', location.origin)
        url.searchParams.set('cities', this.props.cities.join(','))
        url.searchParams.set('page', pagesLoaded + 1)

        fetch(url, {
            // Config
        }).then(resp => {
            return resp.json()
        }).then(observations => {
            this.setState({
                observations,
                pagesLoaded: pagesLoaded + 1,
            })
        })
    }
}

export default ObservationList
