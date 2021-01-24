import React, { useState } from 'react';
import { connect } from 'react-redux';

import CustomFormInputComponent from '../../custom-form-input/CustomFormInputComponent';
import CustomButtonComponent from '../../custom-button-component/CustomButtonComponent';
import './CheckoutPageComponent.css';

const CheckoutPageComponent = (props) =>
{
    const [name, setName] = useState('');
    const [shippingAddress, setShippingAddress] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [expirationDate, setExpirationDate] = useState('');
    const [CVV, setCVV] = useState('');

    let subTotal = 0;
    const getSubtotal = () =>
    {
        Object.keys(props.cart).forEach(cartItemKey =>{
            let cartItem = props.cart[cartItemKey];
            subTotal += cartItem.quantity * cartItem.price;
        });
    }

    return(
        <div className="checkout-page">
            <div className="input-container">
                <div className="user-info-container">
                    <h2>User Details</h2>
                    <form>
                        <CustomFormInputComponent 
                            label="Name" 
                            type="text" 
                            required 
                            name="name" 
                            value={name}
                            onChange={(e) => setName(e.target.value)} 
                        />

                        <CustomFormInputComponent 
                            label="Shipping Address" 
                            type="text" 
                            required 
                            name="shippingAddress" 
                            value={shippingAddress}
                            onChange={(e) => setShippingAddress(e.target.value)} 
                        />

                    </form>
                </div>
                <div className="card-info-container">
                    <h2>Card Details</h2>
                    <form>
                        <CustomFormInputComponent 
                            label="Card Number" 
                            type="text" 
                            required 
                            name="cardNumber" 
                            value={cardNumber}
                            onChange={(e) => setCardNumber(e.target.value)} 
                        />

                        <CustomFormInputComponent 
                            label="Exp. Date" 
                            type="text" 
                            required 
                            name="expirationDate" 
                            value={expirationDate}
                            onChange={(e) => setExpirationDate(e.target.value)} 
                        />

                        <CustomFormInputComponent 
                            label="CVV" 
                            type="text" 
                            required 
                            name="CVV" 
                            value={CVV}
                            onChange={(e) => setCVV(e.target.value)} 
                        />

                    </form>
                </div>
            </div>
            {getSubtotal()}
            <div className="payment-details">
                SUBTOTAL: ${subTotal.toFixed(2)}<br/>
                SHIPPING: FREE <br />
                TOTAL: ${(subTotal).toFixed(2)}
            </div>
        </div>
    )
}

const mapStateToProps = (state) =>
{
    return {user: state.user.currentUser, cart: state.cart};
}
export default connect(mapStateToProps)(CheckoutPageComponent);