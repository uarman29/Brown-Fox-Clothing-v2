import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import CategoryCardComponent from '../../category-card/CategoryCardComponent';

const CategorySelectionPageComponent = (props) =>
{
    const renderCategories = () =>
    {
        return Object.keys(props.shopData[props.match.params.category]["categories"]).map(key =>{
            return <CategoryCardComponent key={key} item={props.shopData[props.match.params.category]["categories"][key]}/>;
        });
    }
    
    return(
        <div className="category-selection-page">
            <div className="categories-container">
                {props.isLoading ? null : renderCategories()}
            </div>
        </div>
    );
}

const mapStateToProps = (state) =>
{
    return {isLoading: state.shopData.isLoading, shopData: state.shopData.data};
}

export default withRouter(connect(mapStateToProps)(CategorySelectionPageComponent));