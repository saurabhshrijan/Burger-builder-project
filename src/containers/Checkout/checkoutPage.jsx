import React, { Component } from 'react'
import CheckoutSummary  from "../../components/Burger/CheckoutSummary/CheckoutSummary"
export class CheckoutPage extends Component {
    constructor(props){
        super(props);
        
        this.state={
            orderDetails:null
        }
    }
    
    componentDidMount(){
        if(this.props.history.location && this.props.history.location.state){
            this.setState((state)=>{
                return {
                    ...state,
                    ...this.props.history.location.state
                }
            })
        }
    }
    render() {
        console.log(this.state);
        return (
            <div>
                {
                this.state.orderDetails && this.state.orderDetails.ingredientAdded ?
                <CheckoutSummary 
                ingredients={this.state.orderDetails.ingredientAdded} 
                orderDetails={this.state.orderDetails} {...this.props}/> : null
                }
                   
            </div>
        )
    }
}

export default CheckoutPage
