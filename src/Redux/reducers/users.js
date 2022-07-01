import {    GET_USERS_LOADING,
            GET_USERS_SUCCESS,
            GET_USERS_ERROR,
            EDIT_USER_LOADING,
            EDIT_USER_ERROR,
            DELETE_USER_LOADING,
            DELETE_USER_ERROR,
            REMOVE_ALL_USERS } from '../Constantes'


const initialState = {
    isLoading: false,
    isLoadingDelete: false,
    isLoadingEdit: false,
    Users: [],
    error: '',
    errorDelete: '',
    errorEdit: ''
}


//reducer
const reducerUsers = (state=initialState, action) => {

    switch (action.type) {

        case GET_USERS_LOADING:
            return {
                ...state,
                isLoading: true
            }

        case DELETE_USER_LOADING:
            return {
                ...state,
                isLoadingDelete: true
            }

        case DELETE_USER_ERROR:
            return {
                ...state,
                isLoadingDelete: false,
                error: action.payload
            }

        case EDIT_USER_LOADING:
            return {
                ...state,
                isLoadingEdit: true
            }

        case EDIT_USER_ERROR:
            return {
                ...state,
                isLoadingEdit: false,
                error: action.payload
            }

        case GET_USERS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                Users: action.payload,
                error: ''
            }
        case GET_USERS_ERROR:
            return {
                ...state,
                isLoading: false,
                Users: [],
                error: action.payload
            }

        case REMOVE_ALL_USERS:
            return initialState
            
        default: return state
    }
}

export default reducerUsers