import React, {Component} from 'react'
import {render} from 'react-dom'

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
                <div style={{height: '8em'}} />
                <Stats />
                <Summary />
                <ObservationList cities={['HKI', 'DUB']} />
                <AddButton />
            </div>
        )
    }
}

document.addEventListener('DOMContentLoaded', () => {
    render(<App />, document.querySelector('#root'))
})
