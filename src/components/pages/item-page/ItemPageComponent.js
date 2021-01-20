import React, { useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import SpinnerComponent from '../../spinner/SpinnerComponent';
import CustomButtonComponent from '../../custom-button-component/CustomButtonComponent';
import { addCartItem } from '../../../redux/actions/cartActions';
import './ItemPageComponent.css';

const ItemPageComponent = (props) =>
{
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [buttonText, setButtonText] = useState('Add to Cart');
    const [quantity, setQuantity] = useState(1);

    const handleButtonClick = () =>
    {
        setButtonDisabled(true);
        props.addCartItem(item, quantity);
        setButtonText("Added!");
        setTimeout(resetButton, 1000);
    }

    const resetButton = () =>
    {
        setButtonDisabled(false);
        setButtonText("Add to Cart");
    }

    if(props.isLoading)
        return <SpinnerComponent />;

    const item = props.shopData[props.match.params.category]["categories"][props.match.params.subcategory]["items"][props.match.params.itemId];
    return(
        <div className="item-page">
            <div className="item">
                <div 
                    className="item-image" 
                    style={{backgroundImage: `url(${item.imageUrl})`}}
                />
                <div className="item-details">
                    <div className="item-name">{item.name}</div>
                    <hr/>
                    <div className="item-price">${item.price}</div>
                    <div className="quantity">
                        <div className="quantity-label">Quantity:    </div>
                        <div className="quantity-value">
                            <input min="1" max="99" type="number" value={quantity} onChange={(e)=> setQuantity(e.target.value)}/>
                        </div>
                    </div>
                    <div className="add-to-cart-button">
                        <CustomButtonComponent disabled={buttonDisabled} onClick={handleButtonClick} type="button">{buttonText}</CustomButtonComponent>
                    </div>
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = (state) =>
{
    return {isLoading: state.shopData.isLoading, shopData: state.shopData.data};
}

export default withRouter(connect(mapStateToProps, { addCartItem })(ItemPageComponent));