import {    GET_CONSOMOIS_LOADING,
            GET_CONSOMOIS_SUCCESS,
            GET_CONSOMOIS_ERROR,
            CREATE_CONSOMOIS_LOADING,
            CREATE_CONSOMOIS_ERROR,
            CREATE_CONSOMOIS_SUCCESS,
            UPDATE_CONSOMOIS_LOADING,
            UPDATE_CONSOMOIS_ERROR,
            UPDATE_CONSOMOIS_SUCCESS,
            DELETE_CONSOMOIS_LOADING,
            DELETE_CONSOMOIS_ERROR,
            DELETE_CONSOMOIS_SUCCESS,
            REMOVE_ALL_CONSOMOIS} from '../Constantes'

            
const initialState = {
    isLoading: false,
    isLoadingCreate: false,
    isLoadingDelete: false,
    isLoadingEdit: false,
    isCreateSuccess: false,
    isEditSuccess: false,
    isDeleteSuccess: false,
    consomois: [],
    error: '',
    errorCreate: '',
    errorDelete: '',
    errorEdit: ''
}


//reducer
const reducerConsoMois = (state=initialState, action) => {

    switch (action.type) {

        //GET
        case GET_CONSOMOIS_LOADING:
            return {
                ...state,
                isLoading: true,
                consomois: [],
                error: ''
            }

        case GET_CONSOMOIS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                consomois: action.payload,
                error: ''
            }

        case GET_CONSOMOIS_ERROR:
            return {
                ...state,
                isLoading: false,
                consomois: [],
                error: action.payload
            }

        //CREATE
        case CREATE_CONSOMOIS_LOADING:
            return {
                ...state,
                isLoadingCreate: true,
                isCreateSuccess: false,
                errorCreate: ''
            }

        case CREATE_CONSOMOIS_ERROR:
            return {
                ...state,
                isLoadingCreate: false,
                errorCreate: action.payload
            }


        case CREATE_CONSOMOIS_SUCCESS:
            return {
                ...state,
                isLoadingCreate: false,
                isCreateSuccess: true
            }

        //DELETE
        case DELETE_CONSOMOIS_LOADING:
            return {
                ...state,
                isLoadingDelete: true,
                isDeleteSuccess: false,
                errorDelete: ''
            }

        case DELETE_CONSOMOIS_ERROR:
            return {
                ...state,
                isLoadingDelete: false,
                errorDelete: action.payload
            }

        case DELETE_CONSOMOIS_SUCCESS:
            return {
                ...state,
                isLoadingDelete: false,
                isDeleteSuccess: true
            }

        //UPDATE
        case UPDATE_CONSOMOIS_LOADING:
            return {
                ...state,
                isLoadingEdit: true,
                isEditSuccess: false,
                errorEdit: ''
            }

        case UPDATE_CONSOMOIS_ERROR:
            return {
                ...state,
                isLoadingEdit: false,
                errorEdit: action.payload
            }

        case UPDATE_CONSOMOIS_SUCCESS:
            return {
                ...state,
                isLoadingEdit: false,
                isEditSuccess: true
            }

        //REMOVE_ALL
        case REMOVE_ALL_CONSOMOIS:
            return initialState
            
        default: return state
    }
}

export default reducerConsoMois