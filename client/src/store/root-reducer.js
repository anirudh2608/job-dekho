import { combineReducers } from "redux"

import { userReducer } from "./user/user.reducer"
import { alertReducer } from "./alert/alert.reducer"
import { jobReducer } from "./job/job.reducer"
import { jobsReducer } from "./jobs/jobs.reducer"
import { statsReducer } from "./stats/stats.reducer"

export const rootReducer = combineReducers({
    user: userReducer,
    alert: alertReducer,
    job: jobReducer,
    jobs: jobsReducer,
    stats:statsReducer
})