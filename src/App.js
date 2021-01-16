import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import HomePageComponent from './components/pages/home-page/HomePageComponent';
import CategorySelectionPageComponent from './components/pages/category-selection-page/CategorySelectionPageComponent';
import CategoryPageComponent from './components/pages/category-page/CategoryPageComponent';
import ItemPageComponent from './components/pages/item-page/ItemPageComponent';
import CheckoutPageCheckout from './components/pages/checkout-page/CheckoutPageComponent';
import HeaderComponent from './components/header/HeaderComponent';
import SignInPageComponent from './components/pages/sign-in-page/SignInPageComponent';

import { fetchShopData } from './redux/actions/shopDataActions';
import './App.css';

class App extends React.Component
{
    componentDidMount = async () =>
    {
        await this.props.fetchShopData();
    }
    
    render()
    {
        return(
            <div style={{height:'100%'}}>
                <HeaderComponent />
                <hr />
                <Switch>
                    <Route path="/checkout" component={CheckoutPageCheckout}/>
                    <Route path="/signIn" component={SignInPageComponent}/>
                    <Route path="/:category/:subcategory/:itemId" component={ItemPageComponent}/>
                    <Route path="/:category/:subcategory" component={CategoryPageComponent}/>
                    <Route path="/:category" component={CategorySelectionPageComponent}/>
                    <Route path="/" component={HomePageComponent}/>
                </Switch>
            </div>
        );
    }
}

export default connect(null, { fetchShopData })(App);