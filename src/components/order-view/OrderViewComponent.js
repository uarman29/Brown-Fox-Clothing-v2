import React from 'react';
import moment from 'moment';
import OrderViewCartItemComponent from '../order-view-cart-item/OrderViewCartItemComponent';

import './OrderViewComponent.css';

const OrderViewComponent = (props) =>
{
    const renderCart = () =>
    {
        return Object.keys(props.order.cart).map(itemKey =>{
            return <OrderViewCartItemComponent key={itemKey} item={props.order.cart[itemKey]}/>;
        });
    }

    return(
        <div className="order-view">
            <h1>Order Details</h1>
            <h2>Total: ${props.order.total}</h2>
            <h2>Ordered: {moment(props.order.orderDate.toDate()).fromNow()}</h2>
            <h2>Card: ************{props.order.paymentDetails.cardNumber.slice(-4)}</h2>
            <h2>Shipping Address: </h2>
            <div className="shipping-address">
                <div><span>Address: </span> {props.order.address.street}</div>
                <div><span>City: </span> {props.order.address.city}</div>
                <div><span>State: </span> {props.order.address.state}</div>
                <div><span>Zip: </span> {props.order.address.zip}</div>
            </div>
            <div>
                <h2>Cart:</h2>
                {renderCart()}
            </div>
        </div>
    );
};

export default OrderViewComponent;