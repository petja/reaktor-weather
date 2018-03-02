import React, {Component} from 'react'
import classnames from 'classnames'

import jss from './JSS.jsx'

const {classes} = jss.createStyleSheet({
    root                : {
        padding             : '1em',
        margin              : '1em 0.5em',
        border              : '1px solid #000',
        borderRadius        : '0.2em',
        boxSizing           : 'border-box',
        textAlign           : 'center',
        transition          : '0.2s border, 0.2s padding, 0.2s background',
        position            : 'relative',
        cursor              : 'pointer',
        display             : 'inline-block',
        flex                : '0 0 15em',
        background          : '#ff544300',
        '-webkit-tap-highlight-color': 'transparent',
        '&:hover'           : {
            padding             : 'calc(1em - 1px)',
            border              : '2px solid #FF5443',
        },
        '&:after'           : {
            position            : 'absolute',
            content             : '"\u2713"',
            background          : '#FF5443',
            right               : '-0.75em',
            top                 : '-0.75em',
            height              : '1.5em',
            width               : '1.5em',
            display             : 'inline-block',
            color               : '#FFF',
            borderRadius        : '50%',
            transition          : '0.2s transform',
            transform           : 'scale(0)',
        },
    },
    selected            : {
        background          : '#ff54431a',
        padding             : 'calc(1em - 1px)',
        border              : '2px solid #FF5443',
        '&:after'           : {
            transform           : 'scale(1)',
        },
    },
    latest              : {
        marginBottom        : '1em',
        fontWeight          : 'bold',
    },
}).attach()

function CitySelect(props) {
    const {name, selected, min24, max24, latest} = props

    return (
        <div
            className={classnames({[classes.root]: true, [classes.selected]: selected})}
            onClick={props.onClick}
        >
            <div>{name}</div>
            <div className={classes.latest}>{latest ? latest + '\u00B0' : 'Unknown'}</div>
            <small>{min24 ? `min ${min24} \u2003 max ${max24}` : `No temperature data`}</small>
        </div>
    )
}

export default CitySelect
