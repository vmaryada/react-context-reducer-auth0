import React, { useState } from 'react';
import { UserContext, UserAction, UserLogin } from '../Store/Store.js'
import 'bootstrap/dist/css/bootstrap.min.css';
import Auth from '../Auth/Auth.js'
function Users() {
    const auth = new Auth();

    const [authenticated, setAuthenticated] = useState(false);
    const [user_name, setUserName] = useState('');
    /*useEffect(()=>
    {
       
    auth.handleAuthentication().then(()=>{
      setAuthenticated(true);
    })
    })*/

   
    auth.handleAuthentication().then(() => {
        console.log('handle auth called');
       setUserName( auth.getProfile().name);
        console.log(user_name);
        setAuthenticated(true);
       
    }).catch(error => console.log(error));

    return (
        <div>
            <UserContext.Consumer>
                {context =>
                    <div>
                        <UserAction.Consumer>
                            {dispatch =>
                                <div>
                                    {console.log(context)}
                                     
                                    <h4>Users({context.users.length})</h4>
                                    <hr />
                                    <ul style={{ textAlign: 'left' }}>
                                        {
                                            context.users.map((user, index) =>
                                            <span key={index}>
                                                <li style={{ paddingBottom: '10px' }}><span style={{ minWidth: '100px', display: 'inline-block' }}>{user} &nbsp; &nbsp;</span>
                                                    <button className="btn btn-primary btn-sm" onClick={() => dispatch({ type: 'SUBSCRIBE', payload: context.users[index] })}> Subscribe </button>
                                                </li>
                                            </span>
                                        )}
                                    </ul>
                                </div>
                            }
                        </UserAction.Consumer>

                        <UserLogin.Consumer>
                            {dispatch_1 =>

                                <div>
                                    {authenticated ? <div><button className="btn btn-primary" onClick={() => dispatch_1({ type: 'LOGOUT' })}>LogOut</button>
                                        <span>&nbsp; &nbsp; </span>
                                        {console.log(user_name)}
                                        <button className="btn btn-primary" onClick={() => dispatch_1({ type: 'SUBSCRIBE', payload: user_name })}>Add user to Users</button></div> : <button className="btn btn-primary" onClick={context.handleLogin}>Login</button> }
                                    
                                    
                                    {/*<div><button className="btn btn-primary" onClick={()=>dispatch({type:'LOGIN'})}>LogIn</button>
<span>&nbsp; &nbsp; </span>
   <button className="btn btn-primary" onClick={()=>dispatch({type:'SUBSCRIBE'})}>Add user to Users</button></div> */}
                                    {console.log(authenticated)}
                                </div>
                            }
                        </UserLogin.Consumer>

                    </div>
                }
            </UserContext.Consumer>
            <br /><br />
        </div>
    )
}

export default Users;