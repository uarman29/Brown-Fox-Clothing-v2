import React from 'react';
import { Link } from 'react-router-dom';

import logo from '../../assets/brown_fox_logo_circle.png';
import './HeaderComponent.css';

const HeaderComponent = (props) =>{
    return(
        <div className="header">
            <Link className="logo-container" to="/">
                <img alt="logo" src={logo}/>
            </Link>
            <div className="options">
                <Link className="option" to="/mens">Mens</Link>
                <Link className="option" to="/womens">Womens</Link>
            </div>
        </div>
    );
};

export default HeaderComponent;