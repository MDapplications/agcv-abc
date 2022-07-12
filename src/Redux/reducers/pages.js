import {    
    GET_PAGE,
    INIT_PAGE } from '../Constantes'



const initialState = ''


//reducer
const reducerPage = (state=initialState, action) => {

    switch (action.type) {

        case GET_PAGE:
            state = action.payload
            return state

        case INIT_PAGE:
            return initialState
            
        default: return state
    }
}

export default reducerPage