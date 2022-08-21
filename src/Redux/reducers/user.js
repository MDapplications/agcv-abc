import {    GET_USER_LOADING, GET_USER_SUCCESS, GET_USER_ERROR,
            INIT_USER } from '../Constantes'


//initial state
const initialState = {
    id: 0,
    username: '',
    role: '',
    token: '',
    isLoading: false,
    isGetSuccess: false,
    error: {}
}

//reducer
const reducerUser = (state=initialState, action) => {

    switch (action.type) {

        case GET_USER_LOADING:
            return {
                ...state,
                id: 0,
                username: '',
                role: '',
                token: '',
                isLoading: true,
                isGetSuccess: false,
                error: {}
            }

        case GET_USER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isGetSuccess: true,
                id: action.payload.id,
                username: action.payload.username,
                role: action.payload.role,
                token: action.payload.token,
                error: {}
            }

        case GET_USER_ERROR:
            return {
                ...state,
                id: 0,
                username: '',
                role: '',
                token: '',
                isLoading: false,
                isGetSuccess: false,
                error: action.payload
            }

        case INIT_USER:
            return initialState
            
        default: return state
    }
}

export default reducerUser