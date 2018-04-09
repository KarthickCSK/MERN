import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, hashHistory, IndexRoute} from 'react-router';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();
import LoginView from './views/login';
import Home from './views/home';
import VendorDetail from './views/vendordetail';
import Finalfilter from './components/finalfilter';
import ForgotPasswordView from './views/forgotpassword';
import ConfirmPassword from './views/confirmPassword';
import RegisterView from './views/signup';
import StartView from './views/start';
import AboutUsView from './views/aboutUs';
import Vendorregform from './views/VendorRegForm';
import VendorAction from './views/VendorActions'
import NavBar from './components/locationmap/menubar.jsx';
import ViewShops from './components/ViewShops/viewshops.jsx'
import ProductList from './components/productlist';
import WishlistComponent from './components/wishlist';
import ProductDetailsView from './views/productDetails';
import UpdateShop from './components/ViewShops/updateshopdetails.jsx'
import Cookie from 'react-cookie';
import UserProfile from './components/userProfile/userProfile.jsx';
import Category from './components/Category';
import SubCategory from './components/SubCategory';
import UpdateUserProfile from './components/userProfile/updateUserProfile.jsx';
import VendorHome from './components/locationMapVendor/locationmap';
import VendorFinalFilter from './components/UpdateCatalogue/VendorFinalFilter.jsx';
import VendorProductList from './components/UpdateCatalogue/VendorProductList.jsx';
var requireAuth = (nextState, replace) => {
    var token = Cookie.load('token');
    if (!token) {
        replace({
            pathname: '/',
            state: {
                nextPathname: nextState.location.pathname
            }
        })
    }
}

export default class MainComponent extends React.Component
{
    constructor(props)
    {
        super(props);
    }
    render() {
        const msg = this.props.msg;
        return (
            <div>
                <StartView msg={msg}/>
                {this.props.children}
            </div>
        )
    }
}
ReactDOM.render(
    <MuiThemeProvider>
    <Router history={hashHistory}>
        {/* <Route path='/' component={LocationMap} /> */}
        <Route path='/' component={MainComponent}>
            <IndexRoute component={AboutUsView}/>
            <Route path='/a' component={AboutUsView}/>
            <Route path='/login' component={LoginView}/>
            <Route path='/signup' component={RegisterView}/>
            <Route path='/forgotpassword' component={ForgotPasswordView}/>
            <Route path='/changepassword' component={ConfirmPassword}/>
        </Route>
        <Router path='/home' component={NavBar}>
            <IndexRoute component={Home} onEnter={requireAuth.bind(this)}/> {/*Customer routes starts*/}

            {/*Customer routes starts*/}
            <Router path='/filter' component={Finalfilter} onEnter={requireAuth.bind(this)}>
                <Route path='/category' component={Category} onEnter={requireAuth.bind(this)}/>
                <Route path='/subCategory' component={SubCategory} onEnter={requireAuth.bind(this)}/>
                <Route path='/ProductList' component={ProductList} onEnter={requireAuth.bind(this)}/>
            </Router>
            <Route path='/productDetails' component={ProductDetailsView} onEnter={requireAuth.bind(this)}/>
            <Route path='/user' component={UserProfile} onEnter={requireAuth.bind(this)}/>
            <Route path='/updateUser' component={UpdateUserProfile} onEnter={requireAuth.bind(this)}/>
            <Route path='/wishlist' component={WishlistComponent} onEnter={requireAuth.bind(this)}/> {/*Customer routes endss*/}

            {/*Vendor routes starts*/}
            <Router path='/vendorhome' component={VendorHome} onEnter={requireAuth.bind(this)}/>
            <Route path='/vendor' component={VendorAction} onEnter={requireAuth.bind(this)}/>
            <Route path='/addshop' component={Vendorregform} onEnter={requireAuth.bind(this)}/>
            <Router path='/vendorfilter' component={VendorFinalFilter} onEnter={requireAuth.bind(this)}>
                <Route path='/vendorProductList' component={VendorProductList} onEnter={requireAuth.bind(this)}/>
            </Router>
            {/*<Route path='/ProductHome' component={ProductHome}*/}
            <Route path='/viewshop' component={ViewShops} onEnter={requireAuth.bind(this)}/>
            <Route path='/updateshop' component={UpdateShop} onEnter={requireAuth.bind(this)}/>
          </Router>
    </Router>
</MuiThemeProvider>, document.getElementById('discountapp'));
