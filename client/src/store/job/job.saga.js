import { takeLatest, call, put, all } from "redux-saga/effects"

import { JOB_ACTION_TYPES } from "./job.types"

import { baseAPI } from "../../api/baseAPI"

import {
    createJobSuccess,
    deleteJobFailed,
    deleteJobSuccess,
    editJobFailed,
    editJobSuccess
} from "./job.action"
import { displayAlert } from "../alert/alert.action"

import { store } from "../store"
import { logOutUserStart } from "../user/user.action"
import { getJobsStart } from "../jobs/jobs.action"


// Create Job
export function* createJob({ payload }) {
    try {
        yield baseAPI.post("/jobs", payload)
        yield put(displayAlert({
            alertText: "Job Created",
            alertType: 'success',
        }))
        yield put(createJobSuccess())
    } catch (error) {
        if (error.response.status === 401)
            yield put(logOutUserStart())

        yield put(displayAlert({
            alertText: error.response.data.msg,
            alertType: 'danger',
        }))
    }
}


// Edit Job
export function* editJob({ payload }) {

    const { editJobId } = store.getState().job
    const { position, company, jobLocation, status, jobType } = payload

    try {
        yield baseAPI.patch(`/jobs/${editJobId}`, {
            company,
            position,
            jobLocation,
            jobType,
            status,
        });

        yield put(displayAlert({
            alertText: "Job Updated",
            alertType: 'success',
        }))

        yield put(editJobSuccess())
    } catch (error) {
        if (error.response.status === 401)
            yield put(logOutUserStart())

        yield put(displayAlert({
            alertText: error.response.data.msg,
            alertType: 'danger',
        }))

        yield put(editJobFailed())
    }
}


// Delete Job
export function* deleteJob({ payload }) {

    try {
        yield baseAPI.delete(`/jobs/${payload}`);

        yield put(displayAlert({
            alertText: "Job Deleted",
            alertType: 'success',
        }))

        yield put(deleteJobSuccess())
        yield put(getJobsStart())
    } catch (error) {
        if (error.response.status === 401)
            yield put(logOutUserStart())

        yield put(displayAlert({
            alertText: error.response.data.msg,
            alertType: 'danger',
        }))

        yield put(deleteJobFailed(error))
    }
}



export function* onCreateJobStart() {
    yield takeLatest(JOB_ACTION_TYPES.CREATE_JOB_START, createJob)
}

export function* onEditJobStart() {
    yield takeLatest(JOB_ACTION_TYPES.EDIT_JOB_START, editJob)
}

export function* onDeleteJobStart() {
    yield takeLatest(JOB_ACTION_TYPES.DELETE_JOB_START, deleteJob)
}


export function* jobSaga() {
    yield all([
        call(onCreateJobStart),
        call(onEditJobStart),
        call(onDeleteJobStart),
    ])
}