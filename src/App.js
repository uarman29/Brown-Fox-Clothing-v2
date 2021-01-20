import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import HomePageComponent from './components/pages/home-page/HomePageComponent';
import CategorySelectionPageComponent from './components/pages/category-selection-page/CategorySelectionPageComponent';
import CategoryPageComponent from './components/pages/category-page/CategoryPageComponent';
import ItemPageComponent from './components/pages/item-page/ItemPageComponent';
import CheckoutPageCheckout from './components/pages/checkout-page/CheckoutPageComponent';
import HeaderComponent from './components/header/HeaderComponent';
import SignInPageComponent from './components/pages/sign-in-page/SignInPageComponent';
import SignUpPageComponent from './components/pages/sign-up-page/SignUpPageComponent';

import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import { fetchShopData } from './redux/actions/shopDataActions';
import { setCurrentUser } from './redux/actions/userActions';
import { fetchCart, clearCart, combineLocalAndUserCarts } from './redux/actions/cartActions';
import './App.css';

class App extends React.Component
{
    unsubscribeFromAuth = null;
    unsubscribeFromUser = null;
    componentDidMount = async () =>
    {
        this.props.clearCart(false);
        await this.props.fetchShopData();
        this.unsubscribeFromAuth = auth.onAuthStateChanged( async userAuth => {
            if(this.unsubscribeFromUser !== null)
                this.unsubscribeFromUser();
            
            if(userAuth)
            {
                const userRef = await createUserProfileDocument(userAuth);
                const snapShot = await userRef.get();
                this.props.setCurrentUser(snapShot.data());
                await this.props.combineLocalAndUserCarts();
                this.props.fetchCart();

                this.unsubscribeFromUser = userRef.onSnapshot(snapShot =>{
                    this.props.setCurrentUser(snapShot.data());
                    this.props.fetchCart();
                });
            }
            else
            {
                this.props.setCurrentUser(null);
                this.props.clearCart(false);
            }
        });
    }
    
    componentWillUnmount()
    {
        this.unsubscribeFromAuth();
        if(this.unsubscribeFromUser !== null)
            this.unsubscribeFromUser();
    }

    render()
    {
        return(
            <div style={{height:'100%'}}>
                <HeaderComponent />
                <hr />
                <Switch>
                    <Route path="/checkout" component={CheckoutPageCheckout}/>
                    <Route path="/signIn" render={() => this.props.currentUser ? (<Redirect to='/' />) : (<SignInPageComponent />)}/>
                    <Route path="/signUp" render={() => this.props.currentUser ? (<Redirect to='/' />) : (<SignUpPageComponent />)}/>
                    <Route path="/:category/:subcategory/:itemId" component={ItemPageComponent}/>
                    <Route path="/:category/:subcategory" component={CategoryPageComponent}/>
                    <Route path="/:category" component={CategorySelectionPageComponent}/>
                    <Route path="/" component={HomePageComponent}/>
                </Switch>
            </div>
        );
    }
}

const mapStateToProps = (state) =>{
    return {currentUser: state.user.currentUser, shopData: state.shopData.data};
}

export default connect(mapStateToProps, { fetchShopData, setCurrentUser, fetchCart, clearCart, combineLocalAndUserCarts })(App);