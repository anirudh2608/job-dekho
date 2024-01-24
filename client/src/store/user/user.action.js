import { USER_ACTION_TYPES } from "./user.types"

// User Log IN
export const userLogInStart = ({ email, password }) => {
    return ({
        type: USER_ACTION_TYPES.USER_LOGIN_START,
        payload: { email, password }
    })
}

export const userLogInSuccess = (data) => {
    return ({
        type: USER_ACTION_TYPES.USER_LOGIN_SUCCESS,
        payload: data
    })
}

export const userLogInFailed = (error) => {
    return ({
        type: USER_ACTION_TYPES.USER_LOGIN_FAILED,
        payload: error
    })
}

// User Register
export const userRegisterStart = (userDetails) => {
    return ({
        type: USER_ACTION_TYPES.USER_REGISTER_START,
        payload: userDetails
    })
}

export const userRegisterSuccess = () => {
    return ({
        type: USER_ACTION_TYPES.USER_REGISTER_SUCCESS
    })
}

export const userRegisterFailed = (error) => {
    return ({
        type: USER_ACTION_TYPES.USER_REGISTER_FAILED,
        payload: error
    })
}


// User Update
export const userUpdateStart = ({ name, location, lastName }) => {
    return ({
        type: USER_ACTION_TYPES.USER_UPDATE_START,
        payload: { name, location, lastName }
    })
}

export const userUpdateSuccess = (user) => {
    return ({
        type: USER_ACTION_TYPES.USER_UPDATE_SUCCESS,
        payload: user
    })
}

export const userUpdateFailed = (error) => {
    return ({
        type: USER_ACTION_TYPES.USER_UPDATE_FAILED,
        payload: error
    })
}


//  LogOut User
export const logOutUserStart = () => {
    return ({
        type: USER_ACTION_TYPES.USER_LOGOUT_START
    })
}

export const logOutUserSuccess = () => {
    return ({
        type: USER_ACTION_TYPES.USER_LOGOUT_SUCCESS
    })
}

export const logOutUserFailed = (error) => {
    return ({
        type: USER_ACTION_TYPES.USER_LOGOUT_FAILED,
        payload: error
    })
}


//  Get User
export const getCurrentUserStart = () => {
    return ({
        type: USER_ACTION_TYPES.GET_CURRENT_USER_START
    })
}

export const getCurrentUserSuccess = (user) => {
    return ({
        type: USER_ACTION_TYPES.GET_CURRENT_USER_SUCCESS,
        payload: user
    })
}

export const getCurrentUserFailed = (error) => {
    return ({
        type: USER_ACTION_TYPES.GET_CURRENT_USER_FAILED,
        payload: error
    })
}



//  Toggle Sidebar

export const toggleSidebar = () => {
    return ({
        type: USER_ACTION_TYPES.TOGGLE_SIDEBAR
    })
}