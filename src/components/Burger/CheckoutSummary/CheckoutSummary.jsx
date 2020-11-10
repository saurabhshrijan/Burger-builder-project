import React, { Component } from 'react';
import  Burger  from "../Burger";
import Button from "../../UI/Button/Button";
import classes from "./CheckoutSummary.css";
import { Route } from "react-router-dom";
import ContactForm from "../../../containers/Checkout/Contact-form/contactForm";
export default class CheckoutSummary extends Component {

    state={
        loading:false,
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
        <div>
            <div className ={classes.CheckoutSummary}>
                <h1>we hope it taste well !</h1>
                <div className ={classes.burger}>
                    <Burger ingredients ={this.props.ingredients}/>
                    <Button btnType="Danger" clicked={this.handleCancle}>CANCLE</Button>
                    <Button btnType="Success" clicked={this.handleSuccess}>SUBMIT</Button>
                </div>
            </div>
                <div>
                    <Route path = "/checkout/Orderdetails" render ={()=>{
                        return (
                            <ContactForm {...this.props}/>
                        )
                    }}
                    />
                </div>
            
        </div>    
        )
    }
}
