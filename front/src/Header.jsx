import React, {Component} from 'react'
//import particlesJS from 'particles.js'
import {Link} from 'react-router-dom'

import jss from './JSS.jsx'
import CitySelect from './CitySelect.jsx'

const {classes} = jss.createStyleSheet({
    root                : {
        background          : '#FF5443',
        fontSize            : '1em',
        padding             : '1em',
        color               : '#FFF',
        width               : '100vw',
        display             : 'inline-block',
        boxSizing           : 'border-box',
        position            : 'fixed',
        fontWeight          : 'bold',
        zIndex              : 2,
        textAlign           : 'center',
        '& img'             : {
            height              : '1.5em',
            verticalAlign       : 'bottom',
            margin              : '0 auto',
            display             : 'block',
        },
        '& canvas'          : {
            position            : 'absolute',
            top                 : 0,
            left                : 0,
            pointerEvents       : 'none',
        },
        '& a'               : {
            textDecoration      : 'none',
            color               : 'inherit',
        },
        '&:hover'           : {
            '& a'               : {
                transform           : 'scale(1.1)',
            },
        },
    },
}).attach()

class Header extends Component {
    render() {
        return (
            <div className={classes.root} id='particles-header'>
                <Link to='/'>
                    <img src='img/logo.png' alt='Reaktor Logo' />
                    Weather
                </Link>
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
