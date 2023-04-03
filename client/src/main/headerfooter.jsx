import React from 'react';
import './headerfooter.css';

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <a className="navbar-brand" href="#">TaskRabbit</a>
      {/* Ylin rivi tekee mobiiliversion valikosta. Toiseksi ylin tekee hampurilaisvalikon*/}
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        {/* nämä sisältää vasemmanpuoleiset valikot. margin right auto siirtää vasemalle reunalle*/}
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
            <a className="nav-link" href="#">Tasks</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">Profile</a>
          </li>
        </ul>
       {/* nämä sisältää oikeanpuoleiset valikoty. margin left auto siirtää oikealle reunalle*/}
        <ul className="navbar-nav ml-auto"> 
          <li className="nav-item">
            <a className="nav-link" href="#">Log in</a>
          </li>
          <li className="navbar-text"> </li>
          <li className="nav-item">
            <a className="nav-link" href="#">Register</a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
