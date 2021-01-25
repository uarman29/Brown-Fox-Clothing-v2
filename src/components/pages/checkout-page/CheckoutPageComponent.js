import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { clearCart } from '../../../redux/actions/cartActions';
import { updateUserInfo, addUserOrder } from '../../../firebase/firebase.utils';
import CustomFormInputComponent from '../../custom-form-input/CustomFormInputComponent';
import CustomButtonComponent from '../../custom-button-component/CustomButtonComponent';
import './CheckoutPageComponent.css';

const CheckoutPageComponent = (props) =>
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
    
    let subTotal = 0;
    const getSubtotal = () =>
    {
        Object.keys(props.cart).forEach(cartItemKey =>{
            let cartItem = props.cart[cartItemKey];
            subTotal += cartItem.quantity * cartItem.price;
        });
    }

    const handleSubmit = async (e) =>
    {
        e.preventDefault();
        if(props.user !== null)
        {
            let address = {street: streetAddress, city: city, state: state, zip: zip};
            let paymentDetails = {nameOnCard: nameOnCard, cardNumber: cardNumber, expirationDate: expirationDate, CVV: CVV};
            await updateUserInfo(props.user.uid, address, paymentDetails);
            await addUserOrder(props.user.uid, address, paymentDetails, props.cart, subTotal.toFixed(2));
        }
        await props.clearCart(true);
        alert("SUCCESS");
        props.history.push("/");
    }

    return(
        <div className="checkout-page">
            <form className="input-form" onSubmit={(e) => handleSubmit(e)}>
                <div className="input-container">
                    <div className="user-info-container">
                        <h2>User Details</h2>
                        <hr />
                        <div className="user-info-input">
                            <CustomFormInputComponent 
                                label="Name" 
                                type="text" 
                                required 
                                name="name" 
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="shipping-info-container">
                        <h2>Shipping Details</h2>
                        <hr />
                        <div className="shipping-info-input">
                            <CustomFormInputComponent 
                                label="Street Address" 
                                type="text" 
                                required 
                                name="address" 
                                value={streetAddress}
                                onChange={(e) => setStreetAddress(e.target.value)}
                            />

                            <CustomFormInputComponent 
                                label="City" 
                                type="text" 
                                required 
                                name="city" 
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                            />

                            <CustomFormInputComponent 
                                label="State" 
                                type="text" 
                                required 
                                name="state" 
                                value={state}
                                onChange={(e) => setState(e.target.value)} 
                            />

                            <CustomFormInputComponent 
                                label="Zip Code" 
                                type="text" 
                                required 
                                name="zip" 
                                value={zip}
                                onChange={(e) => setZip(e.target.value)}
                                pattern="^\d{5}$" 
                            />

                        </div>
                    </div>


                    <div className="card-info-container">
                        <h2>Card Details</h2>
                        <hr />
                        <div className="card-info-input">
                            <CustomFormInputComponent 
                                label="Name on Card" 
                                type="text" 
                                required 
                                name="nameOnCard" 
                                value={nameOnCard}
                                onChange={(e) => setNameOnCard(e.target.value)} 
                            />

                            <CustomFormInputComponent 
                                label="Card Number" 
                                type="text" 
                                required 
                                name="cardNumber" 
                                value={cardNumber}
                                onChange={(e) => setCardNumber(e.target.value)} 
                                pattern="^\d{16}$"
                            />

                            <CustomFormInputComponent 
                                label="Exp. Date" 
                                type="text" 
                                required 
                                name="expirationDate" 
                                value={expirationDate}
                                onChange={(e) => setExpirationDate(e.target.value)} 
                                placeholder="MM/YYYY"
                                pattern="^(0[1-9]|10|11|12)\/20[2-9]{1}[1-9]{1}$"
                            />

                            <CustomFormInputComponent 
                                label="CVV" 
                                type="text" 
                                required 
                                name="CVV" 
                                value={CVV}
                                onChange={(e) => setCVV(e.target.value)}
                                pattern="^[0-9]{3}$" 
                            />

                        </div>
                    </div>
                </div>
            
                {getSubtotal()}
                <div className="payment-details">
                    SUBTOTAL: ${subTotal.toFixed(2)}<br/>
                    SHIPPING: FREE <br />
                    TOTAL: ${(subTotal).toFixed(2)}
                    <CustomButtonComponent type="submit">Checkout</CustomButtonComponent>
                </div>
            </form>
        </div>
    )
}

const mapStateToProps = (state) =>
{
    return {user: state.user.currentUser, cart: state.cart};
}
export default withRouter(connect(mapStateToProps, { clearCart })(CheckoutPageComponent));