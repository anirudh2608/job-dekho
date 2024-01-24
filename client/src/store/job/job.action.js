import { JOB_ACTION_TYPES } from "./job.types"



// Handle job field values
export const jobFieldHandler = ({ name, value }) => {
    console.log({ name, value })
    return ({
        type: JOB_ACTION_TYPES.JOB_FIELD_CHANGE,
        payload: { name, value }
    })
}

// Create job
export const createJobStart = (jobDetails) => {
    return ({
        type: JOB_ACTION_TYPES.CREATE_JOB_START,
        payload: jobDetails
    })
}

export const createJobSuccess = (data) => {
    return ({
        type: JOB_ACTION_TYPES.CREATE_JOB_SUCCESS,
        payload: data
    })
}

export const createJobFailed = (error) => {
    return ({
        type: JOB_ACTION_TYPES.CREATE_JOB_FAILED,
        payload: error
    })
}


// Edit job
export const editJob = (jobDetails) => {
    return ({
        type: JOB_ACTION_TYPES.EDIT_JOB,
        payload: jobDetails
    })
}

export const editJobStart = ({ position, company, jobLocation, status, jobType }) => {
    return ({
        type: JOB_ACTION_TYPES.EDIT_JOB_START,
        payload: { position, company, jobLocation, status, jobType }
    })
}

export const editJobSuccess = () => {
    return ({
        type: JOB_ACTION_TYPES.EDIT_JOB_SUCCESS,
    })
}

export const editJobFailed = (error) => {
    return ({
        type: JOB_ACTION_TYPES.EDIT_JOB_FAILED,
        payload: error
    })
}


// Delete job
export const deleteJobStart = (jobId) => {
    return ({
        type: JOB_ACTION_TYPES.DELETE_JOB_START,
        payload: jobId
    })
}

export const deleteJobSuccess = (data) => {
    return ({
        type: JOB_ACTION_TYPES.DELETE_JOB_SUCCESS,
        payload: data
    })
}

export const deleteJobFailed = (error) => {
    return ({
        type: JOB_ACTION_TYPES.DELETE_JOB_FAILED,
        payload: error
    })
}

