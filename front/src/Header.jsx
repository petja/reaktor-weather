import React, {Component} from 'react'

import jss from './JSS.jsx'
import CitySelect from './CitySelect.jsx'

const {classes} = jss.createStyleSheet({
    root                : {
        background          : '#FF5443',
        fontSize            : '2em',
        padding             : '1.2em',
        color               : '#FFF',
        width               : '100vw',
        display             : 'inline-block',
        boxSizing           : 'border-box',
        '& img'             : {
            height              : '1.8em',
            verticalAlign       : 'bottom',
            marginRight         : '1em',
        },
    },
}).attach()

class Header extends Component {
    render() {
        return (
            <div className={classes.root}>
                <img src='img/logo.png' alt='Reaktor Logo' />
                Weather
            </div>
        )
    }
}

export default Header
