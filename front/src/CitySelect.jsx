import React, {Component} from 'react'
import classnames from 'classnames'
import color from 'color'

import jss from './JSS.jsx'
import {ReduxStore, ReduxActions} from './Redux.js'

const brandColor = '#FF5443'

const inactiveBg = '#FFF'
const activeBg = color(brandColor).mix(color(inactiveBg), 0.85).toString()

const activeHoverBorder = color(brandColor).lighten(0.2).toString()

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
        background          : inactiveBg,
        '-webkit-tap-highlight-color': 'transparent',
        '&:hover'           : {
            padding             : 'calc(1em - 1px)',
            border              : '2px solid #FF5443',
        },
        '&:after'           : {
            position            : 'absolute',
            content             : '"\u2713"',
            background          : '#FF5443',
            right               : 'calc(50% - 0.75em)',
            bottom              : '-0.75em',
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
        background          : activeBg,
        padding             : 'calc(1em - 1px)',
        border              : '2px solid #FF5443',
        '&:hover'           : {
            borderColor         : activeHoverBorder,
        },
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
    const {name, selected, min24, max24, latest, cityId} = props

    const minMax = min24 ? `${min24}\u00B0 min \u2003 max ${max24}\u00B0` : `No temperature data`

    return (
        <div
            className={classnames({[classes.root]: true, [classes.selected]: selected})}
            onClick={props.onClick}
        >
            <div>{name}</div>

            <div className={classes.latest}>{latest != void(0) ? latest + '\u00B0' : 'Unknown'}</div>

            <small>{minMax}</small>
        </div>
    )
}

const _toggleCity = (cityId) => {
    ReduxStore.dispatch({
        type                : ReduxActions.TOGGLE_CITY_FILTER,
        cityId,
    })
}

export default CitySelect
