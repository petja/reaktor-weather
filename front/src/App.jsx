import React, {Component} from 'react'
import {render} from 'react-dom'

import Header from './Header.jsx'
import Summary from './Summary.jsx'
import AddButton from './AddButton.jsx'

class App extends Component {
    render() {
        return (
            <div>
                <Header />
                <Summary />
                <AddButton />
            </div>
        )
    }
}

document.addEventListener('DOMContentLoaded', () => {
    render(<App />, document.querySelector('#root'))
})
