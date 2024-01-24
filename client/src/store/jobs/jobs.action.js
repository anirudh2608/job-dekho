import { JOBS_ACTION_TYPES } from "./jobs.types"

// Create job
export const getJobsStart = () => {
    return ({
        type: JOBS_ACTION_TYPES.GET_JOBS_START,
    })
}

export const getJobsSuccess = (jobs) => {
    return ({
        type: JOBS_ACTION_TYPES.GET_JOBS_SUCCESS,
        payload: jobs
    })
}

export const getJobsFailed = (error) => {
    return ({
        type: JOBS_ACTION_TYPES.GET_JOBS_FAILED,
        payload: error
    })
}


// Filter Update
export const updateFilter = ({ name, value }) => {
    return ({
        type: JOBS_ACTION_TYPES.UPDATE_FILTER,
        payload: { name, value }
    })
}


// Clear Filter
export const clearFilters = () => {
    return ({
        type: JOBS_ACTION_TYPES.CLEAR_FILTER,
    })
}


