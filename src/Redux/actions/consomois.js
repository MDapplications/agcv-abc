import axios from 'axios'
import {    GET_CONSOMOIS_LOADING,
            GET_CONSOMOIS_SUCCESS,
            GET_CONSOMOIS_ERROR,
            UPDATE_CONSOMOIS_LOADING,
            UPDATE_CONSOMOIS_ERROR,
            UPDATE_CONSOMOIS_SUCCESS,
            DELETE_CONSOMOIS_LOADING,
            DELETE_CONSOMOIS_ERROR,
            DELETE_CONSOMOIS_SUCCESS,
            REMOVE_ALL_CONSOMOIS} from '../Constantes'

const {REACT_APP_AGCV_API_URL} = process.env



//réinitialisation de la liste des utilisateurs
export const initConsoMois = () => {
    return {
        type: REMOVE_ALL_CONSOMOIS
    }
}


//En attente de réponse de l'API
const getConsoMoisLoading = () => {
    return {
        type: GET_CONSOMOIS_LOADING
    }
}

//Réponse reçu
const getConsoMoisSuccess = data => {
    return {
        type: GET_CONSOMOIS_SUCCESS,     
        payload: data  
    }
}


//Réponse d'erreur
const getConsoMoisError = error => {
    return {
        type: GET_CONSOMOIS_ERROR,     
        payload: error
    }
}


//En attente de réponse de l'API
const deleteConsoMoisLoading = () => {
    return {
        type: DELETE_CONSOMOIS_LOADING
    }
}

//Réponse d'erreur
const deleteConsoMoisError = error => {
    return {
        type: DELETE_CONSOMOIS_ERROR,     
        payload: error
    }
}


//Réponse success
const deleteConsoMoisSuccess = () => {
    return {
        type: DELETE_CONSOMOIS_SUCCESS
    }
}


//En attente de réponse de l'API
const editConsoMoisLoading = () => {
    return {
        type: UPDATE_CONSOMOIS_LOADING
    }
}

//Réponse d'erreur
const editConsoMoisError = error => {
    return {
        type: UPDATE_CONSOMOIS_ERROR,     
        payload: error
    }
}

//Réponse success
const editConsoMoisSuccess = () => {
    return {
        type: UPDATE_CONSOMOIS_SUCCESS
    }
}





//mise à jour de la liste des type tubes
export const refreshAllConsoMois = token => {
    return dispatch => {
        dispatch(initConsoMois())
        dispatch(getAllConsoMois(token))
    }
}


//Dispatch des actions lors de l'update d'un consomois
export const editConsoMois = (token, data) => {
    return dispatch => {

        const {nbTubesUsed, nbTubesOrdered, idPrixTube} = data

        dispatch(editConsoMoisLoading())

        axios.put(
            `${REACT_APP_AGCV_API_URL}/consomois/${data.id}`,
            {   
                nbTubesUsed,
                nbTubesOrdered,
                idPrixTube,
            },
            { headers: { "Authorization": `Bearer ${token}` } }
        )
        .then(() => {
            dispatch(editConsoMoisSuccess())
        })
        .catch(err => {
            try {
                dispatch(editConsoMoisError(err.response.data.message))
            } catch (_) {
                dispatch(editConsoMoisError(err))
            }
        })

    }
}





export const deleteConsoMois = (token, id) => {
    return dispatch => {

        dispatch(deleteConsoMoisLoading())

        axios.delete(
            `${REACT_APP_AGCV_API_URL}/consomois/${id}`,
            { headers: { "Authorization": `Bearer ${token}` } }
        )
        .then(() => {
            dispatch(deleteConsoMoisSuccess())
        })
        .catch(err => {
            try {
                dispatch(deleteConsoMoisError(err.response.data.message))
            } catch (_) {
                dispatch(deleteConsoMoisError(err))
            }
        })
    }
}






export const getAllConsoMois = (token, idConsoVolant) => {
    return dispatch => {

        dispatch(getConsoMoisLoading())

        axios.get(
            `${REACT_APP_AGCV_API_URL}/consomois?idConsoVolant=${idConsoVolant}`,
            { headers: { "Authorization": `Bearer ${token}` } }
        )
        .then(res => {
            const listConsoMois = []
            res.data.data.forEach(consomois => {
                listConsoMois.push({
                    id: consomois.id,
                    name: consomois.name,
                    nbTubesUsed: consomois.nbTubesUsed,
                    nbTubesOrdered: consomois.nbTubesOrdered,
                    idConsoVolant: consomois.idConsoVolant,
                    idPrixTube: consomois.idPrixTube,
                    dateCreation: consomois.dateCreation,
                    horodatage: consomois.horodatage,
                    PrixTubes: consomois.PrixTubes
                })
            })
            dispatch(getConsoMoisSuccess(listConsoMois))
        })
        .catch(err => {
            try {
                dispatch(getConsoMoisError(err.response.data.message))
            } catch (_) {
                dispatch(getConsoMoisError(err))
            }
        })
    }
}