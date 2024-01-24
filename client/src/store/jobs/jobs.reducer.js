import { JOBS_ACTION_TYPES } from "./jobs.types";

const INITIALSTATE = {
    isLoading: false,
    jobs: [],
    totalJobs: 0,
    numOfPages: 1,
    page: 1,
    search: '',
    searchStatus: 'all',
    searchType: 'all',
    sort: 'latest',
    sortOptions: ['latest', 'oldest', 'a-z', 'z-a'],
    error: null,
}



export const jobsReducer = (state = INITIALSTATE, action) => {

    const { type, payload } = action

    switch (type) {

        case JOBS_ACTION_TYPES.GET_JOBS_START:
            return {
                ...state,
                isLoading: true,
            }

        case JOBS_ACTION_TYPES.GET_JOBS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                jobs: payload.jobs,
                totalJobs: payload.totalJobs,
                numOfPages: payload.numOfPages,
            }

        case JOBS_ACTION_TYPES.GET_JOBS_FAILED:
            return {
                ...state,
                isLoading: false,
            }

        case JOBS_ACTION_TYPES.UPDATE_FILTER:
            return {
                ...state,
                page: 1,
                [payload.name]: payload.value
            }

        case JOBS_ACTION_TYPES.CLEAR_FILTER:


            return {
                ...state,
                search: '',
                searchStatus: 'all',
                searchType: 'all',
                sort: 'latest',
            }


        default:
            return state
    }
}