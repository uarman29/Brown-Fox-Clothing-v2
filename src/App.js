import React from 'react';
import { Route, Switch } from 'react-router-dom';

import HomePageComponent from './components/pages/home-page/HomePageComponent';
import CategorySelectionPageComponent from './components/pages/category-selection-page/CategorySelectionPageComponent';
import CategoryPageComponent from './components/pages/category-page/CategoryPageComponent';
import ItemPageComponent from './components/pages/item-page/ItemPageComponent';
import CheckoutPageCheckout from './components/pages/checkout-page/CheckoutPageComponent';

class App extends React.Component
{
    
    render()
    {
        return(
            <div>
                <Switch>
                    <Route path="/:category/:subcategory/:itemId" component={ItemPageComponent}/>
                    <Route path="/:category/:subcategory" component={CategoryPageComponent}/>
                    <Route path="/categories" component={CategorySelectionPageComponent}/>
                    <Route path="/checkout" component={CheckoutPageCheckout}/>
                    <Route path="/" component={HomePageComponent}/>
                </Switch>
            </div>
        );
    }
}

export default App;