import React from 'react';

import './AccountPageComponent.css';

const AccountPageComponent = () =>
{
    return(
        <div className="account-page">
            <div className="side-menu">
                <hr />
                <div>Account Info</div>
                <hr />
                <div>Past Orders</div>
                <hr />
            </div>
            <div className="selected-content">

            </div>
        </div>
    );
};

export default AccountPageComponent;