import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { getUserOrders } from '../../firebase/firebase.utils';
import OrderListItemComponent from '../order-list-item/OrderListItemComponent';
import OrderViewComponent from '../order-view/OrderViewComponent';
import './OrderListComponent.css';

const OrderListComponent = (props) =>
{
    const [orders, setOrders] = useState({});
    
    useEffect(() =>{
        if(props.user === null) 
            return null;
        getUserOrders(props.user.uid).then(orders => setOrders(orders));
    },[props.user]);

    const renderOrderList = () =>
    {
        if(orders === {})
            return null;

        return (Object.keys(orders).reverse().map(orderKey =>{
            return <OrderListItemComponent handleClick={(order) => props.setSelectedOrder(order)} key={orderKey} order={orders[orderKey]}/>;
        }));
    }

    if(props.selectedOrder === null)
    {
        return(
            <div className="order-list-container">
                <div className="order-headers">
                    <div>Ordered</div>
                    <div>Total</div>
                    <div>View</div>
                </div>

                <div className="order-list">
                    {renderOrderList()}
                </div>
            </div>
        );
    }
    else
    {
        return <OrderViewComponent order={props.selectedOrder}/>
    }
};

const mapStateToProps = (state) =>
{
    return {user: state.user.currentUser};
}

export default connect(mapStateToProps)(OrderListComponent);