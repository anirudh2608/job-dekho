import { ALERT_ACTION_TYPES } from "./alert.types";

const INITIALSTATE = {
    showAlert: false,
    alertText: '',
    alertType: '',
}

export const alertReducer = (state = INITIALSTATE, action) => {

    const { type, payload } = action

    switch (type) {

        case ALERT_ACTION_TYPES.DISPLAY_ALERT:
            return {
                ...state,
                showAlert: true,
                alertText: payload.alertText,
                alertType: payload.alertType,
            }

        case ALERT_ACTION_TYPES.CLEAR_ALERT:
            return {
                ...state,
                showAlert: false,
                alertText: '',
                alertType: '',
            }

        default:
            return state
    }
}