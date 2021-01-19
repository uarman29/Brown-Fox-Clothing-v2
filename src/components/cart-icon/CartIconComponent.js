import React from 'react';
import { connect } from 'react-redux';

import { ReactComponent as ShoppingIcon} from '../../assets/shopping-bag.svg';
import './CartIconComponent.css';

const CartIconComponent = (props) =>{

    const countItems = () =>{
        let count = 0;
        Object.keys(props.cart).forEach(itemKey =>{
            count += props.cart[itemKey]["quantity"];
        });
        return count;
    }

    return(
        <div onClick={props.toggleCartDropdown} className="cart-icon">
            <ShoppingIcon className="shopping-icon"/>
            <span className="item-count">{countItems()}</span>
        </div>
    );
};

const mapStateToProps = (state) =>{
    return {cart: state.cart};
};

export default connect(mapStateToProps)(CartIconComponent);
