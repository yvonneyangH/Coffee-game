import React, { useEffect } from 'react';

import Login from './Login';
import { useSelector, useDispatch } from 'react-redux';
import { loginWithToken} from '../store';
import { Link, Routes, Route } from 'react-router-dom';


const Navbar = ()=> {
    const { auth } = useSelector(state => state);
    return (
        <nav>
            <Link to='/'>Home</Link>
            <Link to='/game'>Game</Link>
            {auth.username?(<button className="btn btn-light ms-3" >logout</button>):
            (<button className="btn btn-light ms-3" >login</button>)
            }
        </nav>
    )
}
export default Navbar;