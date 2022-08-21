import {    GET_COMPETITIONS_LOADING,
            GET_COMPETITIONS_SUCCESS,
            GET_COMPETITIONS_ERROR,
            CREATE_COMPETITION_LOADING,
            CREATE_COMPETITION_ERROR,
            CREATE_COMPETITION_SUCCESS,
            UPDATE_COMPETITION_LOADING,
            UPDATE_COMPETITION_ERROR,
            UPDATE_COMPETITION_SUCCESS,
            DELETE_COMPETITION_LOADING,
            DELETE_COMPETITION_ERROR,
            DELETE_COMPETITION_SUCCESS,
            REMOVE_ALL_COMPETITIONS} from '../Constantes'

const initialState = {
    isLoading: false,
    isLoadingCreate: false,
    isLoadingDelete: false,
    isLoadingEdit: false,
    isGetSuccess: false,
    isCreateSuccess: false,
    isEditSuccess: false,
    isDeleteSuccess: false,
    competitions: [],
    error: '',
    errorCreate: '',
    errorDelete: '',
    errorEdit: ''
}


//reducer
const reducerCompetitions = (state=initialState, action) => {

    switch (action.type) {

        //GET
        case GET_COMPETITIONS_LOADING:
            return {
                ...state,
                isLoading: true,
                isGetSuccess: false,
                competitions: [],
                error: ''
            }

        case GET_COMPETITIONS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isGetSuccess: true,
                competitions: action.payload,
                error: ''
            }

        case GET_COMPETITIONS_ERROR:
            return {
                ...state,
                isLoading: false,
                isGetSuccess: false,
                competitions: [],
                error: action.payload
            }

        //CREATE
        case CREATE_COMPETITION_LOADING:
            return {
                ...state,
                isLoadingCreate: true,
                isCreateSuccess: false,
                errorCreate: ''
            }

        case CREATE_COMPETITION_ERROR:
            return {
                ...state,
                isLoadingCreate: false,
                isCreateSuccess: false,
                errorCreate: action.payload
            }


        case CREATE_COMPETITION_SUCCESS:
            return {
                ...state,
                isLoadingCreate: false,
                isCreateSuccess: true,
                errorCreate: ''
            }

        //DELETE
        case DELETE_COMPETITION_LOADING:
            return {
                ...state,
                isLoadingDelete: true,
                isDeleteSuccess: false,
                errorDelete: ''
            }

        case DELETE_COMPETITION_ERROR:
            return {
                ...state,
                isLoadingDelete: false,
                errorDelete: action.payload
            }

        case DELETE_COMPETITION_SUCCESS:
            return {
                ...state,
                isLoadingDelete: false,
                isDeleteSuccess: true
            }

        //UPDATE
        case UPDATE_COMPETITION_LOADING:
            return {
                ...state,
                isLoadingEdit: true,
                isEditSuccess: false,
                errorEdit: ''
            }

        case UPDATE_COMPETITION_ERROR:
            return {
                ...state,
                isLoadingEdit: false,
                errorEdit: action.payload
            }

        case UPDATE_COMPETITION_SUCCESS:
            return {
                ...state,
                isLoadingEdit: false,
                isEditSuccess: true
            }

        //REMOVE_ALL
        case REMOVE_ALL_COMPETITIONS:
            return initialState
            
        default: return state
    }
}

export default reducerCompetitions