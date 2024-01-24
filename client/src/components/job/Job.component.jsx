import moment from 'moment'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import JobInfo from '../job-info/JobInfo.component'

import { deleteJobStart, editJob } from '../../store/job/job.action'

import Wrapper from './job.style'
import {
    FaLocationArrow,
    FaBriefcase,
    FaCalendarAlt
} from 'react-icons/fa'



const Job = ({
    _id,
    position,
    company,
    jobLocation,
    jobType,
    createdAt,
    status,
}) => {
    
    
    
    const dispatch = useDispatch()
    
    
    const editJobHander = () => {
        dispatch(editJob({
            _id,
            position,
            company,
            jobLocation,
            jobType,
            status,
        }))
    }
    
    
    const deleteJobHander = () => {
        dispatch(deleteJobStart(_id))
    }
    
    let date = moment(createdAt)
    date = date.format('MMM Do, YYYY')
    return (
        <Wrapper>
            <header>
                <div className='main-icon'>{company.charAt(0)}</div>
                <div className='info'>
                    <h5>{position}</h5>
                    <p>{company}</p>
                </div>
            </header>
            <div className='content'>
                <div className='content-center'>
                    <JobInfo icon={<FaLocationArrow />} text={jobLocation} />
                    <JobInfo icon={<FaCalendarAlt />} text={date} />
                    <JobInfo icon={<FaBriefcase />} text={jobType} />
                    <div className={`status ${status}`}>{status}</div>
                </div>
                <footer>
                    <div className='actions'>
                        <Link
                            to='/dashboard/add-job'
                            className='btn edit-btn'
                            onClick={editJobHander}
                        >
                            Edit
                        </Link>
                        <button
                            type='button'
                            className='btn delete-btn'
                            onClick={deleteJobHander}
                        >
                            Delete
                        </button>
                    </div>
                </footer>
            </div>
        </Wrapper>
    )
}

export default Job
