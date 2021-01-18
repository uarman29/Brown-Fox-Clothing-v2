import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import ItemCardComponent from '../../item-card/ItemCardComponent';
import SpinnerComponent from '../../spinner/SpinnerComponent';

import './CategoryPageComponent.css';

const CategoryPageComponent = (props) =>
{
    const renderItems = () =>
    {
        const collection = props.shopData[props.match.params.category]["categories"][props.match.params.subcategory];
        return Object.keys(collection.items).map(itemKey => {
            return <ItemCardComponent key={collection.items[itemKey].id} item={collection.items[itemKey]} />
        });
    }

    return (props.isLoading ? (<SpinnerComponent />) :
    (
        <div className="category-page">
            <h1>{props.match.params.subcategory.toUpperCase()}</h1>
            <div className="category-item-list">
                {renderItems()}
            </div>
        </div>
    ));
}

const mapStateToProps = (state) =>
{
    return {isLoading: state.shopData.isLoading, shopData: state.shopData.data};
}

export default withRouter(connect(mapStateToProps)(CategoryPageComponent));