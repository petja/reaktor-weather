import React, {Component} from 'react'

import {
    Area,
    AreaChart,
    CartesianAxis,
    Tooltip,
    ResponsiveContainer,
} from 'recharts'

const data = [{"day":"05-01","temperature":[-1,10]},{"day":"05-02","temperature":[2,15]},{"day":"05-03","temperature":[3,12]},{"day":"05-04","temperature":[4,12]},{"day":"05-05","temperature":[12,16]},{"day":"05-06","temperature":[5,16]},{"day":"05-07","temperature":[3,12]},{"day":"05-08","temperature":[0,8]},{"day":"05-09","temperature":[-3,5]}]

const color = '#FF5443'

class Stats extends Component {
    render() {
        return (
            <div style={{background: color}}>
                <div style={{zIndex: 3}}>
                <ResponsiveContainer height={200}>
                    <AreaChart data={data} margin={{top: 0, right: 0, left: 0, bottom: 0}}>
                        <CartesianAxis />
                        <Area dataKey='temperature' fill={'#FFF'} stroke={'transparent'} />
                        <Tooltip />
                    </AreaChart>
                </ResponsiveContainer>
                </div>
            </div>
        )
    }
}

export default Stats