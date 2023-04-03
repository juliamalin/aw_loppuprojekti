import React from 'react';
import {Default} from '../utils/default';
import { useGetUserQuery } from '../main/apiSlice';

export function Login(props){
    let [user,changeUser] = React.useState(Default.user);
    let [minimized,changeMinimized] = React.useState(true);
    let [role,changeRoleState] = React.useState(props.role);
    let [error,changeError] = React.useState("");

    let { data:main, isLoading} = useGetUserQuery();
    if (isLoading) {
        return <div>Loading...</div>;
    }
    else {
        console.log(main)
        return <div>{main}</div>
    }

    /*React.useEffect(function(){
        console.log("Use effect", role);
        HTTP.get("/login").then(function(u){
            console.log("Initial user", u);
            changeUser(u);
            if (u.role=="user" || u.role=="admin") changeRole(u.role);
        })
    },[role])

    const changeUsername = ev => changeUser(Object.assign({}, user, {username:ev.target.value}));
    const changePassword = ev => changeUser(Object.assign({}, user, {password:ev.target.value}));

    function changeRole(r){
        changeRoleState(r);
        if (props.login) props.login(r);
    }

    function tryLogin(){
        HTTP.put("/login", user).then(u => {
            console.log("Response", u);
            changeRole(u.role)            
        }).catch(x => {
            console.log(x);
            changeError(x.message);
            setTimeout(() => changeError(""),3000);
        })
    }

    function logOut(){
        HTTP.delete("/login").then(x => {
            console.log("Logout", x);
            changeRole("none");
            changeUser(Default.user);
            changeMinimized(true);
        }).catch(x => {
            console.log("Logout err", x);
        })
    }*/

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