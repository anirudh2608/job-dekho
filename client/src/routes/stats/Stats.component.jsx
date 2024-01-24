import { useEffect } from 'react'

import StatsContainer from './StatContainer.Component'
import ChartsContainer from '../../components/chart-container/ChartContainer.component'
import Loading from '../../components/loading/Loading.component'
import { useDispatch, useSelector } from 'react-redux'

import { selectStats } from '../../store/stats/stats.selector'
import { getStatsStart } from '../../store/stats/stats.action'

const Stats = () => {

    const dispatch = useDispatch()
    const { isLoading, monthlyApplications } = useSelector(selectStats)

    useEffect(()=>{
        document.title="Job Dekho - stats"
    },[])

    useEffect(() => {
        dispatch(getStatsStart())
        // eslint-disable-next-line
    }, [])

    if (isLoading) {
        return <Loading center />
    }

    return (
        <>
            <StatsContainer />
            {monthlyApplications.length > 0 && <ChartsContainer />}
        </>
    )
}

export default Stats
