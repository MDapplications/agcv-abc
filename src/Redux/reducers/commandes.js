import {    GET_COMMANDES_LOADING,
            GET_COMMANDES_SUCCESS,
            GET_COMMANDES_ERROR,
            CREATE_COMMANDE_LOADING,
            CREATE_COMMANDE_ERROR,
            CREATE_COMMANDE_SUCCESS,
            UPDATE_COMMANDE_LOADING,
            UPDATE_COMMANDE_ERROR,
            UPDATE_COMMANDE_SUCCESS,
            DELETE_COMMANDE_LOADING,
            DELETE_COMMANDE_ERROR,
            DELETE_COMMANDE_SUCCESS,
            REMOVE_ALL_COMMANDES} from '../Constantes'


const initialState = {
    isLoading: false,
    isLoadingCreate: false,
    isLoadingDelete: false,
    isLoadingEdit: false,
    isGetSuccess: false,
    isCreateSuccess: false,
    isEditSuccess: false,
    isDeleteSuccess: false,
    commandes: [],
    error: '',
    errorCreate: '',
    errorDelete: '',
    errorEdit: ''
}


//reducer
const reducerCommandes = (state=initialState, action) => {

    switch (action.type) {

        //GET
        case GET_COMMANDES_LOADING:
            return {
                ...state,
                isLoading: true,
                isGetSuccess: false,
                commandes: [],
                error: ''
            }

        case GET_COMMANDES_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isGetSuccess: true,
                commandes: action.payload,
                error: ''
            }

        case GET_COMMANDES_ERROR:
            return {
                ...state,
                isLoading: false,
                isGetSuccess: false,
                commandes: [],
                error: action.payload
            }

        //CREATE
        case CREATE_COMMANDE_LOADING:
            return {
                ...state,
                isLoadingCreate: true,
                isCreateSuccess: false,
                errorCreate: ''
            }

        case CREATE_COMMANDE_ERROR:
            return {
                ...state,
                isLoadingCreate: false,
                errorCreate: action.payload
            }


        case CREATE_COMMANDE_SUCCESS:
            return {
                ...state,
                isLoadingCreate: false,
                isCreateSuccess: true
            }

        //DELETE
        case DELETE_COMMANDE_LOADING:
            return {
                ...state,
                isLoadingDelete: true,
                isDeleteSuccess: false,
                errorDelete: ''
            }

        case DELETE_COMMANDE_ERROR:
            return {
                ...state,
                isLoadingDelete: false,
                errorDelete: action.payload
            }

        case DELETE_COMMANDE_SUCCESS:
            return {
                ...state,
                isLoadingDelete: false,
                isDeleteSuccess: true
            }

        //UPDATE
        case UPDATE_COMMANDE_LOADING:
            return {
                ...state,
                isLoadingEdit: true,
                isEditSuccess: false,
                errorEdit: ''
            }

        case UPDATE_COMMANDE_ERROR:
            return {
                ...state,
                isLoadingEdit: false,
                errorEdit: action.payload
            }

        case UPDATE_COMMANDE_SUCCESS:
            return {
                ...state,
                isLoadingEdit: false,
                isEditSuccess: true
            }

        //REMOVE_ALL
        case REMOVE_ALL_COMMANDES:
            return initialState
            
        default: return state
    }
}

export default reducerCommandes