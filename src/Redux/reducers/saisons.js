import {    GET_SAISONS_LOADING,
            GET_SAISONS_SUCCESS,
            GET_SAISONS_ERROR,
            CREATE_SAISON_LOADING,
            CREATE_SAISON_ERROR,
            CREATE_SAISON_SUCCESS,
            UPDATE_SAISON_LOADING,
            UPDATE_SAISON_ERROR,
            UPDATE_SAISON_SUCCESS,
            DELETE_SAISON_LOADING,
            DELETE_SAISON_ERROR,
            DELETE_SAISON_SUCCESS,
            REMOVE_ALL_SAISONS} from '../Constantes'


const initialState = {
    isLoading: false,
    isLoadingCreate: false,
    isLoadingDelete: false,
    isLoadingEdit: false,
    isCreateSuccess: false,
    isEditSuccess: false,
    isDeleteSuccess: false,
    saisonActuelle: {},
    saisons: [],
    error: '',
    errorCreate: '',
    errorDelete: '',
    errorEdit: ''
}


//reducer
const reducerSaisons = (state=initialState, action) => {

    switch (action.type) {

        //GET
        case GET_SAISONS_LOADING:
            return {
                ...state,
                isLoading: true,
                saisons: [],
                error: ''
            }

        case GET_SAISONS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                saisons: action.payload,
                error: ''
            }

        case GET_SAISONS_ERROR:
            return {
                ...state,
                isLoading: false,
                saisons: [],
                error: action.payload
            }

        //CREATE
        case CREATE_SAISON_LOADING:
            return {
                ...state,
                isLoadingCreate: true,
                isCreateSuccess: false,
                errorCreate: ''
            }

        case CREATE_SAISON_ERROR:
            return {
                ...state,
                isLoadingCreate: false,
                errorCreate: action.payload
            }


        case CREATE_SAISON_SUCCESS:
            return {
                ...state,
                isLoadingCreate: false,
                isCreateSuccess: true
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
                errorEdit: action.payload
            }

        case UPDATE_SAISON_SUCCESS:
            return {
                ...state,
                isLoadingEdit: false,
                isEditSuccess: true
            }

        //REMOVE_ALL
        case REMOVE_ALL_SAISONS:
            return initialState
            
        default: return state
    }
}

export default reducerSaisons