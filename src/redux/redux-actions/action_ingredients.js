import { burger_labels } from "../burger_constants";
export const addIngredients = (igName)=>{
    return {
        type:burger_labels.ADD_INGREDIENTS,
        ingredientName:igName,
    }
    
}
export const getIngredients = ()=>{
    return{
        type:burger_labels.GET_ALL_INGREDIENT_DETAILS,
    }
}
export const removeIngredients = (igName)=>{
    return {
        type:burger_labels.REMOVE_INGREDIENTS,
        ingredientName:igName,
    }
}