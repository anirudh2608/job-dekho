import { ALERT_ACTION_TYPES } from "./alert.types"


export const displayAlert = ({ alertText, alertType }) => {
    return ({
        type: ALERT_ACTION_TYPES.DISPLAY_ALERT,
        payload: { alertText, alertType }
    })
}

export const clearAlert = () => {
    return ({
        type: ALERT_ACTION_TYPES.CLEAR_ALERT
    })
}


