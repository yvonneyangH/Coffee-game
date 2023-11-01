import React,{useState} from 'react';
import { useNavigate } from 'react-router-dom';
import LoginModal from './Login';
import { useSelector,useDispatch } from 'react-redux';
import { logout } from '../store';



const Home = ()=> {
  const user = useSelector((state) => state.auth)
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoginModalOpen, setIsLoginModal] = useState(false)

  const handleStartGame = () => {
    navigate('/game');
  }
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
    <div id="homeDiv" style={{background:'#cea573',height:'97.76vh',textAlign:"center"}}>

      <div id="homeContainer" style={{dispaly:"flex",alignItems:"center",flexDirection:"column",justifyContent:"center",textAlign:"center",marginLeft:"5rem",marginRight:"5rem"}}>
        <div style={{fontSize: "260px",textAlign:"center",paddingTop:"6rem"}}>☕️</div>
        <p style={{color:"white",fontSize:"2rem"}}> welcome{ user.username?<span> {user.username} !</span>:<span style={{color:"white"}}> !</span>}</p>
        <div style={{textAlign:"center", paddingTop:"1rem",paddingBottom:"1rem"}}>
          <button style={{width:"10rem"}} onClick={handleStartGame}>Start Game</button>
        </div>
        <div style={{textAlign:"center",paddingTop:"1rem",paddingBottom:"1rem"}}>
          {user.username?
          <button style={{width:"10rem"}} onClick={handleLogout}>Log Out</button>:
          <button style={{width:"10rem"}} onClick={openLoginModal}> Log In</button>
          }
          
        </div>
        <div style={{textAlign:"center",paddingTop:"1rem",paddingBottom:"1rem"}}>
          <button style={{width:"10rem"}}>Ranking</button>
        </div> 
      </div>
      {
        isLoginModalOpen&&
          <LoginModal openLoginModal={openLoginModal} closeLoginModal={closeLoginModal}/>
      }
    </div>
  );
};

export default Home;
