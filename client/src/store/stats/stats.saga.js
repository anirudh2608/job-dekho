import { takeLatest, call, put, all } from "redux-saga/effects"

import { STATS_ACTION_TYPES } from "./stats.types"

import { baseAPI } from "../../api/baseAPI"

import { displayAlert } from "../alert/alert.action"
import { getStatsFailed, getStatsSuccess } from "./stats.action"
import { logOutUserStart } from "../user/user.action"





// Get Stats
export function* getStats() {

    try {
        const { data } = yield baseAPI.get("/jobs/stats");


        yield put(getStatsSuccess({
            stats: data.defaultStats,
            monthlyApplications: data.monthlyApplications,
        }))
    } catch (error) {
        if (error.response.status === 401)
            yield put(logOutUserStart())

        yield put(displayAlert({
            alertText: error.response.data.msg,
            alertType: 'danger',
        }))

        yield put(getStatsFailed(error))
    }
}



export function* onGetStatsStart() {
    yield takeLatest(STATS_ACTION_TYPES.GET_STATS_START, getStats)
}


export function* statsSaga() {
    yield all([
        call(onGetStatsStart),
    ])
}