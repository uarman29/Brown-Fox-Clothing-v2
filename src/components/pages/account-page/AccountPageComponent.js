import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { getUserOrders } from '../../../firebase/firebase.utils';

import AccountDetailsComponent from '../../account-details/AccountDetailsComponent';
import OrderListItemComponent from '../../order-list-item/OrderListItemComponent';
import './AccountPageComponent.css';

const AccountPageComponent = (props) =>
{
    const [showIndex, setShowIndex] = useState(1);
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
            return <OrderListItemComponent key={orderKey} order={orders[orderKey]}/>;
        }));
    }

    return(
        <div className="account-page">
            <div className="side-menu">
                <hr />
                <div onClick={() => setShowIndex(1)}>Account Info</div>
                <hr />
                <div onClick={() => setShowIndex(2)}>Past Orders</div>
                <hr />
            </div>
            <div className="selected-content">
                {showIndex === 1 ? <AccountDetailsComponent /> : (renderOrderList())}
            </div>
        </div>
    );
};

const mapStateToProps = (state) =>
{
    return {user: state.user.currentUser};
}

export default connect(mapStateToProps)(AccountPageComponent);