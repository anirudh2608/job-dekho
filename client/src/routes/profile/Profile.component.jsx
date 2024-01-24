import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import FormInput from '../../components/form-input/FormInput.component'
import Alert from '../../components/alert/Alert.component'

import {
    selectCurrentUser,
    selectIsLoading,
    selectUserLocation
} from '../../store/user/user.selector'
import { selectShowAlert } from '../../store/alert/alert.selector'

import { userUpdateStart } from '../../store/user/user.action'

import Wrapper from './profile.style'
import { clearAlert, displayAlert } from '../../store/alert/alert.action'




const Profile = () => {

    const dispatch = useDispatch()

    const currentUser = useSelector(selectCurrentUser)
    const userLocation = useSelector(selectUserLocation)

    const isLoading = useSelector(selectIsLoading)

    const showAlert = useSelector(selectShowAlert)

    const [name, setName] = useState(currentUser?.name)
    const [lastName, setLastName] = useState(currentUser?.lastName)
    const [location, setLocation] = useState(userLocation)


    const handleSubmit = (e) => {
        e.preventDefault()

        // name Validation
        if (!name) {
            dispatch(displayAlert({
                alertText: "Please provide Name",
                alertType: 'danger',
            }))
            return
        } else if (name.length < 4 || name.length > 20) {
            dispatch(displayAlert({
                alertText: "Name should be between 4 to 20 characters",
                alertType: 'danger',
            }
            ))
            return
        }

        // lastName Validation
        if (!lastName) {
            dispatch(displayAlert({
                alertText: "Please provide Last Name",
                alertType: 'danger',
            })
            )
            return
        } else {
            if (lastName.length <= 3 || lastName.length > 20) {
                dispatch(displayAlert({
                    alertText: "Last Name should be between 3 to 20 characters",
                    alertType: 'danger',
                }))
                return
            }
        }

        // location Validation
        if (!location) {
            dispatch(displayAlert({
                alertText: "Please provide Location",
                alertType: 'danger',
            }))
            return
        } else {
            if (location.length <= 3 || location.length > 20) {
                dispatch(displayAlert({
                    alertText: "location should be between 3 to 20 characters",
                    alertType: 'danger',
                }))
                return
            }
        }
        dispatch(clearAlert())

        dispatch(userUpdateStart({ name, location, lastName }))
    }

    useEffect(() => {
        document.title = `Job Dekho - ${name}`
    }, [])

    useEffect(() => {
        dispatch(clearAlert())
    }, [])

    return (
        <Wrapper>
            <form className='form' onSubmit={handleSubmit}>
                <h3>profile</h3>
                {showAlert && <Alert />}
                <div className='form-center'>
                    <FormInput
                        type='text'
                        name='name'
                        value={name}
                        handleChange={(e) => setName(e.target.value)}
                    />
                    <FormInput
                        type='text'
                        labelText='last name'
                        name='lastName'
                        value={lastName}
                        handleChange={(e) => setLastName(e.target.value)}
                    />
                    <FormInput
                        type='text'
                        name='location'
                        value={location}
                        handleChange={(e) => setLocation(e.target.value)}
                    />
                    <button className='btn btn-block' type='submit' disabled={false}>
                        {isLoading ? 'Please Wait...' : 'save changes'}
                    </button>
                </div>
            </form>
        </Wrapper>
    )
}

export default Profile
