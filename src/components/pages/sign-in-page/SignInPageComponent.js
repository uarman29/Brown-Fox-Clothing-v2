import React from 'react';
import CustomFormInputComponent from '../../custom-form-input/CustomFormInputComponent';
import './SignInPageComponent.css';

const SignInPageComponent = () =>
{
    return(
        <div className="sign-in-page">
            <div className="sign-in-container">
                <h1>Sign In</h1>
                <form>
                    <CustomFormInputComponent label="Email" type="email" required name="email"/>
                    <CustomFormInputComponent label="Password" type="password" required name="password"/>
                </form>
            </div>
        </div>
    );
}

export default SignInPageComponent;