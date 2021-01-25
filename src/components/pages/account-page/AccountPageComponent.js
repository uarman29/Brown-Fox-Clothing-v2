import React, { useState } from 'react';

import AccountDetailsComponent from '../../account-details/AccountDetailsComponent';
import OrderListComponent from '../../order-list/OrderListComponent';
import './AccountPageComponent.css';

const AccountPageComponent = () =>
{
    const [showIndex, setShowIndex] = useState(1);
    const [selectedOrder, setSelectedOrder] = useState(null);

    return(
        <div className="account-page">
            <div className="side-menu">
                <hr />
                <div onClick={() => setShowIndex(1)}>Account Info</div>
                <hr />
                <div onClick={() => {setShowIndex(2); setSelectedOrder(null)}}>Past Orders</div>
                <hr />
            </div>
            <div className="selected-content">
                {showIndex === 1 ? <AccountDetailsComponent /> : <OrderListComponent selectedOrder={selectedOrder} setSelectedOrder={setSelectedOrder}/>}
            </div>
        </div>
    );
};

export default AccountPageComponent;