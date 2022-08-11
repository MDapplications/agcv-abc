import {    GET_CONSOVOLANTS_LOADING,
            GET_CONSOVOLANTS_SUCCESS,
            GET_CONSOVOLANTS_ERROR,
            UPDATE_CONSOVOLANT_LOADING,
            UPDATE_CONSOVOLANT_ERROR,
            UPDATE_CONSOVOLANT_SUCCESS,
            DELETE_CONSOVOLANT_LOADING,
            DELETE_CONSOVOLANT_ERROR,
            DELETE_CONSOVOLANT_SUCCESS,
            REMOVE_ALL_CONSOVOLANTS} from '../Constantes'


const initialState = {
    isLoading: false,
    isLoadingDelete: false,
    isLoadingEdit: false,
    isGetSuccess: false,
    isEditSuccess: false,
    isDeleteSuccess: false,
    consovolants: [],
    error: '',
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
                isGetSuccess: false,
                consovolants: [],
                error: ''
            }

        case GET_CONSOVOLANTS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isGetSuccess: true,
                consovolants: action.payload,
                error: ''
            }

        case GET_CONSOVOLANTS_ERROR:
            return {
                ...state,
                isLoading: false,
                isGetSuccess: false,
                consovolants: [],
                error: action.payload
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