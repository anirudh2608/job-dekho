import { STATS_ACTION_TYPES } from "./stats.types"

// Get Stats
export const getStatsStart = () => {
    return ({
        type: STATS_ACTION_TYPES.GET_STATS_START
    })
}

export const getStatsSuccess = (stats) => {
    return ({
        type: STATS_ACTION_TYPES.GET_STATS_SUCCESS,
        payload: stats
    })
}

export const getStatsFailed = (error) => {
    return ({
        type: STATS_ACTION_TYPES.GET_STATS_FAILED,
        payload: error
    })
}

