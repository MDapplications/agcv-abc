import {    INIT_STOCKS,
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