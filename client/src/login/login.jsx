import React from 'react';
import {Default} from '../utils/default';
import { useGetUserQuery, useLoginUserMutation, useCreateUserMutation, useLogoutUserMutation } from '../main/apiSlice';
import { GoogleLogin } from './google';

export function Login(props){
    let [user,changeUser] = React.useState(Default.user);
    let [minimized,changeMinimized] = React.useState(true);
    let [role,changeRoleState] = React.useState(props.role);
    let [error,changeError] = React.useState("");

    console.log(user);

    const {data:u, isLoading} = useGetUserQuery();
    const [ loginUser ] = useLoginUserMutation();
    const [ logoutUser ] = useLogoutUserMutation();
    const [ createUser] = useCreateUserMutation();

    if (isLoading) return <div>Loading...</div>

    const changeUsername = ev => changeUser(Object.assign({}, user, {username:ev.target.value}));
    const changePassword = ev => changeUser(Object.assign({}, user, {password:ev.target.value}));

    function logout() {
        logoutUser();
        changeUser(Default.user)
    }

    function login() {
        loginUser(user).unwrap()
            .then((payload) => console.log('Ok', changeUser(payload)))
            .catch((err) => alert('Bad credentials', err))
    }

    function createU() {
        let u = {username: user.username, password: user.password, role: 'user'};
        createUser(u).unwrap()
            .then((payload) => console.log('Ok', payload))
    }

    return <div>
        {user.id == 0 &&
        <div>
          <input value={user.username} onChange={changeUsername} placeholder='Username' />
          <input value={user.password} onChange={changePassword} type='password' placeholder='Password' />
        </div>
        }
        
        { user.role &&
        <div>
          <p>{user.username}</p>
          <button onClick={() => logout()}>Kirjaudu ulos</button>
        </div>
        } {user.id == 0 &&
        <div>
          <button onClick={() => login()}>Kirjaudu sisään</button>
          <button onClick={() => createU()}>Luo käyttäjä</button>
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