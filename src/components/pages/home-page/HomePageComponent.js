import React from 'react';
import {connect} from 'react-redux';

import CategoryCardComponent from '../../category-card/CategoryCardComponent';
import './HomePageComponent.css';

const HomePageComponent = (props) =>
{
    const renderCategories = () =>
    {
        return Object.keys(props.shopData).map(key =>{
            return <CategoryCardComponent key={key} item={props.shopData[key]}/>;
        });
    }
    
    return(
        <div className="homepage">
            <div className="homepage-categories">
                {props.isLoading ? null : renderCategories()}
            </div>
        </div>
    );
}

const mapStateToProps = (state) =>
{
    return {isLoading: state.shopData.isLoading, shopData: state.shopData.data};
}

export default connect(mapStateToProps)(HomePageComponent);