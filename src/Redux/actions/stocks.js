import {    INIT_STOCKS,
            ADD_STOCK,
            SET_STOCK} from '../Constantes'


//Init des stocks
export const initStocks = () => {
    return {
        type: INIT_STOCKS
    }
}

//setter d'un stock
export const setStock = data => {
    return {
        type: SET_STOCK,
        payload: data
    }
}

//setter d'un stock
export const addStock = data => {
    return {
        type: ADD_STOCK,
        payload: data
    }
}