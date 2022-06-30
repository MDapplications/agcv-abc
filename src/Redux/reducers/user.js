import {    GET_USER,
            INIT_USER } from '../Constantes'


//initial state
const initialState = {
    username: '',
    token: ''
}

//reducer
const reducerUser = (state=initialState, action) => {

    switch (action.type) {

        case GET_USER:
            state = action.payload
            return state

        case INIT_USER:
            return initialState
            
        default: return state
    }
}

export default reducerUser