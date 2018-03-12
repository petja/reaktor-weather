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

const {classes} = jss.createStyleSheet({
    root                : {
        background          : brandColor,
        paddingTop          : '6em',
    },
}).attach()

class Stats extends Component {
    state = {
        data            : [],
    }

    render() {
        const {data} = this.state
        return (
            <div className={classes.root}>
                <ResponsiveContainer height={200}>
                    <AreaChart data={data} margin={{top: 0, right: 0, left: 0, bottom: 0}}>
                        <CartesianAxis />
                        <XAxis dataKey='date' tick={{fill: '#FFF'}} axisLine={false} tickLine={false} />
                        <YAxis dataKey='temperature' tick={{fill: '#FFF'}} axisLine={false} tickLine={false} orientation='right' />
                        <Area dataKey='temperature' fill='#FFF' stroke={brandColor} />
                        <Tooltip wrapperStyle={{}} />
                    </AreaChart>
                </ResponsiveContainer>
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
