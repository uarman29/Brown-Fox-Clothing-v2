import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { updateUserInfo } from '../../firebase/firebase.utils';

import CustomButtonComponent from '../custom-button-component/CustomButtonComponent';
import CustomFormInputComponent from '../custom-form-input/CustomFormInputComponent';
import './AccountDetailsComponent.css';

const AccountDetailsComponent = (props) =>
{
    const [name, setName] = useState('');
    const [streetAddress, setStreetAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [zip, setZip] = useState('');
    const [nameOnCard, setNameOnCard] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [expirationDate, setExpirationDate] = useState('');
    const [CVV, setCVV] = useState('');

    const fillData = () =>
    {
        if(props.user !== null)
        {
            setName(props.user.displayName);
            setStreetAddress(props.user.address.street);
            setCity(props.user.address.city);
            setState(props.user.address.state);
            setZip(props.user.address.zip);
            setNameOnCard(props.user.paymentDetails.nameOnCard);
            setCardNumber(props.user.paymentDetails.cardNumber);
            setExpirationDate(props.user.paymentDetails.expirationDate);
            setCVV(props.user.paymentDetails.CVV);
        }
    }

    useEffect(fillData, [props.user]);

    const handleShippingInfoSubmit = async (e) =>
    {
        e.preventDefault();
        let address = {street: streetAddress, city: city, state: state, zip: zip};
        await updateUserInfo(props.user.uid, address, null);
        alert("DONE");
    }

    const handleCardInfoSubmit = async (e) =>
    {
        e.preventDefault();
        let paymentDetails = {nameOnCard: nameOnCard, cardNumber: cardNumber, expirationDate: expirationDate, CVV: CVV};
        await updateUserInfo(props.user.uid, null, paymentDetails);
        alert("DONE");
    }

    return(
        <div className="account-details">
            <div className="user-info-container">
                <h2>User Details</h2>
                <hr />
                <div className="user-info-input">
                    <CustomFormInputComponent 
                        label="Name" 
                        type="text" 
                        disabled
                        value={name}
                        name="name" 
                    />
                </div>
            </div>

            <div className="shipping-info-container">
                <h2>Shipping Details</h2>
                <hr />
                <form className="shipping-info-input" onSubmit={handleShippingInfoSubmit}>
                    <CustomFormInputComponent 
                        label="Street Address" 
                        type="text" 
                        name="address" 
                        value={streetAddress}
                        onChange={(e) => setStreetAddress(e.target.value)}
                    />

                    <CustomFormInputComponent 
                        label="City" 
                        type="text" 
                        name="city" 
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                    />

                    <CustomFormInputComponent 
                        label="State" 
                        type="text" 
                        name="state" 
                        value={state}
                        onChange={(e) => setState(e.target.value)} 
                    />

                    <CustomFormInputComponent
                        label="Zip Code" 
                        type="text" 
                        name="zip" 
                        value={zip}
                        onChange={(e) => setZip(e.target.value)}
                        pattern="^\d{5}$" 
                    />
                    <CustomButtonComponent type="submit">Update</CustomButtonComponent>
                </form>
            </div>


            <div className="card-info-container">
                <h2>Card Details</h2>
                <hr />
                <form className="card-info-input" onSubmit={handleCardInfoSubmit}>
                    <CustomFormInputComponent 
                        label="Name on Card" 
                        type="text" 
                        name="nameOnCard" 
                        value={nameOnCard}
                        onChange={(e) => setNameOnCard(e.target.value)} 
                    />

                    <CustomFormInputComponent 
                        label="Card Number" 
                        type="text"  
                        name="cardNumber" 
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)} 
                        pattern="^\d{16}$"
                    />

                    <CustomFormInputComponent 
                        label="Exp. Date" 
                        type="text" 
                        name="expirationDate" 
                        value={expirationDate}
                        onChange={(e) => setExpirationDate(e.target.value)} 
                        placeholder="MM/YYYY"
                        pattern="^(0[1-9]|10|11|12)\/20[2-9]{1}[1-9]{1}$"
                    />

                    <CustomFormInputComponent 
                        label="CVV" 
                        type="text" 
                        name="CVV" 
                        value={CVV}
                        onChange={(e) => setCVV(e.target.value)}
                        pattern="^[0-9]{3}$" 
                    />
                    <CustomButtonComponent type="submit">Update</CustomButtonComponent>
                </form>
            </div>
        </div>
            
    );
}

const mapStateToProps = (state) =>
{
    return {user: state.user.currentUser};
}

export default connect(mapStateToProps)(AccountDetailsComponent);