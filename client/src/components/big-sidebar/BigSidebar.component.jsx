import { useSelector } from 'react-redux'
import Logo from '../logo/Logo.component'

import NavLinks from '../nav-links/NavLinks.component'

import { selectShowSidebar } from '../../store/user/user.selector'

import Wrapper from './big-sidebar.style'



const BigSidebar = () => {

    const showSidebar = useSelector(selectShowSidebar)

    return (
        <Wrapper>
            <div
                className={
                    showSidebar ? 'sidebar-container ' : 'sidebar-container show-sidebar'
                }
            >
                <div className='content'>
                    <header>
                        <Logo />
                    </header>
                    <NavLinks />
                </div>
            </div>
        </Wrapper>
    )
}

export default BigSidebar
