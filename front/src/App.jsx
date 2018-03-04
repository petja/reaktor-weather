import React, {Component} from 'react'
import {render} from 'react-dom'

import {ReduxStore, ReduxActions} from './Redux.js'
import Header from './Header.jsx'
import Summary from './Summary.jsx'
import Stats from './Stats.jsx'
import ObservationList from './ObservationList.jsx'
import AddButton from './AddButton.jsx'

class App extends Component {
    render() {
        return (
            <div>
                <Header />
                <div style={{height: '5em'}} />
                <Stats />
                <Summary />
                <ObservationList ref='observations' />
                <AddButton />
            </div>
        )
    }

    _onScroll() {
        this.refs.observations.handleScroll(
            this.refs.scroll.getValues()
        )
    }
}

const _renderThumb = e => {
    return (
        <div
            style={{
                ...e.style,
                position        : 'relative',
                cursor          : 'pointer',
                borderRadius    : 'inherit',
                background      : 'rgba(0,0,0,.2)',
                zIndex          : 3,
            }}
        />
    )
}

document.addEventListener('DOMContentLoaded', () => {
    render(<App />, document.querySelector('#root'))
})
