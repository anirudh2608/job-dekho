import { useDispatch, useSelector } from "react-redux"

import Logo from '../logo/Logo.component'
import NavLinks from '../nav-links/NavLinks.component'

import { selectShowSidebar } from "../../store/user/user.selector"

import { toggleSidebar } from "../../store/user/user.action"

import Wrapper from "./small-sidebar.style"
import { FaTimes } from 'react-icons/fa'




const SmallSidebar = () => {

    const dispatch = useDispatch()

    const showSidebar = useSelector(selectShowSidebar)

    const handleToggleSidebar = () => {
        dispatch(toggleSidebar())
    }

    return (
        <Wrapper>
            <div
                className={
                    showSidebar ? 'sidebar-container show-sidebar' : 'sidebar-container'
                }
            >
                <div className='content'>
                    <button type='button' className='close-btn' onClick={handleToggleSidebar}>
                        <FaTimes />
                    </button>
                    <header>
                        <Logo />
                    </header>
                    <NavLinks toggleSidebar={handleToggleSidebar} />
                </div>
            </div>
        </Wrapper>
    )
}

export default SmallSidebar