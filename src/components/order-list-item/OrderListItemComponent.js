import React from 'react';
import moment from 'moment';

import CustomButtonComponent from '../custom-button-component/CustomButtonComponent';
import './OrderListItemComponent.css';

const OrderListItemComponent = (props) =>
{
    return(
        <div className="order-list-item">
            <hr />
            <div className="order-list-item-contents">
                <div className="date">{moment(props.order.orderDate.toDate()).fromNow()}</div>
                <div className="total">$ {props.order.total}</div>
                <CustomButtonComponent onClick={() => props.handleClick(props.order)} type="button">View</CustomButtonComponent>
            </div>
            <hr/>
        </div>
    );
}

export default OrderListItemComponent;