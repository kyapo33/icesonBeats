import React from 'react'
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import Signup from './user/Signup'
import Signin from './user/Signin'
import PrivateRoute from './auth/PrivateRoute'
import Dashboard from './user/UserDashboard'
import AdminRoute from './auth/AdminRoute'
import AdminDashboard from './user/AdminDashboard'
import AddCategory from './admin/AddCategory'
import AddProduct from './admin/AddProduct'
import UpdateProduct from './admin/UpdateProduct'
import ManageProducts from './admin/ManageProducts'
import Home from './core/Home'
import Category from './core/Category'
import Cart from './core/Cart'
import Orders from './admin/Order'
import Profile from './user/Profile'
import Contact from './core/Contact'
import ChangePassword from './user/ChangePassword'
import ForgotPassword from './user/ForgotPassword'
import ResetPassword from './user/ResetPassword'
import Bill from './user/Bill'

const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path = "/" exact component= {Home}/>
                <Route path = "/category/:categoryId" exact component= {Category}/>
                <Route path = "/signin" exact component= {Signin}/>
                <Route path = "/signup" exact component= {Signup}/>
                <PrivateRoute path = "/user/dashboard" exact component= {Dashboard}/>
                <AdminRoute path = "/admin/dashboard" exact component= {AdminDashboard}/>
                <AdminRoute path = "/create/category" exact component= {AddCategory}/>
                <AdminRoute path = "/create/product" exact component= {AddProduct}/>
                <AdminRoute path = "/manage/product" exact component= {ManageProducts}/>
                <AdminRoute path = "/update/product/:productId" exact component= {UpdateProduct}/>
                <Route path = "/cart" exact component= {Cart}/>
                <AdminRoute path = "/admin/orders" exact component= {Orders}/>
                <PrivateRoute path = "/profile/update/:userId" exact component= {Profile}/>
                <PrivateRoute path = "/user/change-password/:userId" exact component= {ChangePassword}/>
                <PrivateRoute path = "/facture/:orderId" exact component= {Bill}/>
                <Route path = "/contact" exact component= {Contact}/>
                <Route path = "/forgotpassword" exact component= {ForgotPassword}/>
                <Route path = "/reset-password/:resetPasswordToken" exact component= {ResetPassword}/>
            </Switch>
        </BrowserRouter>
    );
};

export default Routes;