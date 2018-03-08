import React, {Component} from 'react'
import classnames from 'classnames'
import color from 'color'

import jss from './JSS.jsx'

const brandColor = '#FF5443'

const inactiveBg = '#FFF'
const activeBg = color(brandColor).mix(color(inactiveBg), 0.85).toString()

const paperBg = '#F0F0F0'

const {classes} = jss.createStyleSheet({
    root                : {
        borderBottom        : `1px solid ${paperBg}`,
        padding             : '0.75em',
        boxSizing           : 'border-box',
        '&:hover'           : {
            background          : paperBg,
        },
    },
    container           : {
        margin              : '0 auto',
        display             : 'flex',
        maxWidth            : '70em',
    },
    flexItem            : {
        flex                : 1,
    },
    right               : {
        textAlign           : 'right',
    },
}).attach()

const negativeColor = color('#0000C0')
const neutralColor  = color('#000000')
const positiveColor = color('#C00000')

function _calculateTextColor(value, range, avg) {
    const {min, max} = range
    const deltaMax = (value - avg) / (max - avg)
    const deltaMin = (value - avg) / (min - avg)

    if (value > avg) {
        return neutralColor.mix(positiveColor, deltaMax).toString()
    } else if (value < avg) {
        return neutralColor.mix(negativeColor, deltaMin).toString()
    } else if(value === avg) {
        return neutralColor.toString()
    }
}

function ObservationItem(props) {
    const {temperature, city, timestamp, range, avg} = props

    const formatted = (
        <span
            style={{
                color: _calculateTextColor(temperature, range, avg),
                flex: 1,
                fontWeight: 'bold',
            }}
        >
            {temperature}&deg;
        </span>
    )

    const datetime = new Date(timestamp).toLocaleDateString('fi', {
        day         : 'numeric',
        month       : 'numeric',
        year        : 'numeric',
        //hour        : 'numeric',
        //minute      : 'numeric',
    })

    return (
        <div
            className={classes.root}
        >
            <div className={classes.container}>
                {formatted}
                <div className={classes.flexItem}>{city}</div>
                <div className={classes.right + ' ' + classes.flexItem}>{datetime}</div>
            </div>
        </div>
    )
}

export default ObservationItem
