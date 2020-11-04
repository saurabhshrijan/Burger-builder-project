import React, { Component } from 'react';
import { Route } from "react-router-dom";
import  Burger  from "../Burger";
import Button from "../../UI/Button/Button";
import classes from "./CheckoutSummary.css";
import OrderDetail from "../../../containers/Orders/OrderDetail";
export default class CheckoutSummary extends Component {

    state={
        loading:false
    }

    handleCancle = ()=>{
        console.log(this.props);
        this.props.history.goBack();
    }
    handleSuccess = ()=>{
        this.props.history.push(this.props.location.pathname + '/Orderdetails');
    }
    render() {
        return (
            <div className ={classes.CheckoutSummary}>
                <h1>we hope it taste well !</h1>
            <div style={{width:'100%',margin:'auto'}}>
                <Burger ingredients ={this.props.ingredients}/>
            </div>
                <Button btnType="Danger" clicked={this.handleCancle}>CANCLE</Button>
                <Button btnType="Success" clicked={this.handleSuccess}>SUBMIT</Button>
            <div>
                
            <Route path = "/checkout/Orderdetails" render ={()=>{
                    return (
                        <OrderDetail {...this.props}/>
                    )
                }}/>     
                
            </div>
            </div>
            
        )
    }
}
