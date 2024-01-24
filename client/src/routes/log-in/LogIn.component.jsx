import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from 'react-router-dom';

import Logo from '../../components/logo/Logo.component'
import FormInput from '../../components/form-input/FormInput.component';
import Alert from '../../components/alert/Alert.component';

import {
    selectAccessToken,
    selectIsLoading
} from '../../store/user/user.selector';
import { selectShowAlert } from '../../store/alert/alert.selector';

import { userLogInStart } from '../../store/user/user.action';
import { clearAlert, displayAlert } from '../../store/alert/alert.action';

import Wrapper from '../register/register.style';




// Defualt form values structure
const defaultFormValues = {
    name: '',
    email: '',
    password: ''
};




function LogIn() {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const isLoading = useSelector(selectIsLoading)
    const showAlert = useSelector(selectShowAlert)
    const accessToken = useSelector(selectAccessToken)

    const [values, setValues] = useState(defaultFormValues);

    //  Handles the form values
    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };


    const onSubmit = (e) => {
        e.preventDefault();
        const { email, password } = values;

        if (!email || !password) {
            dispatch(displayAlert({
                alertText: "Please provide all values",
                alertType: 'danger',
            }))
            return
        }

        dispatch(clearAlert())

        dispatch(userLogInStart({ email, password }))
    };

    useEffect(()=>{
        document.title="Job Dekho - login"
    },[])

    useEffect(() => {
        // If user is Logged in then navigate to a Dashboard
        if (accessToken) {
            setTimeout(() => {
                dispatch(clearAlert())
                navigate('/dashboard/profile');
            }, 3000);
        }
    }, [accessToken, navigate, dispatch]);


    const navigateTo = (path) => {
        dispatch(clearAlert())
        navigate(path)
    }

    return (
        <Wrapper className='full-page'>
            <form className='form' onSubmit={onSubmit}>
                <Logo />
                <h3>Login</h3>

                {showAlert && <Alert />}


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
                    Not a member yet?
                    <button type='button' onClick={() => navigateTo("/register")} className='member-btn'>
                        register
                    </button>
                </p>
            </form>
        </Wrapper>
    )
}

export default LogIn