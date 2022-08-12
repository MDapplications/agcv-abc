import {    INIT_STOCKS,
            ADD_STOCK,
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

const helperAddStock = (state, data) => {
    const value = state.filter(stock => stock.id === data.id)[0]
    const newState = state.filter(stock => stock.id !== data.id)
    newState.push({
        id: value.id,
        nbUsed: value.nbUsed + data.nbUsed,
        priceUsed: value.priceUsed + data.priceUsed,
        nbOrdered: value.nbOrdered + data.nbOrdered,
        priceOrdered: value.priceOrdered + data.priceOrdered,
        TypeTube: value.TypeTube,
        stock: value.stock + data.stock
    })
    return newState
}


//reducer
const reducerStock = (state=initialState, action) => {

    switch (action.type) {

        //GET
        case INIT_STOCKS: return initialState

        case SET_STOCK:
            state = helperSetStock(state, action.payload)
            return state

        case ADD_STOCK:
            state = helperAddStock(state, action.payload)
            return state

        default: return state
    }
}

export default reducerStock