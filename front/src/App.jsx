import React, {Component} from 'react'
import {render} from 'react-dom'

import {BrowserRouter as Router, Route, Link} from 'react-router-dom'

import {ReduxStore, ReduxActions} from './Redux.js'
import Header from './Header.jsx'
import Summary from './Summary.jsx'
import Stats from './Stats.jsx'
import ObservationList from './ObservationList.jsx'
import ObservationEditor from './ObservationEditor.jsx'
import AddButton from './AddButton.jsx'

const App = () => (
    <div>
        <Header />

        <Route exact path='/' component={ListView} />
        <Route path='/new-observation' component={NewObservationView} />
    </div>
)

const NewObservationView = () => (
    <ObservationEditor />
)

const ListView = (props) => {
    const citiesParam = new URL(props.location.search, window.location).searchParams.get('cities')
    const cities = citiesParam ? citiesParam.split(',') : []

    return (
        <div>
            <Stats cities={cities} />
            <Summary cities={cities} />
            <ObservationList cities={cities} />
            <AddButton />
        </div>
    )
}

const AppRouter = () => (
    <Router>
        <App />
    </Router>
)

document.addEventListener('DOMContentLoaded', () => {
    render(<AppRouter />, document.querySelector('#root'))
})
