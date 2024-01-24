import React, { useState } from 'react'
import { useSelector } from 'react-redux'

import BarChart from "../BarChart/BarChart.component"
import AreaChart from '../AreaChart/AreaChart.component'

import { selectStats } from '../../store/stats/stats.selector'

import Wrapper from './chart-container.style'


const ChartsContainer = () => {

    const [barChart, setBarChart] = useState(true)
    const { monthlyApplications: data } = useSelector(selectStats)
    
    return (
        <Wrapper>
            <h4>Monthly Applications</h4>
            <button type='button' onClick={() => setBarChart(!barChart)}>
                {barChart ? 'Area Chart' : 'Bar Chart'}
            </button>
            {barChart ? <BarChart data={data} /> : <AreaChart data={data} />}
        </Wrapper>
    )
}

export default ChartsContainer
