import React, {Component} from 'react'
import classnames from 'classnames'
import color from 'color'

import jss from './JSS.jsx'

const brandColor = color('#FF5443')
const hoverPrimaryBg = color('#FFF').mix(brandColor, 0.2).toString()
const hoverSecondaryBg = brandColor.lighten(0.2).toString()
const disabledBg = brandColor.lighten(0.5).toString()

const {classes} = jss.createStyleSheet({
    root                : {
        textTransform       : 'uppercase',
        cursor              : 'pointer',
        margin              : '0.25em',
        padding             : '1em',
        border              : 'none',
        font                : 'inherit',
        fontWeight          : 'bold',
        transition          : '0.2s',
        outline             : 'none',
        '&:disabled'        : {
            cursor              : 'not-allowed',
            color               : hoverSecondaryBg,
            background          : `${disabledBg} !important`,
        },
    },
    secondary           : {
        color               : '#FFF',
        background          : brandColor.toString(),
        '&:hover'           : {
            background          : hoverSecondaryBg,
        },
    },
    primary             : {
        background          : '#FFF',
        color               : brandColor.toString(),
        '&:hover'           : {
            background          : hoverPrimaryBg,
        },
    },
}).attach()

function Button(props) {
    const buttonClasses = classnames({
        [classes.root]      : true,
        [classes.primary]   : props.primary,
        [classes.secondary] : !props.primary,
    })

    return (
        <button
            className={buttonClasses}
            disabled={props.disabled}
            onClick={props.onClick}
        >
            {props.children}
        </button>
    )
}

export default Button
