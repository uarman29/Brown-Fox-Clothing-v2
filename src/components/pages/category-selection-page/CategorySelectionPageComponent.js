import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import CategoryCardComponent from '../../category-card/CategoryCardComponent';
import SpinnerComponent from '../../spinner/SpinnerComponent';
import './CategorySelectionPageComponent.css';

const CategorySelectionPageComponent = (props) =>
{
    const renderCategories = () =>
    {
        return Object.keys(props.shopData[props.match.params.category]["categories"]).map(key =>{
            return( 
                <div key={key} className="card-container">
                    <CategoryCardComponent item={props.shopData[props.match.params.category]["categories"][key]}/>
                </div>
            );
        });
    }
    
    return(
        <div className="category-selection-page">
            <div className="categories-container">
                {props.isLoading ? (<SpinnerComponent />) : renderCategories()}
            </div>
        </div>
    );
}

const mapStateToProps = (state) =>
{
    return {isLoading: state.shopData.isLoading, shopData: state.shopData.data};
}

export default withRouter(connect(mapStateToProps)(CategorySelectionPageComponent));