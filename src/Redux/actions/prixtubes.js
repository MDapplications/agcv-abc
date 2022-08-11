import axios from 'axios'
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

const {REACT_APP_AGCV_API_URL} = process.env

//réinitialisation de la liste des utilisateurs
export const initPrixtubes = () => {
    return {
        type: REMOVE_ALL_PRIXTUBES
    }
}


//En attente de réponse de l'API
const getPrixtubesLoading = () => {
    return {
        type: GET_PRIXTUBES_LOADING
    }
}

//Réponse reçu
const getPrixtubesSuccess = data => {
    return {
        type: GET_PRIXTUBES_SUCCESS,     
        payload: data  
    }
}


//Réponse d'erreur
const getPrixtubesError = error => {
    return {
        type: GET_PRIXTUBES_ERROR,     
        payload: error
    }
}


//En attente de réponse de l'API
const createPrixtubeLoading = () => {
    return {
        type: CREATE_PRIXTUBE_LOADING
    }
}

//Réponse d'erreur
const createPrixtubeError = error => {
    return {
        type: CREATE_PRIXTUBE_ERROR,     
        payload: error
    }
}

//Réponse success
const createPrixtubeSuccess = () => {
    return {
        type: CREATE_PRIXTUBE_SUCCESS
    }
}


//En attente de réponse de l'API
const deletePrixtubeLoading = () => {
    return {
        type: DELETE_PRIXTUBE_LOADING
    }
}

//Réponse d'erreur
const deletePrixtubeError = error => {
    return {
        type: DELETE_PRIXTUBE_ERROR,     
        payload: error
    }
}


//Réponse success
const deletePrixtubeSuccess = () => {
    return {
        type: DELETE_PRIXTUBE_SUCCESS
    }
}


//En attente de réponse de l'API
const editPrixtubeLoading = () => {
    return {
        type: UPDATE_PRIXTUBE_LOADING
    }
}

//Réponse d'erreur
const editPrixtubeError = error => {
    return {
        type: UPDATE_PRIXTUBE_ERROR,     
        payload: error
    }
}

//Réponse success
const editPrixtubeSuccess = () => {
    return {
        type: UPDATE_PRIXTUBE_SUCCESS
    }
}





//mise à jour de la liste des prix tubes
export const refreshAllPrixtubes = token => {
    return dispatch => {
        dispatch(initPrixtubes())
        dispatch(getAllPrixtubes(token))
    }
}



//Dispatch des actions lors de la création d'un prixtube
export const createPrixtube = (token, data) => {
    return dispatch => {
        
        const {marque, prix, prixMembre, actif, idTypeTube} = data

        dispatch(createPrixtubeLoading())

        axios.post(
            `${REACT_APP_AGCV_API_URL}/prixtubes`,
            {   
                marque,
                prix,
                prixMembre,
                actif,
                idTypeTube,
            },
            { headers: { "Authorization": `Bearer ${token}` } }
        )
        .then(() => {
            dispatch(createPrixtubeSuccess())
        })
        .catch(err => {
            if (err.response.data.message !== undefined) {
                dispatch(createPrixtubeError(err.response.data.message))
            } else {
                dispatch(createPrixtubeError(err))
            }
        })
    }
}






//Dispatch des actions lors de l'update d'un prixtube
export const editPrixtube = (token, data) => {
    return dispatch => {

        const {marque, prix, prixMembre, actif} = data

        dispatch(editPrixtubeLoading())

        axios.put(
            `${REACT_APP_AGCV_API_URL}/prixtubes/${data.id}`,
            {   
                marque,
                prix,
                prixMembre,
                actif,
            },
            { headers: { "Authorization": `Bearer ${token}` } }
        )
        .then(() => {
            dispatch(editPrixtubeSuccess())
        })
        .catch(err => {
            if (err.response.data.message !== undefined) {
                dispatch(editPrixtubeError(err.response.data.message))
            } else {
                dispatch(editPrixtubeError(err))
            }
        })
    }
}





export const deletePrixtube = (token, id) => {
    return dispatch => {

        dispatch(deletePrixtubeLoading())

        axios.delete(
            `${REACT_APP_AGCV_API_URL}/prixtubes/${id}`,
            { headers: { "Authorization": `Bearer ${token}` } }
        )
        .then(() => {
            dispatch(deletePrixtubeSuccess())
        })
        .catch(err => {
            if (err.response.data.message !== undefined) {
                dispatch(deletePrixtubeError(err.response.data.message))
            } else {
                dispatch(deletePrixtubeError(err))
            }
        })

    }
}




export const getAllPrixtubes = token => {
    return dispatch => {

        dispatch(getPrixtubesLoading())

        axios.get(
            `${REACT_APP_AGCV_API_URL}/prixtubes`,
            { headers: { "Authorization": `Bearer ${token}` } }
        )
        .then(res => {
            const listPrixtubes = []
            res.data.data.forEach(prixtube => {
                listPrixtubes.push({
                    id: prixtube.id,
                    marque: prixtube.marque,
                    prix: prixtube.prix,
                    prixMembre: prixtube.prixMembre,
                    actif: prixtube.actif,
                    idTypeTube: prixtube.idTypeTube,
                    dateCreation: prixtube.dateCreation,
                    horodatage: prixtube.horodatage
                })
            })
            dispatch(getPrixtubesSuccess(listPrixtubes))
        })
        .catch(err => {
            if (err.response.data.message !== undefined) {
                dispatch(getPrixtubesError(err.response.data.message))
            } else {
                dispatch(getPrixtubesError(err))
            }
        })

    }
}