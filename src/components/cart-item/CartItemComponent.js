import React from 'react';

import './CartItemComponent.css';

const CartItemComponent  = (props) =>
{
    return(
        <div className="cart-item">
            <img src = {props.item.imageUrl} alt={props.item.name}/>
            <div className="item-details">
                <span className="name">{props.item.name}</span>
                <div className="price">{props.item.quantity} x ${props.item.price}</div>
            </div>
        </div>
    );
};

export default CartItemComponent;