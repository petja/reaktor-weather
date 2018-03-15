import React, {Component} from 'react'

import jss from './JSS.jsx'

import {
    Area,
    AreaChart,
    CartesianAxis,
    Tooltip,
    ResponsiveContainer,
    XAxis,
    YAxis,
} from 'recharts'

const brandColor = '#FF5443'
const chartHeight = 200

const {classes} = jss.createStyleSheet({
    root                : {
        background          : brandColor,
        color               : '#FFF',
        paddingTop          : '6em',
    },
    info                : {
        height              : `${chartHeight}px`,
        textAlign           : 'center',
    },
}).attach()

type Props = {
    cities              : string[],
}

class Stats extends Component<Props> {
    state = {
        data            : [],
    }

    render() {
        const {data} = this.state

        const chart = (
            <ResponsiveContainer height={200}>
                <AreaChart data={data} margin={{top: 0, right: 0, left: 0, bottom: 0}}>
                    <CartesianAxis />
                    <XAxis dataKey='date' tick={{fill: '#FFF'}} axisLine={false} tickLine={false} />
                    <YAxis dataKey='temperature' tick={{fill: '#FFF'}} axisLine={false} tickLine={false} orientation='right' />
                    <Area dataKey='temperature' fill='#FFF' stroke={brandColor} />
                    <Tooltip wrapperStyle={{}} />
                </AreaChart>
            </ResponsiveContainer>
        )

        const emptyState = (
            <div className={classes.info}>Pick one or more cities below to show up them</div>
        )

        return (
            <div className={classes.root}>
                {this.props.cities.length > 0 ? chart : emptyState}
            </div>
        )
    }

    componentDidMount() {
        this._refreshData()
    }

    componentWillReceiveProps() {
        this._refreshData()
    }

    _refreshData = () => {
        const {cities} = this.props

        fetch('/api/chart?cities=' + cities.join(','), {
            // Config
        }).then(resp => {
            return resp.json()
        }).then(data => {
            this.setState({
                data
            })
        })
    }
}

export default Stats
