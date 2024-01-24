import { useDispatch } from "react-redux"
import { useEffect } from "react"

import JobContainer from "../../components/job-container/JobContainer.component"
import SearchContainer from "../../components/search/Search.component"

import { clearAlert } from "../../store/alert/alert.action"


const AllJobs = () => {

    const dispatch = useDispatch()

    useEffect(()=>{
        document.title="Job Dekho - All jobs"
    },[])

    useEffect(() => {
        dispatch(clearAlert())
    }, [])
    
    return (
        <>
            <SearchContainer />
            <JobContainer />
        </>
    )
}

export default AllJobs
