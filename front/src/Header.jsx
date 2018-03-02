import React, {Component} from 'react'
//import particlesJS from 'particles.js'

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
        position            : 'fixed',
        zIndex              : 2,
        '& img'             : {
            height              : '1.8em',
            verticalAlign       : 'bottom',
            marginRight         : '1em',
        },
        '& canvas'          : {
            position            : 'absolute',
            top                 : 0,
            left                : 0,
            pointerEvents       : 'none',
        },
    },
}).attach()

class Header extends Component {
    render() {
        return (
            <div className={classes.root} id='particles-header'>
                <img src='img/logo.png' alt='Reaktor Logo' />
                Weather
            </div>
        )
    }

    componentDidMount() {
        /*window.particlesJS.load('particles-header', 'particlesjs-config.json', function() {
            console.log('callback - particles.js config loaded');
        })*/
    }
}

export default Header
