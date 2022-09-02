import {    GET_USER_LOADING, 
            GET_USER_SUCCESS, 
            GET_USER_ERROR,
            CHANGE_PASSWORD_USER_LOADING,
            CHANGE_PASSWORD_USER_SUCCESS,
            CHANGE_PASSWORD_USER_ERROR,
            INIT_USER } from '../Constantes'


//initial state
const initialState = {
    id: 0,
    username: '',
    role: '',
    token: '',
    isLoading: false,
    isLoadingPassword: false,
    isGetSuccess: false,
    isPasswordSuccess: false,
    error: {},
    errorPassword: ''
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

        case CHANGE_PASSWORD_USER_LOADING:
            return {
                ...state,
                isLoadingPassword: true,
                isPasswordSuccess: false,
                errorPassword: ''
            }

        case CHANGE_PASSWORD_USER_SUCCESS:
            return {
                ...state,
                isLoadingPassword: false,
                isPasswordSuccess: true,
                errorPassword: ''
            }

        case CHANGE_PASSWORD_USER_ERROR:
            return {
                ...state,
                isLoadingPassword: false,
                isPasswordSuccess: false,
                errorPassword: action.payload
            }

        case INIT_USER:
            return initialState
            
        default: return state
    }
}

export default reducerUser