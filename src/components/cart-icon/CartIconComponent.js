import React, { useRef, useState } from 'react';
import { connect } from 'react-redux';

import { ReactComponent as ShoppingIcon} from '../../assets/shopping-bag.svg';
import CartDropdownComponent from '../cart-dropdown/CartDropdownComponent';
import './CartIconComponent.css';

const CartIconComponent = (props) =>
{
    const [showDropdown, setShowDropdown] = useState(false);
    const iconElement = useRef(null);

    const countItems = () =>{
        let count = 0;
        Object.keys(props.cart).forEach(itemKey =>{
            count += props.cart[itemKey]["quantity"];
        });
        return count;
    }

    const dropdownController = (event) =>
    {
        event.preventDefault();
        if(iconElement.current.contains(event.target))
        {
            console.log('AYOOO');
            if(!showDropdown)
            {
                console.log('AYOOO HERE');
                setShowDropdown(true);
                document.addEventListener('click', dropdownController);
            }
            else
            {
                console.log('AYOOO THERE');
                setShowDropdown(false);
                document.removeEventListener('click', dropdownController);
            }
        }
        else
        {
            console.log('AYOOO EVERYWHERE');
            setShowDropdown(false);
            document.removeEventListener('click', dropdownController);
        }
        
    }

    return(
        <div ref={iconElement} className="cart-icon-container">
            <div onClick={dropdownController} className="cart-icon">
                <ShoppingIcon className="shopping-icon"/>
                <span className="item-count">{countItems()}</span>
            </div>
            {showDropdown ? (<CartDropdownComponent />) : null}
        </div>
    );
};

const mapStateToProps = (state) =>{
    return {cart: state.cart};
};

export default connect(mapStateToProps)(CartIconComponent);
