import axios from "axios";
import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk"
import logger from "redux-logger";

const initialState = {
    products: []
}

const CREATE_PRODUCT = "CREATE_PRODUCT"
const DELETE_PRODUCT = "DELETE_PRODUCT"

export const createProduct = () => {
    return async(dispatch) => {
        const product = await axios.post('/add')
        console.log("FROM THE FAKE PRODUCT", product)
        dispatch({
            type: CREATE_PRODUCT,
            product: product
        })
    }
}

export const deleteProduct = (id) => {
    return async(dispatch) => {
        const product = await axios.delete(`delete/${id}`).data
        dispatch({
            type: DELETE_PRODUCT,
            product: product,
            id: id
        })
    }
}

export const productStore = ((state = initialState, action) => {
    if (action.type === CREATE_PRODUCT) {
        return {...state, products: [...state.products, action.product]}
    }
    if (action.type === DELETE_PRODUCT) {
        
        return { ...state, products: [...state.products.filter(product => {
             return product.data.id !== action.id 
        })]}
    }
    return state
})

const reducer = combineReducers({
    productStore
})

const store = createStore(reducer, applyMiddleware(thunk, logger))

export default store