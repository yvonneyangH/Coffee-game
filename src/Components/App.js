import React, { useEffect } from 'react';
import Home from './Home';
import Login from './Login';
import Navbar from './Navbar';
import Game from './Game';
import { useSelector, useDispatch } from 'react-redux';
import { loginWithToken} from '../store';
import { Link, Routes, Route } from 'react-router-dom';
import Ranking from './Ranking';

const App = ()=> {
  const { auth } = useSelector(state => state);
  const dispatch = useDispatch();
  useEffect(()=> {
    dispatch(loginWithToken());
  }, []);

  useEffect(()=> {
    if(auth.id){
      console.log('hi');
    }
  }, [auth]);
  

  return (
      <div>
        <Navbar/>
        <Routes>
          <Route path='/' element={ <Home /> } />
          <Route path='/game' element={ <Game /> } />
          <Route path ='/ranking' element={<Ranking/>} />
        </Routes>
      </div>
  );
};

export default App;
