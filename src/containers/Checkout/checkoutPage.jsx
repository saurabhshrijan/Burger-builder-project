import React, { Component } from 'react'
import CheckoutSummary  from "../../components/Burger/CheckoutSummary/CheckoutSummary"
export class CheckoutPage extends Component {
    constructor(props){
        super(props);
        
        this.state={
            BurgerDetails:null
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
        return (
            <div>
                {
                this.state.BurgerDetails ?
                <CheckoutSummary 
                ingredients={this.state.BurgerDetails.ingredientAdded} 
                {...this.props}/> : null
                }
               
            </div>
        )
    }
}

export default CheckoutPage
