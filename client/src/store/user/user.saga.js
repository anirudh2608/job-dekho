import axios from "axios"
import { takeLatest, call, put, all } from "redux-saga/effects"

import { USER_ACTION_TYPES } from "./user.types"

import { displayAlert } from "../alert/alert.action"
import {
    getCurrentUserFailed,
    getCurrentUserSuccess,
    logOutUserFailed,
    logOutUserSuccess,
    userLogInFailed,
    userLogInSuccess,
    userRegisterFailed,
    userRegisterSuccess,
    userUpdateFailed,
    userUpdateSuccess
} from "./user.action"

import { baseAPI } from "../../api/baseAPI"





//  User Update
function* userUpdate({ payload }) {
    try {
        const { data } = yield baseAPI.patch("/auth/update", payload)
        yield put(userUpdateSuccess(data))
        yield put(displayAlert({
            alertText: "User Profile Updated",
            alertType: 'success',
        }))
        sessionStorage.setItem("token", data.token)

    } catch (error) {
        yield put(displayAlert({
            alertText: "Something went wrong",
            alertType: 'danger',
        }))
        yield put(userUpdateFailed(error.response.data.msg))
    }
}


// User LogIn
function* userLogIn({ payload }) {
    try {
        const res = yield baseAPI.post("/auth/login", payload)

        // User log in successfully
        if (res.status === 200) {
            yield put(displayAlert({
                alertText: "Login Successful...Redirecting",
                alertType: 'success',
            }))
            yield put(userLogInSuccess(res.data))
            sessionStorage.setItem("token", res.data.token)
        }
        // If there is any other Error  
        else {
            yield put(displayAlert({
                alertText: res.response.data.msg,
                alertType: 'danger',
            }))
            yield put(userLogInFailed(res))
        }
    } catch (error) {
        yield put(userLogInFailed(error))
        yield put(displayAlert({
            alertText: error.response.data.msg,
            alertType: 'danger',
        }))
    }
}


// User Register
export function* userRegister({ payload }) {
    try {
        const res = yield axios.post("http://localhost:5000/api/v1/auth/register", payload)

        // User created successfully
        if (res.status === 201) {
            yield put(displayAlert({
                alertText: res.data.msg,
                alertType: 'success',
            }))
            yield put(userRegisterSuccess())
        }


    } catch (error) {
        yield put(userRegisterFailed(error))
        yield put(displayAlert({
            alertText: error.response.data.msg,
            alertType: 'danger',
        }))
    }
}


function* userLogOut() {
    try {
        yield baseAPI.get('/auth/logout')
        yield put(logOutUserSuccess())
        sessionStorage.setItem("token", null)
    } catch (error) {
        yield put(logOutUserFailed(error))
    }
}


function* getCurrentUser() {
    try {
        const token = yield (sessionStorage.getItem("token"))
        if (token === null) {
            yield put(getCurrentUserFailed("No User"))
            return
        }
        const { data } = yield baseAPI.post('/auth/getCurrentUser', { token })
        yield put(getCurrentUserSuccess(data))
    } catch (error) {
        yield put(getCurrentUserFailed(error))
    }
}



export function* onUserUpdateStart() {
    yield takeLatest(USER_ACTION_TYPES.USER_UPDATE_START, userUpdate)
}

export function* onUserLogInStart() {
    yield takeLatest(USER_ACTION_TYPES.USER_LOGIN_START, userLogIn)
}

export function* onUserRegisterStart() {
    yield takeLatest(USER_ACTION_TYPES.USER_REGISTER_START, userRegister)
}

export function* onLogoutUserStart() {
    yield takeLatest(USER_ACTION_TYPES.USER_LOGOUT_START, userLogOut)
}

export function* onGetCurrentUserStart() {
    yield takeLatest(USER_ACTION_TYPES.GET_CURRENT_USER_START, getCurrentUser)
}



export function* userSaga() {
    yield all([
        call(onUserUpdateStart),
        call(onUserRegisterStart),
        call(onUserLogInStart),
        call(onLogoutUserStart),
        call(onGetCurrentUserStart),

    ])
}