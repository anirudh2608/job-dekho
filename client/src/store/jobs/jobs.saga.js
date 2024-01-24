import { takeLatest, call, put, all } from "redux-saga/effects"

import { baseAPI } from "../../api/baseAPI"

import { JOBS_ACTION_TYPES } from "./jobs.types"

import { displayAlert } from "../alert/alert.action"
import {
    getJobsFailed,
    getJobsSuccess
} from "./jobs.action"

import { store } from "../store"
import { logOutUserStart } from "../user/user.action"




// get Jobs
export function* getJobs({ payload }) {

    const { page, search, searchStatus, searchType, sort } = store.getState().jobs;

    let url = `/jobs?page=${page}&status=${searchStatus}&jobType=${searchType}&sort=${sort}`;

    if (search) {
        url = url + `&search=${search}`;
    }

    try {
        const { data } = yield baseAPI.get(url)
        const { jobs, totalJobs, numOfPages } = data;

        yield put(getJobsSuccess({ jobs, totalJobs, numOfPages }))
    } catch (error) {
        if (error.response.status === 401)
            yield put(logOutUserStart())

        yield put(displayAlert({
            alertText: error.response.data.msg,
            alertType: 'danger',
        }))
        yield put(getJobsFailed(error))
    }
}



export function* onGetJobsStart() {
    yield takeLatest(JOBS_ACTION_TYPES.GET_JOBS_START, getJobs)
}


export function* jobsSaga() {
    yield all([
        call(onGetJobsStart)
    ])
}