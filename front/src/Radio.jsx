import React, {Component} from 'react'

import jss from './JSS.jsx'

const brandColor = '#FF5443'

const {classes} = jss.createStyleSheet({
    root                : {
        position            : 'relative',
        cursor              : 'pointer',
        margin              : '0 1em',
        userSelect          : 'none',
        display             : 'inline-block',

        '& input'           : {
            position            : 'absolute',
            opacity             : 0,
            cursor              : 'pointer',

            '&:checked ~ div'   : {
                background          : brandColor,
            },
        },
    },
    checkmark           : {
        position            : 'absolute',
        top                 : 0,
        left                : 'calc(50% - 0.5em)',
        marginBottom        : '0.5em',
        height              : '1em',
        width               : '1em',
        background          : '#FFF',
        border              : '0.25em solid #FFF',
        borderRadius        : '50%',

        '&:after'           : {
            position            : 'absolute',
            background          : 'red',
        },
    },
    text                : {
        marginTop           : '0.5em',
        display             : 'inline-block',
    },
}).attach()

const Radio = (props) => (
    <label className={classes.root}>
        <input
            type='radio'
            name={props.name}
            checked={props.checked}
            value={props.value}
            onChange={props.onChange}
        />
        <br />
        <span className={classes.text}>{props.text}</span>
        <div className={classes.checkmark} />
    </label>
)

export default Radio
