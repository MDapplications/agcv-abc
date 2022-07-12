import {    GET_MEMBRES_LOADING,
            GET_MEMBRES_SUCCESS,
            GET_MEMBRES_ERROR,
            CREATE_MEMBRE_LOADING,
            CREATE_MEMBRE_ERROR,
            CREATE_MEMBRE_SUCCESS,
            UPDATE_MEMBRE_LOADING,
            UPDATE_MEMBRE_ERROR,
            UPDATE_MEMBRE_SUCCESS,
            DELETE_MEMBRE_LOADING,
            DELETE_MEMBRE_ERROR,
            DELETE_MEMBRE_SUCCESS,
            REMOVE_ALL_MEMBRES} from '../Constantes'


const initialState = {
    isLoading: false,
    isLoadingCreate: false,
    isLoadingDelete: false,
    isLoadingEdit: false,
    isCreateSuccess: false,
    isEditSuccess: false,
    isDeleteSuccess: false,
    membres: [],
    error: '',
    errorCreate: '',
    errorDelete: '',
    errorEdit: ''
}


//reducer
const reducerMembres = (state=initialState, action) => {

    switch (action.type) {

        //GET
        case GET_MEMBRES_LOADING:
            return {
                ...state,
                isLoading: true,
                membres: [],
                error: ''
            }

        case GET_MEMBRES_SUCCESS:
            return {
                ...state,
                isLoading: false,
                membres: action.payload,
                error: ''
            }

        case GET_MEMBRES_ERROR:
            return {
                ...state,
                isLoading: false,
                membres: [],
                error: action.payload
            }

        //CREATE
        case CREATE_MEMBRE_LOADING:
            return {
                ...state,
                isLoadingCreate: true,
                isCreateSuccess: false,
                errorCreate: ''
            }

        case CREATE_MEMBRE_ERROR:
            return {
                ...state,
                isLoadingCreate: false,
                errorCreate: action.payload
            }


        case CREATE_MEMBRE_SUCCESS:
            return {
                ...state,
                isLoadingCreate: false,
                isCreateSuccess: true
            }

        //DELETE
        case DELETE_MEMBRE_LOADING:
            return {
                ...state,
                isLoadingDelete: true,
                isDeleteSuccess: false,
                errorDelete: ''
            }

        case DELETE_MEMBRE_ERROR:
            return {
                ...state,
                isLoadingDelete: false,
                errorDelete: action.payload
            }

        case DELETE_MEMBRE_SUCCESS:
            return {
                ...state,
                isLoadingDelete: false,
                isDeleteSuccess: true
            }

        //UPDATE
        case UPDATE_MEMBRE_LOADING:
            return {
                ...state,
                isLoadingEdit: true,
                isEditSuccess: false,
                errorEdit: ''
            }

        case UPDATE_MEMBRE_ERROR:
            return {
                ...state,
                isLoadingEdit: false,
                errorEdit: action.payload
            }

        case UPDATE_MEMBRE_SUCCESS:
            return {
                ...state,
                isLoadingEdit: false,
                isEditSuccess: true
            }

        //REMOVE_ALL
        case REMOVE_ALL_MEMBRES:
            return initialState
            
        default: return state
    }
}

export default reducerMembres