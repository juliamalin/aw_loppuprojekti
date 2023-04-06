import React from 'react';
import './content.css';
import { ProfilePage } from '../features/profiles/ProfilePage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { TaskPage } from '../features/tasks/TaskPage';
import { TaskContainer } from '../features/tasks/taskContainer';
import { StyledEngineProvider } from '@mui/material/styles';
import { EditProfile } from '../features/profiles/EditProfile';
import { Login } from '../login/login';
import { MyTasks } from '../features/tasks/MyTasks';
import { useSelector } from 'react-redux';




export function Navbar() {
  let user = useSelector(state => state.userReducer.user) || {};
  return <nav className="navbar">

    <div className="navbar__left">
      <Link to="/" className='navbar__button'><a href="/" className="navbar__title">TaskRabbit</a></Link>
    </div>
    <div className="navbar__right">

      {user.id && <div className='navbar__right'>
        <Link to="/mytasks" className='navbar__button'>My Tasks</Link>
        <Link to={"/profile"} className='navbar__button'>Profile</Link>
      </div>
      }
      {!user.id &&
        <div className='navbar__right'>
          <Link to="/login" className='navbar__button'>Log in</Link>
          <Link to="/" className='navbar__button'>Sign up</Link>
        </div>
      }
      {user.id &&
        <Link to="/login" className='navbar__button'>Log Out</Link>
      }
    </div>
  </nav>
}

export function Main() {

  return <main>
    <Routes>
      <Route path="/mytasks" element={<MyTasks />} />
      <Route path="/" element={<TaskPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/profile/edit" element={<EditProfile />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  </main>
}

export default Navbar;