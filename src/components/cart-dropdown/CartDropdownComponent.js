import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import CustomButtonComponent from '../custom-button-component/CustomButtonComponent';
import CartItemComponent from '../cart-item/CartItemComponent';

import './CartDropdownComponent.css';


const CartDropdownComponent = (props) =>
{
    const renderCartItems = () =>
    {
        if(props.cart.length === 0)
        {
            return <span className="empty-message">Your cart is empty</span>;
        }

        return Object.keys(props.cart).map(itemKey =>{
            let item = props.cart[itemKey];
            return <CartItemComponent key={item.id} item = {item} />;
        });
    }
    
    return(
    <div className="cart-dropdown">
        <div className="cart-items">
            {renderCartItems()}
        </div>
        <CustomButtonComponent onClick={() => {props.history.push("/checkout");}}>GO TO CHECKOUT</CustomButtonComponent>
    </div>
    );
}

const mapStateToProps = (state) =>{
    return {cart: state.cart};
}
export default withRouter(connect(mapStateToProps)(CartDropdownComponent));