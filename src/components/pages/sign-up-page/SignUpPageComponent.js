import React, { useState } from 'react';
import CustomFormInputComponent from '../../custom-form-input/CustomFormInputComponent';
import CustomButtonComponent from '../../custom-button-component/CustomButtonComponent';
import { auth, createUserProfileDocument } from '../../../firebase/firebase.utils';
import './SignUpPageComponent.css';

const SignUpPageComponent = () =>
{
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [name, setName] = useState('');

    const handleSubmit = async (event) =>
    {
        event.preventDefault();
        if(password !== confirmPassword)
        {
            alert("Passwords do not match");
            return;
        }

        try
        {
            const { user } = await auth.createUserWithEmailAndPassword(email, password);
            await createUserProfileDocument(user, { displayName: name });
            setEmail('');
            setPassword('');
            setName('');
            setConfirmPassword('');    
        }
        catch(error)
        {
            alert(error.message);
        }

    }

    return(
        <div className="sign-up-page">
            <div className="sign-up-container">
                <h1>Sign Up</h1>
                <form className="sign-up-form" onSubmit={handleSubmit}>
                    <CustomFormInputComponent 
                        label="Name" 
                        type="text" 
                        required 
                        name="name" 
                        value={name}
                        onChange={(e) => setName(e.target.value)} 
                    />

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

                    <CustomFormInputComponent 
                        label="Confirm Password" 
                        type="password" 
                        required 
                        name="confirmPassword" 
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)} 
                    />

                    <div className="buttons">
                        <CustomButtonComponent type="submit">Sign up</CustomButtonComponent>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default SignUpPageComponent;