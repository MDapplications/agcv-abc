import {    GET_SAISONS_LOADING,
            GET_SAISONS_SUCCESS,
            GET_SAISONS_ERROR,
            GET_SAISON_ACTIVE_LOADING,
            GET_SAISON_ACTIVE_SUCCESS,
            GET_SAISON_ACTIVE_ERROR,
            CREATE_SAISON_LOADING,
            CREATE_SAISON_ERROR,
            CREATE_SAISON_SUCCESS,
            CREATE_SAISON_CONSOVOLANT_ERROR,
            CREATE_SAISON_CONSOMOIS_ERROR,
            UPDATE_SAISON_LOADING,
            UPDATE_SAISON_ERROR,
            UPDATE_SAISON_SUCCESS,
            DELETE_SAISON_LOADING,
            DELETE_SAISON_ERROR,
            DELETE_SAISON_SUCCESS,
            TRANSFER_SAISON_LOADING,
            TRANSFER_SAISON_SUCCESS,
            TRANSFER_SAISON_ERROR,
            REMOVE_SAISON_ACTIVE,
            REMOVE_ALL_SAISONS} from '../Constantes'

            
const initialState = {
    isLoading: false,
    isLoadingGetActive: false,
    isLoadingCreate: false,
    isLoadingDelete: false,
    isLoadingEdit: false,
    isLoadingTransfer: false,
    isTransferSuccess: false,
    isGetSuccess: false,
    isGetSaisonActiveSuccess: false,
    isCreateSuccess: false,
    isEditSuccess: false,
    isDeleteSuccess: false,
    saisonActive: {},
    saisons: [],
    error: '',
    errorGetActive: '',
    errorCreate: '',
    errorDelete: '',
    errorEdit: '',
    errorTransfer: '',
}


//reducer
const reducerSaisons = (state=initialState, action) => {

    switch (action.type) {

        //GET
        case GET_SAISONS_LOADING:
            return {
                ...state,
                isLoading: true,
                isGetSuccess: false,
                saisons: [],
                error: ''
            }

        case GET_SAISONS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isGetSuccess: true,
                saisons: action.payload,
                error: ''
            }

        case GET_SAISONS_ERROR:
            return {
                ...state,
                isLoading: false,
                isGetSuccess: false,
                saisons: [],
                error: action.payload
            }

        //GET ACTIVE
        case GET_SAISON_ACTIVE_LOADING:
            return {
                ...state,
                isLoadingGetActive: true,
                isGetSaisonActiveSuccess: false,
                saisonActive: {},
                errorGetActive: ''
            }

        case GET_SAISON_ACTIVE_SUCCESS:
            return {
                ...state,
                isLoadingGetActive: false,
                isGetSaisonActiveSuccess: true,
                saisonActive: action.payload,
                errorGetActive: ''
            }

        case GET_SAISON_ACTIVE_ERROR:
            return {
                ...state,
                isLoadingGetActive: false,
                isGetSaisonActiveSuccess: false,
                saisonActive: {},
                errorGetActive: action.payload
            }


        //CREATE
        case CREATE_SAISON_LOADING:
            return {
                ...state,
                isLoadingCreate: true,
                isCreateSuccess: false,
                isGetSuccess: false,
                errorCreate: ''
            }

        case CREATE_SAISON_ERROR:
            return {
                ...state,
                isLoadingCreate: false,
                isCreateSuccess: false,
                errorCreate: action.payload
            }


        case CREATE_SAISON_SUCCESS:
            return {
                ...state,
                isLoadingCreate: false,
                isCreateSuccess: true,
                errorCreate: ''
            }

        case CREATE_SAISON_CONSOVOLANT_ERROR:
            return {
                ...state,
                isLoadingCreate: false,
                isCreateSuccess: false,
                errorCreate: action.payload
            }

        case CREATE_SAISON_CONSOMOIS_ERROR:
            return {
                ...state,
                isLoadingCreate: false,
                isCreateSuccess: false,
                errorCreate: action.payload
            }

        //DELETE
        case DELETE_SAISON_LOADING:
            return {
                ...state,
                isLoadingDelete: true,
                isDeleteSuccess: false,
                errorDelete: ''
            }

        case DELETE_SAISON_ERROR:
            return {
                ...state,
                isLoadingDelete: false,
                errorDelete: action.payload
            }

        case DELETE_SAISON_SUCCESS:
            return {
                ...state,
                isLoadingDelete: false,
                isDeleteSuccess: true
            }

        //UPDATE
        case UPDATE_SAISON_LOADING:
            return {
                ...state,
                isLoadingEdit: true,
                isEditSuccess: false,
                errorEdit: ''
            }

        case UPDATE_SAISON_ERROR:
            return {
                ...state,
                isLoadingEdit: false,
                isEditSuccess: false,
                errorEdit: action.payload
            }

        case UPDATE_SAISON_SUCCESS:
            return {
                ...state,
                isLoadingEdit: false,
                isEditSuccess: true,
                errorEdit: ''
            }

        case REMOVE_SAISON_ACTIVE:
            return {
                ...state,
                isLoadingGetActive: false,
                saisonActive: {},
                errorGetActive: ''
            }

        //TRANSFER
        case TRANSFER_SAISON_LOADING:
            return {
                ...state,
                isLoadingTransfer: true,
                isTransferSuccess: false,
                errorTransfer: ''
            }

        case TRANSFER_SAISON_SUCCESS:
            return {
                ...state,
                isLoadingTransfer: false,
                isTransferSuccess: true,
                errorTransfer: ''
            }

        case TRANSFER_SAISON_ERROR:
            return {
                ...state,
                isLoadingTransfer: false,
                isTransferSuccess: false,
                errorTransfer: action.payload
            }

        //REMOVE_ALL
        case REMOVE_ALL_SAISONS:
            return initialState
            
        default: return state
    }
}

export default reducerSaisons