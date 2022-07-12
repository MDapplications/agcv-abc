import {    GET_TYPETUBES_LOADING,
            GET_TYPETUBES_SUCCESS,
            GET_TYPETUBES_ERROR,
            CREATE_TYPETUBE_LOADING,
            CREATE_TYPETUBE_ERROR,
            CREATE_TYPETUBE_SUCCESS,
            UPDATE_TYPETUBE_LOADING,
            UPDATE_TYPETUBE_ERROR,
            UPDATE_TYPETUBE_SUCCESS,
            DELETE_TYPETUBE_LOADING,
            DELETE_TYPETUBE_ERROR,
            DELETE_TYPETUBE_SUCCESS,
            REMOVE_ALL_TYPETUBES} from '../Constantes'


const initialState = {
    isLoading: false,
    isLoadingCreate: false,
    isLoadingDelete: false,
    isLoadingEdit: false,
    isCreateSuccess: false,
    isEditSuccess: false,
    isDeleteSuccess: false,
    typetubes: [],
    error: '',
    errorCreate: '',
    errorDelete: '',
    errorEdit: ''
}


//reducer
const reducerTypetubes = (state=initialState, action) => {

    switch (action.type) {

        //GET
        case GET_TYPETUBES_LOADING:
            return {
                ...state,
                isLoading: true,
                typetubes: [],
                error: ''
            }

        case GET_TYPETUBES_SUCCESS:
            return {
                ...state,
                isLoading: false,
                typetubes: action.payload,
                error: ''
            }

        case GET_TYPETUBES_ERROR:
            return {
                ...state,
                isLoading: false,
                typetubes: [],
                error: action.payload
            }

        //CREATE
        case CREATE_TYPETUBE_LOADING:
            return {
                ...state,
                isLoadingCreate: true,
                isCreateSuccess: false,
                errorCreate: ''
            }

        case CREATE_TYPETUBE_ERROR:
            return {
                ...state,
                isLoadingCreate: false,
                errorCreate: action.payload
            }


        case CREATE_TYPETUBE_SUCCESS:
            return {
                ...state,
                isLoadingCreate: false,
                isCreateSuccess: true
            }

        //DELETE
        case DELETE_TYPETUBE_LOADING:
            return {
                ...state,
                isLoadingDelete: true,
                isDeleteSuccess: false,
                errorDelete: ''
            }

        case DELETE_TYPETUBE_ERROR:
            return {
                ...state,
                isLoadingDelete: false,
                errorDelete: action.payload
            }

        case DELETE_TYPETUBE_SUCCESS:
            return {
                ...state,
                isLoadingDelete: false,
                isDeleteSuccess: true
            }

        //UPDATE
        case UPDATE_TYPETUBE_LOADING:
            return {
                ...state,
                isLoadingEdit: true,
                isEditSuccess: false,
                errorEdit: ''
            }

        case UPDATE_TYPETUBE_ERROR:
            return {
                ...state,
                isLoadingEdit: false,
                errorEdit: action.payload
            }

        case UPDATE_TYPETUBE_SUCCESS:
            return {
                ...state,
                isLoadingEdit: false,
                isEditSuccess: true
            }

        //REMOVE_ALL
        case REMOVE_ALL_TYPETUBES:
            return initialState
            
        default: return state
    }
}

export default reducerTypetubes