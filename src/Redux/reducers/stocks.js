import {    INIT_STOCKS,
            SET_STOCK} from '../Constantes'


const initialState = []


const helperSetStock = (state, data) => {
    const value = state.filter(stock => stock.id === data.id)
    if (value.length === 0) {
        return [...state, data]
    } else {
        const newState = state.filter(stock => stock.id !== data.id)
        return [...newState, data]
    }
}


//reducer
const reducerStock = (state=initialState, action) => {

    switch (action.type) {

        //GET
        case INIT_STOCKS: return state

        case SET_STOCK:
            state = helperSetStock(state, action.payload)
            return state

        default: return state
    }
}

export default reducerStock