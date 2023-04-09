import React, { useContext } from 'react';
import {Default} from '../utils/default';
import { useGetUserQuery, useLoginUserMutation, useCreateUserMutation, useLogoutUserMutation } from '../main/apiSlice';
import { GoogleLogin } from './google';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../main/store';
import { Link } from 'react-router-dom';
import WebSocketContext from '../websocket/socket';

export function Login(props){
    let user = useSelector(state => state.userReducer.user) || {};
    let [username, changeUsername] = React.useState("");
    let [password, changePassword] = React.useState("");
    const dispatch = useDispatch();


    console.log(user);

    const {data:u, isLoading} = useGetUserQuery();
    const [ loginUser ] = useLoginUserMutation();
    const [ logoutUser ] = useLogoutUserMutation();
    const [ createUser] = useCreateUserMutation();

    if (isLoading) return <div>Loading...</div>

    function logout() {
        logoutUser();
        dispatch(setUser({}));
    }

    function login() {
        let u = {username: username, password: password};
        loginUser(u).unwrap()
            .then((payload) => console.log('Ok', dispatch(setUser(payload))))
            .catch((err) => alert('Bad credentials', err))
        dispatch(setUser(user));

        
    }

    function createU() {
        let u = {username: username, password: password, role: 'user'};
        createUser(u).unwrap()
            .then((payload) => console.log('Ok', payload))
    }

    return <div>
        {user.id == null &&
        <div>
          <input value={user.username} onChange={ev => changeUsername(ev.target.value)} placeholder='Username' />
          <input value={user.password} onChange={ev => changePassword(ev.target.value)} type='password' placeholder='Password' />
        </div>
        }
        
        { user.role &&
        <div>
          <p>{user.username}</p>
          <button onClick={() => logout()}>Kirjaudu ulos</button>
        </div>
        } {user.id == null &&
        <div>
          <input type='button' value='Kirjaudu sisään' onClick={() => login()} />
          <input type='button' value='Luo käyttäjä' onClick={() => createU()} />
          <GoogleLogin />
        </div>
        }
    </div>
    

    /*React.useEffect(function(){
        console.log("Use effect", role);
        HTTP.get("/login").then(function(u){
            console.log("Initial user", u);
            changeUser(u);
            if (u.role=="user" || u.role=="admin") changeRole(u.role);
        })
    },[role])

    function changeRole(r){
        changeRoleState(r);
        if (props.login) props.login(r);
    }

    /*return <div className="login-component">
        {
            role!="none" ? <p>{user.username} <button onClick={logOut}>LogOut</button></p> : <> {
                !minimized ? <>
                    <input value={user.username} onChange={changeUsername} type="text" placeholder="Username" />
                    <input value={user.password} onChange={changePassword} type="password" placeholder="Password" />
                    <button onClick={tryLogin}>Login</button>
                    <button onClick={() => changeMinimized(true)}>Hide</button>
                    {error && <p className="login-error">{error}</p>}
                </> : <button onClick={() => changeMinimized(false)}>Login</button>
            }
            </>
        }
    </div>*/
}