import React from 'react';
import {connect} from 'react-redux';

import CategoryCardComponent from '../../category-card/CategoryCardComponent';
import SpinnerComponent from '../../spinner/SpinnerComponent';
import './HomePageComponent.css';

const HomePageComponent = (props) =>
{
    const renderCategories = () =>
    {
        return Object.keys(props.shopData).map(key =>{
            return <div key={key} className="card-container"><CategoryCardComponent item={props.shopData[key]}/> </div>;
        });
    }
    
    return(
        <div className="homepage">
            <div className="homepage-categories">
                {props.isLoading ? (<SpinnerComponent />) : renderCategories()}
            </div>
        </div>
    );
}

const mapStateToProps = (state) =>
{
    return {isLoading: state.shopData.isLoading, shopData: state.shopData.data};
}

export default connect(mapStateToProps)(HomePageComponent);