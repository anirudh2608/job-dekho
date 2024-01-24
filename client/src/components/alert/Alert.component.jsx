import React from 'react'
import { useSelector } from 'react-redux'

import {
  selectAlertText,
  selectAlertType,
  selectShowAlert
} from '../../store/alert/alert.selector'


const Alert = () => {

  const alertType = useSelector(selectAlertType)
  const alertText = useSelector(selectAlertText)
  const showAlert = useSelector(selectShowAlert)


  return (
    <div className={`alert alert-${showAlert ? alertType : "danger"}`}>{alertText}</div>
  )
}

export default Alert