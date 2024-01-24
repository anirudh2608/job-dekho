import { Link } from 'react-router-dom';

import Logo from '../../components/logo/Logo.component';

import main from '../../assets/images/main.svg';
import Wrapper from './landing.style';


const Landing = () => {
    return (
        <>
            {/* {user && <Navigate to='/' />} */}
            <Wrapper>
                <nav>
                    <Logo />
                </nav>
                <div className='container page'>
                    {/* info */}
                    <div className='info'>
                        <h1>
                            job <span>tracking</span> app
                        </h1>
                        <p>
                            Discover the latest opportunities in your field and take your career to the next level. Find job openings that match your skills and experience and apply in just a few clicks.
                        </p>
                        <Link to='/login' className='btn btn-hero'>
                            Login
                        </Link>
                    </div>
                    <img src={main} alt='job hunt' className='img main-img' />
                </div>
            </Wrapper>
        </>
    )
}

export default Landing