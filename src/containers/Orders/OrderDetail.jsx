import React, { Component } from 'react'
import Button from "../../components/UI/Button/Button";
import axios from "../../axios-order";
export default class OrderDetail extends Component {

    state = {
        orderDetails:null,
        orderBookingId:null
    }

    componentDidMount(){
        this.setState({orderDetails:this.props.orderDetails});
    }

    handleSubmit = (e)=>{
        e.preventDefault();
        axios.post('/orders.json',this.props.orderDetails).then(res=>{
            if((res.status ===204 || res.status === 200)){
                 this.setState({orderBookingId:res.data.name},()=>{
                     setTimeout(()=>{
                         this.props.history.replace('/')
                     },5000)
                 })
            }
        }).catch(err=>{
            this.setState({purchasing:false,loading:false})
        })
    }
    
    render() {
        return (
            <div>
                <h3>order Details Page</h3>
                <div>
                    <form>
                        <input type = "text" placeholder = 'name' 
                        value={this.state.orderDetails ? this.state.orderDetails.customerDetail.CustomerName : null}/>
                        <input type = "text" placeholder = 'country'
                        value ={this.state.orderDetails ? this.state.orderDetails.customerDetail.country : null}/>
                        <input type = "number" placeholder = 'postalCode' 
                        value ={this.state.orderDetails ? this.state.orderDetails.customerDetail.PostalCode : null}/>
                        <input type = "email" placeholder = "your email" required/>
                        <Button  type = "submit" btnType="Success" clicked={this.handleSubmit}>SUBMIT</Button>
                    </form>
                </div>
                <div>
        {
            this.state.orderBookingId ? 
                <p>your order booked with booking id as {this.state.orderBookingId}  And 
                 will be redirected to homePage</p>
            : null    
        }
                </div>
            </div>
        )
    }
}
