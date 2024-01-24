import { JOB_ACTION_TYPES } from "./job.types";

const INITIALSTATE = {
    isLoading: false,
    isEditing: false,
    editJobId: "",
    position: "",
    company: "",
    jobLocation: "",
    jobTypeOptions: ['full-time', 'part-time', 'remote', 'internship'],
    jobType: 'full-time',
    statusOptions: ['interview', 'declined', 'pending'],
    status: 'pending',
    error: null,
}

export const jobReducer = (state = INITIALSTATE, action) => {

    const { type, payload } = action

    switch (type) {

        case JOB_ACTION_TYPES.JOB_FIELD_CHANGE:
            return {
                ...state,
                [payload.name]: payload.value
            }

        case JOB_ACTION_TYPES.CREATE_JOB_START:
            return {
                ...state,
                isLoading: true
            }

        case JOB_ACTION_TYPES.CREATE_JOB_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isEditing: false,
                editJobId: "",
                position: "",
                company: "",
                jobLocation: "",
                jobType: "full-time",
                status: "pending",
            }

        case JOB_ACTION_TYPES.CREATE_JOB_FAILED:
            return {
                ...state,
                isLoading: false
            }


        case JOB_ACTION_TYPES.EDIT_JOB:
            const { _id, position, company, jobLocation, jobType, status } = payload;
            return {
                ...state,
                isEditing: true,
                editJobId: _id,
                position,
                company,
                jobLocation,
                jobType,
                status,
            }

        case JOB_ACTION_TYPES.EDIT_JOB_START:
            return {
                ...state,
                isLoading: true
            }

        case JOB_ACTION_TYPES.EDIT_JOB_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isEditing: false,
                editJobId: "",
                position: "",
                company: "",
                jobLocation: "",
                jobType: "full-time",
                status: "pending",
            }


        case JOB_ACTION_TYPES.EDIT_JOB_FAILED:
            return {
                ...state,
                isEditing: false,
                error: payload
            }


        case JOB_ACTION_TYPES.DELETE_JOB_START:
            return state

        case JOB_ACTION_TYPES.DELETE_JOB_SUCCESS:
            return state

        case JOB_ACTION_TYPES.DELETE_JOB_FAILED:
            return state

        default:
            return state
    }
}