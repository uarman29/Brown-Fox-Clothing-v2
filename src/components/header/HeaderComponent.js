import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { auth } from '../../firebase/firebase.utils';
import logo from '../../assets/brown_fox_logo_circle.png';
import CartIconComponent from '../cart-icon/CartIconComponent';
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
                {
                    props.currentUser ? 
                    <div className="option" onClick={() => auth.signOut()}>SIGN OUT</div>
                    :
                    <Link className="option" to="/signIn">SIGN IN</Link>
                }
                <Link className="option" to="/checkout"><CartIconComponent /></Link>
            </div>
        </div>
    );
};

const mapStateToProps = (state) =>
{
    return { currentUser: state.user.currentUser };
};

export default connect(mapStateToProps)(HeaderComponent);