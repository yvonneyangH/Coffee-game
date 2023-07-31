import React from 'react';



const Home = ()=> {
  return (
    <div id="homeDiv" style={{background:'#cea573',height:'97.76vh',textAlign:"center"}}>

      <div id="homeContainer" style={{dispaly:"flex",alignItems:"center",flexDirection:"column",justifyContent:"center",textAlign:"center",marginLeft:"5rem",marginRight:"5rem"}}>
        <div style={{fontSize: "260px",textAlign:"center",paddingTop:"6rem"}}>☕️</div>
        <div style={{textAlign:"center", paddingTop:"1rem",paddingBottom:"1rem"}}>
          <button style={{width:"10rem"}}>Start Game</button>
        </div>
        <div style={{textAlign:"center",paddingTop:"1rem",paddingBottom:"1rem"}}>
          <button style={{width:"10rem"}}>Log In</button>
        </div>
        <div style={{textAlign:"center",paddingTop:"1rem",paddingBottom:"1rem"}}>
          <button style={{width:"10rem"}}>Ranking</button>
        </div> 
      </div>
       
      
    </div>
  );
};

export default Home;
