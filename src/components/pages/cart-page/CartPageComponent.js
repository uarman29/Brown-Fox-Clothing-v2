import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import CartPageItemComponent from '../../cart-page-item/CartPageItemComponent';
import CustomButtonComponent from '../../custom-button-component/CustomButtonComponent';
import './CartPageComponent.css';

const CartPageComponent = (props) =>
{
    let subTotal = 0;
    const renderCart = () =>
    {
        return Object.keys(props.cart).map(cartItemKey =>{
            let cartItem = props.cart[cartItemKey];
            subTotal += cartItem.quantity * cartItem.price;
            return <CartPageItemComponent key={cartItem.id} item = {cartItem}/>;
        });
    }

    return(
        <div className="cart-page">
            <div className="cart-page-container">
                <div className="cart-items">
                    <div className="cart-header">
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
                    <CustomButtonComponent onClick={() => props.history.push('/checkout')}>PROCEED TO CHECKOUT</CustomButtonComponent>
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = (state) =>
{
    return {cart: state.cart};
}

export default withRouter(connect(mapStateToProps)(CartPageComponent));