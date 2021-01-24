import React from 'react';
import { connect } from 'react-redux';

import { clearItemFromCart, addCartItem, removeCartItem } from '../../redux/actions/cartActions';
import './CartPageItemComponent.css';

const CartPageItemComponent = (props) =>
{
    return(
        <div className="cart-page-item">
            <div className="image-container">
                <img alt={props.item.name} src={props.item.imageUrl}/>
            </div>
            <span className="name">{props.item.name} ({props.item.size})</span>
            <span className="quantity">
                <div className="arrow" onClick={() => props.removeCartItem(props.item)}>&#10094;</div>
                <span className="value">{props.item.quantity}</span>
                <div className="arrow" onClick={() => props.addCartItem(props.item)}>&#10095;</div>
            </span>
            <span className="price">${props.item.price}</span>
            <div className="remove-button" onClick={() => props.clearItemFromCart(props.item)}>&#10005;</div>
        </div>
    );
};

const mapStateToProps = (state) =>
{
    return {cart: state.cart};
}

export default connect(mapStateToProps, { clearItemFromCart, addCartItem, removeCartItem })(CartPageItemComponent);