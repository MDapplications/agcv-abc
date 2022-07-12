import {    GET_CONSOVOLANTS_LOADING,
            GET_CONSOVOLANTS_SUCCESS,
            GET_CONSOVOLANTS_ERROR,
            CREATE_CONSOVOLANT_LOADING,
            CREATE_CONSOVOLANT_ERROR,
            CREATE_CONSOVOLANT_SUCCESS,
            UPDATE_CONSOVOLANT_LOADING,
            UPDATE_CONSOVOLANT_ERROR,
            UPDATE_CONSOVOLANT_SUCCESS,
            DELETE_CONSOVOLANT_LOADING,
            DELETE_CONSOVOLANT_ERROR,
            DELETE_CONSOVOLANT_SUCCESS,
            REMOVE_ALL_CONSOVOLANTS} from '../Constantes'


const initialState = {
    isLoading: false,
    isLoadingCreate: false,
    isLoadingDelete: false,
    isLoadingEdit: false,
    isCreateSuccess: false,
    isEditSuccess: false,
    isDeleteSuccess: false,
    consovolants: [],
    error: '',
    errorCreate: '',
    errorDelete: '',
    errorEdit: ''
}


//reducer
const reducerConsoVolants = (state=initialState, action) => {

    switch (action.type) {

        //GET
        case GET_CONSOVOLANTS_LOADING:
            return {
                ...state,
                isLoading: true,
                consovolants: [],
                error: ''
            }

        case GET_CONSOVOLANTS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                consovolants: action.payload,
                error: ''
            }

        case GET_CONSOVOLANTS_ERROR:
            return {
                ...state,
                isLoading: false,
                consovolants: [],
                error: action.payload
            }

        //CREATE
        case CREATE_CONSOVOLANT_LOADING:
            return {
                ...state,
                isLoadingCreate: true,
                isCreateSuccess: false,
                errorCreate: ''
            }

        case CREATE_CONSOVOLANT_ERROR:
            return {
                ...state,
                isLoadingCreate: false,
                errorCreate: action.payload
            }


        case CREATE_CONSOVOLANT_SUCCESS:
            return {
                ...state,
                isLoadingCreate: false,
                isCreateSuccess: true
            }

        //DELETE
        case DELETE_CONSOVOLANT_LOADING:
            return {
                ...state,
                isLoadingDelete: true,
                isDeleteSuccess: false,
                errorDelete: ''
            }

        case DELETE_CONSOVOLANT_ERROR:
            return {
                ...state,
                isLoadingDelete: false,
                errorDelete: action.payload
            }

        case DELETE_CONSOVOLANT_SUCCESS:
            return {
                ...state,
                isLoadingDelete: false,
                isDeleteSuccess: true
            }

        //UPDATE
        case UPDATE_CONSOVOLANT_LOADING:
            return {
                ...state,
                isLoadingEdit: true,
                isEditSuccess: false,
                errorEdit: ''
            }

        case UPDATE_CONSOVOLANT_ERROR:
            return {
                ...state,
                isLoadingEdit: false,
                errorEdit: action.payload
            }

        case UPDATE_CONSOVOLANT_SUCCESS:
            return {
                ...state,
                isLoadingEdit: false,
                isEditSuccess: true
            }

        //REMOVE_ALL
        case REMOVE_ALL_CONSOVOLANTS:
            return initialState
            
        default: return state
    }
}

export default reducerConsoVolants