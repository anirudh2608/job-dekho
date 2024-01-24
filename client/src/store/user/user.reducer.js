import { USER_ACTION_TYPES } from "./user.types";

const INITIALSTATE = {
    isLoading: false,
    user: null,
    accessToken: null,
    location: null,
    showSidebar: false,
    error: null,
}

export const userReducer = (state = INITIALSTATE, action) => {

    const { type, payload } = action

    switch (type) {

        case USER_ACTION_TYPES.USER_LOGIN_START:
        case USER_ACTION_TYPES.USER_LOGOUT_START:
        case USER_ACTION_TYPES.USER_REGISTER_START:
        case USER_ACTION_TYPES.USER_UPDATE_START:
            return {
                ...state,
                isLoading: true
            }

        case USER_ACTION_TYPES.USER_REGISTER_SUCCESS:
            return {
                ...state,
                isLoading: false
            }

        case USER_ACTION_TYPES.USER_LOGOUT_SUCCESS:
            return {
                ...state,
                isLoading: false,
                error: null,
                user: null,
                accessToken: null
            }

        case USER_ACTION_TYPES.USER_LOGIN_SUCCESS:
        case USER_ACTION_TYPES.USER_UPDATE_SUCCESS:
        case USER_ACTION_TYPES.GET_CURRENT_USER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                error: null,
                user: payload.user,
                location: payload.location,
                accessToken: payload.token

            }

        case USER_ACTION_TYPES.USER_LOGIN_FAILED:
        case USER_ACTION_TYPES.USER_LOGOUT_FAILED:
        case USER_ACTION_TYPES.USER_REGISTER_FAILED:
        case USER_ACTION_TYPES.USER_UPDATE_FAILED:
        case USER_ACTION_TYPES.GET_CURRENT_USER_FAILED:
            return {
                ...state,
                isLoading: false,
                error: payload
            }

        case USER_ACTION_TYPES.TOGGLE_SIDEBAR:
            return {
                ...state,
                showSidebar: !state.showSidebar
            }

        default:
            return state
    }
}