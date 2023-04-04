import React from 'react';
import './content.css';
import { Profile } from '../features/profiles/ProfilePage';
import {BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { TaskContainer } from '../features/tasks/taskContainer';
import { StyledEngineProvider } from '@mui/material/styles';




export function Navbar(){
    return <nav className="navbar">
      
      <div className="navbar__left">
          <a href="#" className="navbar__title">TaskRabbit</a>
        </div>
        <div className="navbar__right">
        <Link to="/" className='navbar__button'>Tasks</Link>
        <Link to="/profile" className='navbar__button'>Profile</Link>
        <Link to="/" className='navbar__button'>Log in</Link>
        <Link to="/" className='navbar__button'>Sign up</Link>
        </div>
    </nav>
  }
  
  export function Main(){
  
    return <main>
        <Routes>
            <Route path="/"  element={<TaskContainer />} />
            <Route path="/profile"  element={<Profile />} />
        </Routes>
    </main>
  }
  export default Navbar;