import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'

import jss from './JSS.jsx'

const buttonSize = 4
const halfSize = buttonSize / 2

const {classes} = jss.createStyleSheet({
    root                : {
        background          : '#FFC400',
        color               : '#000',
        position            : 'fixed',
        right               : halfSize + 'em',
        bottom              : halfSize + 'em',
        height              : buttonSize + 'em',
        width               : buttonSize + 'em',
        display             : 'flex',
        alignItems          : 'center',
        justifyContent      : 'center',
        borderRadius        : '50%',
        transition          : '0.2s',
        cursor              : 'pointer',
        '&:hover'           : {
            transform           : 'scale(1.1)',
        },
    },
    icon                : {
        width               : halfSize + 'em',
        height              : halfSize + 'em',
        opacity             : 1/3*2,
    },
}).attach()

const AddButton = withRouter(router => (
    <div className={classes.root} onClick={() => router.history.push('/new-observation')} title='New observation'>
        <svg className={classes.icon} viewBox="0 0 24 24">
            <path fill="currentColor" d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z" />
        </svg>
    </div>
))

export default AddButton
