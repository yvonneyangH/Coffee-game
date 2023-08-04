import React, { useState } from 'react';
import { attemptLogin } from '../store';
import { useDispatch } from 'react-redux';




const LoginModal = (props) => {
  const openLoginModal = props.openLoginModal;
  const closeLoginModal = props.closeLoginModal;
  const dispatch = useDispatch();
  const [credentials,setCredentials] = useState({
    username:"",
    email:"",
    password:"",
  })

  const handleLogin = ()=> {

  }
  

  
  return (
      <>
        <div 
          className={ 'loginModal'} 
          id="exampleModal" 
          tabIndex="-1" 
          role="dialog" 
          aria-labelledby="exampleModalLabel" 
          aria-hidden="true" 
          data-mdb-backdrop="false" 
          data-mdb-keyboard="true"
        >
          <div 
            className="modal-dialog modal-side modal-dialog-left  modal-dialog-centered login" 
            role="document" 
            style={{ marginLeft: '5rem', marginRight: 'auto', height: '700px', width: '500px', maxWidth: '800px' }}
          >
            <div className="modal-content" style={{ marginTop: '-30px' }}>
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Log i</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={closeLoginModal}>
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body" style={{ height: '400px', overflowY: 'auto' }}>
                <div>
                  <form>
                    <input
                      placeholder='username'
                      name = 'username'
                      value = {}
                      />
                    <input
                      placeholder='password'
                      name = 'password'
                    />
                    <button>Login</button>
                  </form>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={closeLoginModal}>Close</button>
              </div>
            </div>
          </div>
        </div>
    </>
  );
};


export default LoginModal;

// const Login = ()=> {
//   const dispatch = useDispatch();
//   const [credentials, setCredentials] = useState({
//     username: '',
//     password: ''
//   });

//   const onChange = ev => {
//     setCredentials({...credentials, [ ev.target.name ]: ev.target.value });
//   };

//   const login = (ev)=> {
//     ev.preventDefault();
//     dispatch(attemptLogin(credentials));
//   };
//   return (
    // <div>
    //   <h2>Login</h2>
    //   <form onSubmit={ login }>
    //     <input
    //       placeholder='username'
    //       value = { credentials.username }
    //       name = 'username'
    //       onChange = { onChange }
    //       />
    //     <input
    //       placeholder='password'
    //       name = 'password'
    //       value={ credentials.password }
    //       onChange = { onChange }
    //     />
    //     <button>Login</button>
    //   </form>
    // </div>
//   );
// };

// export default Login;
