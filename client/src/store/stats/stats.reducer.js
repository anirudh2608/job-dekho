import { STATS_ACTION_TYPES } from "./stats.types";

const INITIALSTATE = {
    isLoading: false,
    stats: {},
    monthlyApplications: [],
    error: null,
}

export const statsReducer = (state = INITIALSTATE, action) => {

    const { type, payload } = action

    switch (type) {

        case STATS_ACTION_TYPES.GET_STATS_START:
            return {
                ...state,
                isLoading: true
            }

        case STATS_ACTION_TYPES.GET_STATS_SUCCESS:

            return {
                ...state,
                isLoading: false,
                stats: payload.stats,
                monthlyApplications: payload.monthlyApplications
            }

        case STATS_ACTION_TYPES.GET_STATS_FAILED:
            return {
                ...state,
                isLoading: false
            }
        default:
            return state
    }
}