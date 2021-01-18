import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import SpinnerComponent from '../../spinner/SpinnerComponent';
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
                    <div>{item.name}</div>
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = (state) =>
{
    return {isLoading: state.shopData.isLoading, shopData: state.shopData.data};
}

export default withRouter(connect(mapStateToProps)(ItemPageComponent));