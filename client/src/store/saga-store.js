import { all, call } from "redux-saga/effects"

import { userSaga } from "./user/user.saga"
import { jobSaga } from "./job/job.saga"
import { jobsSaga } from "./jobs/jobs.saga"
import { statsSaga } from "./stats/stats.saga"

export function* rootSaga() {
    yield all([
        call(userSaga),
        call(jobSaga),
        call(jobsSaga),
        call(statsSaga)
    ])
}