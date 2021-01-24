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
                <Link className="option" to="/mens">MENS</Link>
                <Link className="option" to="/womens">WOMENS</Link>
                {
                    props.currentUser ? 
                    (
                        <React.Fragment>
                            <Link className="option" to="/account">MY ACCOUNT</Link>
                            <div className="option" onClick={() => auth.signOut()}>SIGN OUT</div>
                        </React.Fragment>
                    )
                    :
                    <Link className="option" to="/signIn">SIGN IN</Link>
                }
                <CartIconComponent />
            </div>
        </div>
    );
};

const mapStateToProps = (state) =>
{
    return { currentUser: state.user.currentUser };
};

export default connect(mapStateToProps)(HeaderComponent);