import axios from 'axios'
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

const {REACT_APP_AGCV_API_URL} = process.env



//réinitialisation de la liste des utilisateurs
export const initTypetubes = () => {
    return {
        type: REMOVE_ALL_TYPETUBES
    }
}


//En attente de réponse de l'API
const getTypetubesLoading = () => {
    return {
        type: GET_TYPETUBES_LOADING
    }
}

//Réponse reçu
const getTypetubesSuccess = data => {
    return {
        type: GET_TYPETUBES_SUCCESS,     
        payload: data  
    }
}


//Réponse d'erreur
const getTypetubesError = error => {
    return {
        type: GET_TYPETUBES_ERROR,     
        payload: error
    }
}


//En attente de réponse de l'API
const createTypetubeLoading = () => {
    return {
        type: CREATE_TYPETUBE_LOADING
    }
}

//Réponse d'erreur
const createTypetubeError = error => {
    return {
        type: CREATE_TYPETUBE_ERROR,     
        payload: error
    }
}

//Réponse success
const createTypetubeSuccess = () => {
    return {
        type: CREATE_TYPETUBE_SUCCESS
    }
}


//En attente de réponse de l'API
const deleteTypetubeLoading = () => {
    return {
        type: DELETE_TYPETUBE_LOADING
    }
}

//Réponse d'erreur
const deleteTypetubeError = error => {
    return {
        type: DELETE_TYPETUBE_ERROR,     
        payload: error
    }
}


//Réponse success
const deleteTypetubeSuccess = () => {
    return {
        type: DELETE_TYPETUBE_SUCCESS
    }
}


//En attente de réponse de l'API
const editTypetubeLoading = () => {
    return {
        type: UPDATE_TYPETUBE_LOADING
    }
}

//Réponse d'erreur
const editTypetubeError = error => {
    return {
        type: UPDATE_TYPETUBE_ERROR,     
        payload: error
    }
}

//Réponse success
const editTypetubeSuccess = () => {
    return {
        type: UPDATE_TYPETUBE_SUCCESS
    }
}





//mise à jour de la liste des type tubes
export const refreshAllTypetubes = token => {
    return dispatch => {
        dispatch(initTypetubes())
        dispatch(getAllTypetubes(token))
    }
}



//Dispatch des actions lors de la création d'un typetube
export const createTypetube = (token, data) => {
    return dispatch => {
        
        const {name, comment, orderable, lowLevel} = data

        dispatch(createTypetubeLoading())

        axios.post(
            `${REACT_APP_AGCV_API_URL}/typetubes`,
            {   
                name, 
                comment,
                orderable,
                lowLevel,
                default: data.default
            },
            { headers: { "Authorization": `Bearer ${token}` } }
        )
        .then(() => {
            dispatch(createTypetubeSuccess())
        })
        .catch(err => {
            if (err.response.data.message !== undefined) {
                dispatch(createTypetubeError(err.response.data.message))
            } else {
                dispatch(createTypetubeError(err))
            }
        })

    }
}




//Dispatch des actions lors de l'update d'un typetube
export const editTypetube = (token, data) => {
    return dispatch => {

        const {name, comment, orderable, lowLevel} = data

        dispatch(editTypetubeLoading())

        axios.put(
            `${REACT_APP_AGCV_API_URL}/typetubes/${data.id}`,
            {   
                name, 
                comment,
                orderable,
                lowLevel,
                default: data.default
            },
            { headers: { "Authorization": `Bearer ${token}` } }
        )
        .then(() => {
            dispatch(editTypetubeSuccess())
        })
        .catch(err => {
            if (err.response.data.message !== undefined) {
                dispatch(editTypetubeError(err.response.data.message))
            } else {
                dispatch(editTypetubeError(err))
            }
        })

    }
}





export const deleteTypetube = (token, id) => {
    return dispatch => {

        dispatch(deleteTypetubeLoading())

        axios.delete(
            `${REACT_APP_AGCV_API_URL}/typetubes/${id}`,
            { headers: { "Authorization": `Bearer ${token}` } }
        )
        .then(() => {
            dispatch(deleteTypetubeSuccess())
        })
        .catch(err => {
            if (err.response.data.message !== undefined) {
                dispatch(deleteTypetubeError(err.response.data.message))
            } else {
                dispatch(deleteTypetubeError(err))
            }
        })

    }
}






export const getAllTypetubes = token => {
    return dispatch => {

        dispatch(getTypetubesLoading())

        axios.get(
            `${REACT_APP_AGCV_API_URL}/typetubes`,
            { headers: { "Authorization": `Bearer ${token}` } }
        )
        .then(res => {
            const listTypetubes = []
            res.data.data.forEach(typetube => {
                listTypetubes.push({
                    id: typetube.id,
                    name: typetube.name,
                    comment: typetube.comment,
                    orderable: typetube.orderable,
                    lowLevel: typetube.lowLevel,
                    default: typetube.default,
                    dateCreation: typetube.dateCreation,
                    horodatage: typetube.horodatage
                })
            })
            dispatch(getTypetubesSuccess(listTypetubes))
        })
        .catch(err => {
            if (err.response.data.message !== undefined) {
                dispatch(getTypetubesError(err.response.data.message))
            } else {
                dispatch(getTypetubesError(err))
            }
        })

    }
}