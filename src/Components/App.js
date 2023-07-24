import React, { useEffect } from 'react';
import Home from './Home';
import Login from './Login';
import Cart from './Cart';
import Game from './Game';
import { useSelector, useDispatch } from 'react-redux';
import { loginWithToken, fetchCart } from '../store';
import { Link, Routes, Route } from 'react-router-dom';

const App = ()=> {
  const { auth } = useSelector(state => state);
  const dispatch = useDispatch();
  useEffect(()=> {
    dispatch(loginWithToken());
  }, []);

  useEffect(()=> {
    if(auth.id){
      dispatch(fetchCart());
    }
  }, [auth]);
  return (
          <div>
            <nav>
              <Link to='/'>Home</Link>
              <Link to='/game'>Game</Link>
            </nav>
            <Routes>
              <Route path='/' element={ <Home /> } />
              <Route path='/game' element={ <Game /> } />
            </Routes>
          </div>
  );
};

export default App;
