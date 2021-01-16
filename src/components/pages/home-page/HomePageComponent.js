import React from 'react';
import {connect} from 'react-redux';
import CategoryCardComponent from '../../category-card/CategoryCardComponent';

const HomePageComponent = (props) =>
{
    return(
        <div>
            {props.isLoading ? null :
            (<div>
                <CategoryCardComponent item={props.shopData["mens"]}/>
                <CategoryCardComponent item={props.shopData["womens"]}/>)
            </div>
            )
            }
        </div>
    );
}

const mapStateToProps = (state) =>
{
    return {isLoading: state.shopData.isLoading, shopData: state.shopData.data};
}

export default connect(mapStateToProps)(HomePageComponent);