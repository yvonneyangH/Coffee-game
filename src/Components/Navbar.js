import React, { useEffect,useState } from 'react';
import Login from './Login';
import { logout } from '../store';
import { useSelector, useDispatch } from 'react-redux';
import { loginWithToken} from '../store';
import { Link, Routes, Route } from 'react-router-dom';
import LoginModal from './Login';


const Navbar = ()=> {
    const dispatch = useDispatch()
    const { auth } = useSelector(state => state);
    const [isLoginModalOpen, setIsLoginModal] = useState(false);
    const closeLoginModal = () => {
        setIsLoginModal(false)
    }

    const openLoginModal = () => {
        setIsLoginModal(true)
    }

    const handleLogout = () => {
        dispatch(logout());
        navigate("/");
    }
    
    return (
        <>
            <nav>
                <Link to='/'>Home</Link>
                <Link to='/game'>Game</Link>
                {auth.username?(<button className="btn btn-light ms-3" onClick={handleLogout} >logout</button>):
                (<button className="btn btn-light ms-3" onClick={openLoginModal} >login</button>)
                }
            </nav>
            <>
            {
                isLoginModalOpen&&
                <LoginModal openLoginModal={openLoginModal} closeLoginModal={closeLoginModal}/>
            }
            </>
        </>
    )
}
export default Navbar;