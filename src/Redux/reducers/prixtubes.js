import {    GET_PRIXTUBES_LOADING,
            GET_PRIXTUBES_SUCCESS,
            GET_PRIXTUBES_ERROR,
            CREATE_PRIXTUBE_LOADING,
            CREATE_PRIXTUBE_ERROR,
            CREATE_PRIXTUBE_SUCCESS,
            UPDATE_PRIXTUBE_LOADING,
            UPDATE_PRIXTUBE_ERROR,
            UPDATE_PRIXTUBE_SUCCESS,
            DELETE_PRIXTUBE_LOADING,
            DELETE_PRIXTUBE_ERROR,
            DELETE_PRIXTUBE_SUCCESS,
            REMOVE_ALL_PRIXTUBES} from '../Constantes'


            
const initialState = {
    isLoading: false,
    isLoadingCreate: false,
    isLoadingDelete: false,
    isLoadingEdit: false,
    isCreateSuccess: false,
    isEditSuccess: false,
    isDeleteSuccess: false,
    prixtubes: [],
    error: '',
    errorCreate: '',
    errorDelete: '',
    errorEdit: ''
}


//reducer
const reducerPrixtubes = (state=initialState, action) => {

    switch (action.type) {

        //GET
        case GET_PRIXTUBES_LOADING:
            return {
                ...state,
                isLoading: true,
                prixtubes: [],
                error: ''
            }

        case GET_PRIXTUBES_SUCCESS:
            return {
                ...state,
                isLoading: false,
                prixtubes: action.payload,
                error: ''
            }

        case GET_PRIXTUBES_ERROR:
            return {
                ...state,
                isLoading: false,
                prixtubes: [],
                error: action.payload
            }

        //CREATE
        case CREATE_PRIXTUBE_LOADING:
            return {
                ...state,
                isLoadingCreate: true,
                isCreateSuccess: false,
                errorCreate: ''
            }

        case CREATE_PRIXTUBE_ERROR:
            return {
                ...state,
                isLoadingCreate: false,
                errorCreate: action.payload
            }


        case CREATE_PRIXTUBE_SUCCESS:
            return {
                ...state,
                isLoadingCreate: false,
                isCreateSuccess: true
            }

        //DELETE
        case DELETE_PRIXTUBE_LOADING:
            return {
                ...state,
                isLoadingDelete: true,
                isDeleteSuccess: false,
                errorDelete: ''
            }

        case DELETE_PRIXTUBE_ERROR:
            return {
                ...state,
                isLoadingDelete: false,
                errorDelete: action.payload
            }

        case DELETE_PRIXTUBE_SUCCESS:
            return {
                ...state,
                isLoadingDelete: false,
                isDeleteSuccess: true
            }

        //UPDATE
        case UPDATE_PRIXTUBE_LOADING:
            return {
                ...state,
                isLoadingEdit: true,
                isEditSuccess: false,
                errorEdit: ''
            }

        case UPDATE_PRIXTUBE_ERROR:
            return {
                ...state,
                isLoadingEdit: false,
                errorEdit: action.payload
            }

        case UPDATE_PRIXTUBE_SUCCESS:
            return {
                ...state,
                isLoadingEdit: false,
                isEditSuccess: true
            }

        //REMOVE_ALL
        case REMOVE_ALL_PRIXTUBES:
            return initialState
            
        default: return state
    }
}

export default reducerPrixtubes