import React from 'react';
import { connect } from 'react-redux';

import CheckoutItemComponent from '../../checkout-item/CheckoutItemComponent';
import './CheckoutPageComponent.css';

const CheckoutPageCheckout = (props) =>
{
    let subTotal = 0;
    const renderCart = () =>
    {
        return Object.keys(props.cart).map(cartItemKey =>{
            let cartItem = props.cart[cartItemKey];
            subTotal += cartItem.quantity * cartItem.price;
            return <CheckoutItemComponent key={cartItem.id} item = {cartItem}/>;
        });
    }

    return(
        <div className="checkout-page">
            <div className="checkout-page-container">
                <div className="cart-items">
                    <div className="checkout-header">
                        <div className="header-block">
                            <span>Product</span>
                        </div>
                        <div className="header-block">
                            <span>Description</span>
                        </div>
                        <div className="header-block">
                            <span>Quantity</span>
                        </div>
                        <div className="header-block">
                            <span>Price</span>
                        </div>
                        <div className="header-block">
                            <span>Remove</span>
                        </div>
                    </div>
                    {renderCart()}
                </div>
                <div className="payment-details">
                    SUBTOTAL: ${subTotal.toFixed(2)}<br/>
                    SHIPPING: FREE <br />
                    TOTAL: ${(subTotal).toFixed(2)}
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = (state) =>
{
    return {cart: state.cart};
}

export default connect(mapStateToProps)(CheckoutPageCheckout);