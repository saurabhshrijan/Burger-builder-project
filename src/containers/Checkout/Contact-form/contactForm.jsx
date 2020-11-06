import React, { Component } from 'react'
import axios from "../../../axios-order";
import Button from "../../../components/UI/Button/Button";
import classes from "../Contact-form/contactForm.css";
import Input from "../../../components/UI/Forms/Input/input";
export default class ContactForm extends Component {
    state = {
        orderForm:null,
        formIsValid:false,
        ingredients :null,
        orderBookingId:null
    }
    createOrderForm = ()=>{
        let orderForm = {
            customerName:{
                eleName: 'input',
                eleConfig:{
                    type:'text',
                    placeholder: 'Your Name'
                },
                value:'',
                validation:{
                    required:true,
                    minLength:15
                },
                valid:true
            },
            country:{
                eleName: 'input',
                eleConfig:{
                    type:'text',
                    placeholder : 'Your country',
                },
                value:'',
                validation:{
                    required:true
                },
                valid:true
            },
            postalCode:{
                eleName:'input',
                eleConfig:{
                    type:'number',
                    placeholder:"Postal Code"
                },
                value:'',
                validation:{
                    required:true
                },
                valid:true
            },
            email:{
                eleName:'input',
                eleConfig:{
                    type:'email',
                    placeholder:'Enter your Email'
                },
                value:'',
                validation:{
                    required:true
                },
                valid:true
            },
            deliveryType:{
                eleName:'dropdown',
                eleConfig:{
                    options:['chepeast','fastest'],
                },
                value:'chepeast',
                validation:{},
                valid:true
            },
            extraMessege:{
                eleName:'textarea',
                eleConfig:{
                    placeholder:'any extra messege you want to provide for placing order',
                },
                value:'',
                validation:{
                    required:true
                },
                valid:true
            }
        }
    this.setState({orderForm:orderForm})
    }
    componentDidMount(){
        this.setState({ingredients:this.props.ingredients},()=>{
            this.createOrderForm();
        });

    }
    handleSubmit = (e)=>{
        e.preventDefault();
        let finalOrderSummary ={}
        for(let items in this.state.orderForm){
            finalOrderSummary[items] = this.state.orderForm[items].value
        }
        finalOrderSummary = {
            ...finalOrderSummary,
            ingredients:{...this.state.ingredients}
        }
        axios.post('/orders.json',finalOrderSummary).then(res=>{
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

    validateField = (value,field)=>{
        let isValid = true;
        for (let keys in field.validation){
            switch(keys){
                case 'required':
                    isValid = field.validation['required'] && value!==null ? true : false
                    break;
                case 'minLength':
                    isValid = field.validation['minLength'] <= value.trim().length ? true :false
                    break;
                default:
                    break; 
            }
        }
        return isValid;
    }

    handleChange = (event,inputIdentifier)=>{
        const value = event.target.value;
        const updatedOrderForm = {
            ...this.state.orderForm
        }
        const updatedOrderFormElement = {
            ...updatedOrderForm[inputIdentifier]
        }
        updatedOrderFormElement.value = value
        updatedOrderFormElement.valid = this.validateField(value,updatedOrderFormElement)

        updatedOrderForm[inputIdentifier] = updatedOrderFormElement;

        let formIsValid =true;
        for(let keys in updatedOrderForm ){
            formIsValid = updatedOrderForm[keys].valid && formIsValid;
        }
        this.setState({orderForm:updatedOrderForm,formIsValid:formIsValid});

    }

    render() {
        let labelsArray = []
        for (let keys in this.state.orderForm){
            labelsArray.push({
                name:keys,
                ...this.state.orderForm[keys]
            })
        }
        let myFormdata = labelsArray.map((label)=>{
            return (
            <Input 
                key={label.name} 
                eleName={label.eleName} 
                eleConfig={label.eleConfig}
                isValid ={label.valid}
                value ={label.value} 
                handleChange={(event)=>{this.handleChange(event,label.name)}}
            />
            )
        })
        return (
            <div>
                <div className={classes.wrapper}>
                    <h3 style={{textAlign:"center"}}>Enter Your details</h3>
                    <form onSubmit={this.handleSubmit}>
                        {myFormdata}
                        <Button  type = "submit" disabled={!this.state.formIsValid} btnType="Success">SUBMIT</Button>
                    </form>
                </div>
                {
            this.state.orderBookingId ? 
                <p>your order booked with booking id as {this.state.orderBookingId}  And 
                 will be redirected to homePage</p>
            : null    
        }
            </div>
        )
    }
}
