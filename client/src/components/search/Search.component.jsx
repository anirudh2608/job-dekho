import { useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { selectJobs } from '../../store/jobs/jobs.selector';
import { selectJob } from '../../store/job/job.selector';

import FormInputSelect from '../form-input-select/FormInputSelect.component';
import FormInput from '../form-input/FormInput.component';

import { clearFilters, updateFilter } from '../../store/jobs/jobs.action';

import Wrapper from './search.style';




const SearchContainer = () => {

    const dispatch = useDispatch()

    const [localSearch, setLocalSearch] = useState('');
    const {
        isLoading,
        searchStatus,
        searchType,
        sort,
        sortOptions,
    } = useSelector(selectJobs)

    const {
        statusOptions,
        jobTypeOptions
    } = useSelector(selectJob)


    const handleSearch = (e) => {
        dispatch(updateFilter({ name: e.target.name, value: e.target.value }))
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLocalSearch('');
        dispatch(clearFilters())
    };

    const debounce = () => {
        let timeoutID;
        return (e) => {
            setLocalSearch(e.target.value);
            clearTimeout(timeoutID);
            timeoutID = setTimeout(() => {
                dispatch(updateFilter({ name: e.target.name, value: e.target.value }))
            }, 1000);
        };
    };
    const optimizedDebounce = useMemo(() => debounce(), []);

    return (
        <Wrapper>
            <form className='form'>
                <h4>search form</h4>
                <div className='form-center'>
                    {/* search position */}
                    <FormInput
                        type='text'
                        name='search'
                        value={localSearch}
                        handleChange={optimizedDebounce}
                    />
                    {/* search by status */}
                    <FormInputSelect
                        labelText='status'
                        name='searchStatus'
                        value={searchStatus}
                        handleChange={handleSearch}
                        list={['all', ...statusOptions]}
                    />
                    {/* search by type */}
                    <FormInputSelect
                        labelText='type'
                        name='searchType'
                        value={searchType}
                        handleChange={handleSearch}
                        list={['all', ...jobTypeOptions]}
                    />
                    {/* sort */}
                    <FormInputSelect
                        name='sort'
                        value={sort}
                        onChange={handleSearch}
                        list={sortOptions}
                    />
                    <button
                        className='btn btn-block btn-danger'
                        disabled={isLoading}
                        onClick={handleSubmit}
                    >
                        clear filters
                    </button>
                </div>
            </form>
            `` </Wrapper>
    );
};

export default SearchContainer;
