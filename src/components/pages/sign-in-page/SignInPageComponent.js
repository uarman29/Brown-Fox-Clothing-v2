import React, { useState } from 'react';
import CustomFormInputComponent from '../../custom-form-input/CustomFormInputComponent';
import CustomButtonComponent from '../../custom-button-component/CustomButtonComponent';
import { auth, signInWithGoogle } from '../../../firebase/firebase.utils';
import './SignInPageComponent.css';

const SignInPageComponent = () =>
{
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (event) =>
    {
        event.preventDefault();
        try
        {
            await auth.signInWithEmailAndPassword(email, password);
        }
        catch(error)
        {
            alert(error.message);
        }

        setEmail('');
        setPassword('');
    }

    return(
        <div className="sign-in-page">
            <div className="sign-in-container">
                <h1>Sign In</h1>
                <form className="sign-in-form" onSubmit={handleSubmit}>
                    <CustomFormInputComponent 
                        label="Email" 
                        type="email" 
                        required 
                        name="email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} 
                    />

                    <CustomFormInputComponent 
                        label="Password" 
                        type="password" 
                        required 
                        name="password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} 
                    />

                    <div className="buttons">
                        <CustomButtonComponent type="submit">Sign in</CustomButtonComponent>
                        <CustomButtonComponent isGoogleSignIn onClick={signInWithGoogle} type="button">Sign in with Google</CustomButtonComponent>
                    </div>
                    <div className="sign-up-section">
                        Don't have an account? Sign Up
                    </div>
                </form>
            </div>
        </div>
    );
}

export default SignInPageComponent;