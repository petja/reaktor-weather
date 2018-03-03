import React, {Component} from 'react'

import jss from './JSS.jsx'

const buttonSize = 4
const halfSize = buttonSize / 2

const {classes} = jss.createStyleSheet({
    root                : {
        background          : '#FF5443',
        color               : '#FFF',
        position            : 'fixed',
        right               : halfSize + 'em',
        bottom              : halfSize + 'em',
        height              : buttonSize + 'em',
        width               : buttonSize + 'em',
        display             : 'flex',
        alignItems          : 'center',
        justifyContent      : 'center',
        borderRadius        : '50%',
    },
    icon                : {
        width               : halfSize + 'em',
        height              : halfSize + 'em',
    },
}).attach()

class AddButton extends Component {
    render() {
        return (
            <div className={classes.root}>
                <svg className={classes.icon} viewBox="0 0 24 24">
                    <path fill="currentColor" d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z" />
                </svg>
            </div>
        )
    }
}

export default AddButton
