import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import SpinnerComponent from '../../spinner/SpinnerComponent';
import CustomButtonComponent from '../../custom-button-component/CustomButtonComponent';
import { addCartItem } from '../../../redux/actions/cartActions';
import './ItemPageComponent.css';

const ItemPageComponent = (props) =>
{
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
                    <CustomButtonComponent onClick={() => props.addCartItem(item)} type="button">Add to Cart</CustomButtonComponent>
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