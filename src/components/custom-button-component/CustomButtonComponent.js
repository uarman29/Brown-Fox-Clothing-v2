import React from 'react';

import './CustomButtonComponent.css';

const CustomButtonComponent = ({children, isGoogleSignIn, inverted, ...otherProps}) =>
{
    return(
        <button className={`${inverted ? 'inverted': '' } ${isGoogleSignIn ? 'google-sign-in': '' } custom-button`} {...otherProps} >
            {children}
        </button>
    );
};

export default CustomButtonComponent;