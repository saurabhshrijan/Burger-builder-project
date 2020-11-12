import { burger_labels } from "../burger_constants";
let  initialState={
    ingredients:{
        meat:0,
        salad:0,
        cheese:0,
        bacon:0
    },
    totalPrice:4,
    ingredientsPrice : {
        salad: 0.5,
        cheese: 0.4,
        meat: 1.3,
        bacon: 0.7
    }
}


const ingredientReducer = (state = initialState , action)=>{
        switch (action.type) {
            case burger_labels.GET_ALL_INGREDIENT_DETAILS:
                return {
                    ...state,
                    ingredients:action.ingredients
                }
            
            case burger_labels.ADD_INGREDIENTS:
                return {
                    ...state,
                    totalPrice:state.totalPrice + state.ingredientsPrice[action.ingredientName],
                    ingredients:{
                        ...state.ingredients,
                        [action.ingredientName]:state.ingredients[action.ingredientName] + 1
                    }
                }
            
            case burger_labels.REMOVE_INGREDIENTS:
                return {
                    ...state,
                    totalPrice:state.totalPrice - state.ingredientsPrice[action.ingredientName],
                    ingredients:{
                        ...state.ingredients,
                        [action.ingredientName]:state.ingredients[action.ingredientName] - 1
                    }
                }
            
            case burger_labels.GET_ALL_INGREDIENT_DETAILS:
                return{
                    ...state
                }
    
            default:
                return state;
        }
    
}
export default ingredientReducer;