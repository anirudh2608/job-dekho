import { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"

import { selectShowAlert } from '../../store/alert/alert.selector'
import { selectJob } from '../../store/job/job.selector'

import { clearAlert, displayAlert } from '../../store/alert/alert.action'
import { createJobStart, editJobStart, jobFieldHandler } from '../../store/job/job.action'

import Alert from '../../components/alert/Alert.component'
import FormInputSelect from '../../components/form-input-select/FormInputSelect.component'
import FormInput from '../../components/form-input/FormInput.component'

import Wrapper from './add-job.style'




const AddJob = () => {


    const dispatch = useDispatch()

    const showAlert = useSelector(selectShowAlert)
    const jobDetails = useSelector(selectJob)


    const {
        position,
        company,
        jobLocation,
        jobType,
        status,
        isEditing,
        jobTypeOptions,
        statusOptions,
        isLoading
    } = jobDetails



    const handleSubmit = (e) => {
        e.preventDefault()

        if (!position || !company || !jobLocation) {
            dispatch(displayAlert({
                alertText: "Please provide all the values",
                alertType: "danger"
            }))
            return
        }
        if (isEditing) {
            dispatch(editJobStart({ position, company, jobLocation, status, jobType }))
            return
        }

        dispatch(clearAlert())
        dispatch(createJobStart({ position, company, jobLocation, status, jobType }))
    }

    const handleJobInput = (e) => {
        const { name, value } = e.target
        dispatch(jobFieldHandler({ name, value }))
    }

    const clearFields = () => {
        // setFormFields(defaultFieldValues)
    }

    useEffect(()=>{
        document.title="Job Dekho - Add -job"
    },[])


    useEffect(() => {
        dispatch(clearAlert())
    }, [dispatch])


    return (
        <Wrapper>
            <form className='form'>
                <h3>{isEditing ? 'edit job' : 'add job'}</h3>
                {showAlert && <Alert />}
                <div className='form-center'>
                    {/* position */}
                    <FormInput
                        type='text'
                        name='position'
                        value={position}
                        handleChange={handleJobInput}
                    />
                    {/* company */}
                    <FormInput
                        type='text'
                        name='company'
                        value={company}
                        handleChange={handleJobInput}
                    />
                    {/* location */}
                    <FormInput
                        type='text'
                        labelText='job location'
                        name='jobLocation'
                        value={jobLocation}
                        handleChange={handleJobInput}
                    />
                    {/* job status */}
                    <FormInputSelect
                        name='status'
                        value={status}
                        handleChange={handleJobInput}
                        list={statusOptions}
                    />
                    {/* job type */}
                    <FormInputSelect
                        name='jobType'
                        labelText='job type'
                        value={jobType}
                        handleChange={handleJobInput}
                        list={jobTypeOptions}
                    />
                    {/* btn container */}
                    <div className='btn-container'>
                        <button
                            type='submit'
                            className='btn btn-block submit-btn'
                            onClick={handleSubmit}
                            disabled={isLoading}
                        >
                            submit
                        </button>
                        <button
                            className='btn btn-block clear-btn'
                            onClick={(e) => {
                                e.preventDefault()
                                clearFields()
                            }}
                        >
                            clear
                        </button>
                    </div>
                </div>
            </form>
        </Wrapper>
    )
}

export default AddJob
