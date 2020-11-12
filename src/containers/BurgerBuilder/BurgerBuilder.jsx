import React, { Component } from 'react';

import Aux from '../../hoc/Auxilary/Auxilary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from "../../components/UI/Spinner/Spnner";

import {withErrorHandler} from '../../hoc/withErrorHandler/withErrorHandler';
import axios from "../../axios-order";
import { connect } from "react-redux";
import { burger_labels } from "../../redux/burger_constants";
import {
    addIngredients,
    getIngredients,
    removeIngredients
} from "../../redux/redux-actions/action_ingredients";


class BurgerBuilder extends Component {
    
    state = {
        purchasing: false,
        loading:false,
        ingredientLoadingError:false
    }

    componentDidMount(){
        // axios.get('/ingredients.json').then(res=>{
        //     if(res.data){
        //         this.setState({ingredients:res.data})
        //     }
        // })
        // .catch(err=>{
        //     if(err){
        //         this.setState({ingredientLoadingError:true});
        //     }
        // })
        // this.props.getAllIngredients();
    }

    updatePurchaseState (ingredients) {
        const sum = (Object.keys( ingredients ))
            .map( igKey => {
                return ingredients[igKey];
            } )
            .reduce( ( sum, el ) => {
                return sum + el;
            }, 0 );
        return sum > 0;
    }

    addIngredientHandler = ( name ) => {
        this.props.addIngredients(name);
        this.updatePurchaseState(this.props.ingredients);
        
    }

    removeIngredientHandler = ( name ) => {
        this.props.removeIngredients(name);
        this.updatePurchaseState(this.props.ingredients);
    }

    purchaseHandler = () => {
        this.setState({purchasing: true});
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    }

    purchaseContinueHandler = () => {
        // alert('You continue!');
        this.setState({loading:true})
        const BurgerDetails = {
            ingredientAdded:this.props.ingredients,
            totalPrice:parseFloat((this.props.totalPrice).toFixed(2)),
        }
       setTimeout(()=>{
        this.setState({purchasing:false,loading:false},()=>{
            this.props.history.push({
                pathname:'/checkout',
                state:{
                    BurgerDetails: BurgerDetails
                }
            })
        })
       },2000)
        
    }

    render () {
        const disabledInfo = {
            ...this.props.ingredients
        };
        for ( let key in disabledInfo ) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        let burger = this.props.ingredients ? (
            <Aux>
            <Burger ingredients={this.props.ingredients} />
                <BuildControls
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler}
                    disabled={disabledInfo}
                    purchasable={this.updatePurchaseState(this.props.ingredients)}
                    ordered={this.purchaseHandler}
                    price={this.props.totalPrice} />
            </Aux>
        ) : this.state.ingredientLoadingError ? 'cannot get burger details from server' :<Spinner/>

        let orderSummary = this.state.loading ? <Spinner/> : (
            <OrderSummary 
            ingredients={this.props.ingredients}
            price={this.props.totalPrice}
            purchaseCancelled={this.purchaseCancelHandler}
            purchaseContinued={this.purchaseContinueHandler} />
        )
        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                  {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}
const mapStateToProps = (state)=>{
    return{
        ingredients:state.ingredients,
        totalPrice:state.totalPrice,
        ingredientsPrice:state.ingredientsPrice
    }
}
const mapDispatchToProps = (dispatch)=>{
    return {
        addIngredients:(name)=>dispatch(addIngredients(name)),
        removeIngredients:(name)=>dispatch(removeIngredients(name)),
        getIngredients : ()=>dispatch(getIngredients())
    }
}
export default connect(mapStateToProps,mapDispatchToProps)
(withErrorHandler(BurgerBuilder,axios));