import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Logo from '../logo/Logo.component'

import { logOutUserStart, toggleSidebar } from '../../store/user/user.action'

import { selectCurrentUser } from '../../store/user/user.selector'

import Wrapper from './Navbar.style'
import { FaAlignLeft, FaUserCircle, FaCaretDown } from 'react-icons/fa'




const Navbar = () => {

    const [showLogout, setShowLogout] = useState(false)

    const dispatch = useDispatch()

    const currentUser = useSelector(selectCurrentUser)

    const logout = () => {
        dispatch(logOutUserStart())
    }

    const handleToggleSidebar = () => {
        dispatch(toggleSidebar())
    }

    return (
        <Wrapper>
            <div className='nav-center'>
                <button type='button' className='toggle-btn' onClick={handleToggleSidebar}>
                    <FaAlignLeft />
                </button>
                <div>
                    <Logo />
                    <h3 className='logo-text'>dashboard</h3>
                </div>
                <div className='btn-container'>
                    <button
                        type='button'
                        className='btn'
                        onClick={() => setShowLogout(!showLogout)}
                    >
                        <FaUserCircle />
                        {currentUser?.name}
                        <FaCaretDown />
                    </button>
                    <div className={showLogout ? 'dropdown show-dropdown' : 'dropdown'}>
                        <button type='button' className='dropdown-btn' onClick={logout}>
                            logout
                        </button>
                    </div>
                </div>
            </div>
        </Wrapper>
    )
}

export default Navbar
