import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux"

import Job from '../job/Job.component';
import Alert from '../alert/Alert.component';
import Loading from '../loading/Loading.component';
// import PageBtnContainer from './PageBtnContainer';

import { selectJobs } from '../../store/jobs/jobs.selector';
import { selectShowAlert } from '../../store/alert/alert.selector';

import { getJobsStart } from '../../store/jobs/jobs.action';

import Wrapper from './job-container.style';




const JobsContainer = () => {

    const dispatch = useDispatch()
    const showAlert = useSelector(selectShowAlert)
    const {
        isLoading,
        jobs,
        page,
        totalJobs,
        search,
        searchStatus,
        searchType,
        sort
    } = useSelector(selectJobs)

    

    useEffect(() => {
        dispatch(getJobsStart())
        // eslint-disable-next-line
    }, [page, search, searchStatus, searchType, sort]);
    if (isLoading) {
        return <Loading center />;
    }

    if (jobs.length === 0) {
        return (
            <Wrapper>
                <h2>No jobs to display...</h2>
            </Wrapper>
        );
    }

    return (
        <Wrapper>
            {showAlert && <Alert />}
            <h5>
                {totalJobs} job{jobs.length > 1 && 's'} found
            </h5>
            <div className='jobs'>
                {jobs.map((job) => {
                    return <Job key={job._id} {...job} />;
                })}
            </div>
            {/* {numOfPages > 1 && <PageBtnContainer />} */}
        </Wrapper>
    );
};

export default JobsContainer;
