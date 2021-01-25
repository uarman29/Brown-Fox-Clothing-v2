import React from 'react';
import './OrderViewCartItemComponent.css';

const OrderViewCartItemComponent = (props) =>
{
    return(
        <div className="order-view-cart-item">
            <div className="image-container">
                <img alt={props.item.name} src={props.item.imageUrl}/>
            </div>
            <span className="name">{props.item.name}</span>
            <span className="quantity">{props.item.quantity}</span>
            <span className="price">${props.item.price}</span>
            <span className="size">{props.item.size}</span>
        </div>
    );
};
export default OrderViewCartItemComponent;