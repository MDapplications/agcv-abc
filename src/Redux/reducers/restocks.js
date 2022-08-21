import {    GET_RESTOCKS_LOADING,
            GET_RESTOCKS_SUCCESS,
            GET_RESTOCKS_ERROR,
            CREATE_RESTOCK_LOADING,
            CREATE_RESTOCK_SUCCESS,
            CREATE_RESTOCK_ERROR,
            REMOVE_ALL_RESTOCKS} from '../Constantes'


const initialState = {
    isLoading: false,
    isLoadingCreate: false,
    isGetSuccess: false,
    isCreateSuccess: false,
    restocks: [],
    error: '',
    errorCreate: ''
}


//reducer
const reducerRestocks = (state=initialState, action) => {

    switch (action.type) {

        //GET
        case GET_RESTOCKS_LOADING:
            return {
                ...state,
                isLoading: true,
                isGetSuccess: false,
                restocks: [],
                error: ''
            }

        case GET_RESTOCKS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isGetSuccess: true,
                restocks: action.payload,
                error: ''
            }

        case GET_RESTOCKS_ERROR:
            return {
                ...state,
                isLoading: false,
                isGetSuccess: false,
                restocks: [],
                error: action.payload
            }

        //CREATE
        case CREATE_RESTOCK_LOADING:
            return {
                ...state,
                isLoadingCreate: true,
                isCreateSuccess: false,
                errorCreate: ''
            }

        case CREATE_RESTOCK_ERROR:
            return {
                ...state,
                isLoadingCreate: false,
                errorCreate: action.payload
            }


        case CREATE_RESTOCK_SUCCESS:
            return {
                ...state,
                isLoadingCreate: false,
                isCreateSuccess: true
            }

        //REMOVE_ALL
        case REMOVE_ALL_RESTOCKS:
            return initialState
            
        default: return state
    }
}

export default reducerRestocks