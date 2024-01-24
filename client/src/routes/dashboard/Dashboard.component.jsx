import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Outlet, useNavigate } from 'react-router-dom'

import Navbar from '../../components/navbar/Navbar.component'
import SmallSidebar from '../../components/small-sidebar/SmallSidebar.component'
import BigSidebar from '../../components/big-sidebar/BigSidebar.component'

import { selectAccessToken } from '../../store/user/user.selector'

import Wrapper from './dashboard.style'



function Dashboard() {

    const navigate = useNavigate()

    const accessToken = useSelector(selectAccessToken)

    useEffect(() => {
        if (!accessToken)
            navigate("/")
    }, [accessToken])

    return (
        <Wrapper>
            <main className='dashboard'>
                <SmallSidebar />
                <BigSidebar />
                <div>
                    <Navbar />
                    <div className='dashboard-page'>
                        <Outlet />
                    </div>
                </div>
            </main>
        </Wrapper>
    )
}

export default Dashboard