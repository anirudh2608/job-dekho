import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from 'react-router-dom';

import Logo from '../../components/logo/Logo.component'
import FormInput from '../../components/form-input/FormInput.component';
import Alert from '../../components/alert/Alert.component';

import { selectIsLoading } from '../../store/user/user.selector';
import { selectAlertType, selectShowAlert } from '../../store/alert/alert.selector';

import { userRegisterStart } from '../../store/user/user.action';
import { clearAlert, displayAlert } from '../../store/alert/alert.action';

import Wrapper from './register.style';



// Defualt form values structure
const defaultFormValues = {
    name: '',
    email: '',
    password: ''
};


function Register() {

    const navigate = useNavigate();
    const dispatch = useDispatch()

    const isLoading = useSelector(selectIsLoading)
    const showAlert = useSelector(selectShowAlert)
    const alertType = useSelector(selectAlertType)

    const [values, setValues] = useState(defaultFormValues);

    const navigateTo = (path) => {
        dispatch(clearAlert())
        navigate(path)
    }

    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };


    const onSubmit = (e) => {
        e.preventDefault();
        const { name, email, password } = values;


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
            }))
            return
        } else if (!isNaN(name)) {
            dispatch(displayAlert({
                alertText: "Name should not container any Number",
                alertType: 'danger',
            }))
            return
        }


        // Email validation
        if (!email) {
            dispatch(displayAlert({
                alertText: "Please provide Email",
                alertType: 'danger',
            }))
            return
        }

        // Password validation
        if (!password) {
            dispatch(displayAlert({
                alertText: "Please provide Password",
                alertType: 'danger',
            }))
            return
        } else if (password.length < 6) {
            dispatch(displayAlert({
                alertText: "password should have more than 6 characters",
                alertType: 'danger',
            }))
            return
        }

        dispatch(clearAlert())


        const userDetails = { name, email, password };

        dispatch(userRegisterStart(userDetails))
    }

    useEffect(() => {
        document.title = "Job Dekho - register"
    }, [])

    useEffect(() => {
        if (alertType === "success") {
            setTimeout(() => {
                dispatch(clearAlert())
                navigate("/login")
            }, 3000)
        }
    }, [alertType])


    return (
        <Wrapper className='full-page'>
            <form className='form' onSubmit={onSubmit}>
                <Logo />
                <h3>Register</h3>
                {showAlert && <Alert />}
                {/* name input */}
                {!values.isMember && (
                    <FormInput
                        type='text'
                        name='name'
                        value={values.name}
                        handleChange={handleChange}
                    />
                )}

                {/* email input */}
                <FormInput
                    type='email'
                    name='email'
                    value={values.email}
                    handleChange={handleChange}
                />
                {/* password input */}
                <FormInput
                    type='password'
                    name='password'
                    value={values.password}
                    handleChange={handleChange}
                />
                <button type='submit' disabled={isLoading} className='btn btn-block'>
                    submit
                </button>

                <p>
                    Already a member?
                    <button type='button' onClick={() => navigateTo("/login")} className='member-btn'>
                        Login
                    </button>
                </p>
            </form>
        </Wrapper>
    )
}

export default Register