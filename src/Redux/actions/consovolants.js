import axios from 'axios'
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

const {REACT_APP_AGCV_API_URL} = process.env


//réinitialisation de la liste des utilisateurs
export const initConsoVolants = () => {
    return {
        type: REMOVE_ALL_CONSOVOLANTS
    }
}


//En attente de réponse de l'API
const getConsoVolantsLoading = () => {
    return {
        type: GET_CONSOVOLANTS_LOADING
    }
}

//Réponse reçu
const getConsoVolantsSuccess = data => {
    return {
        type: GET_CONSOVOLANTS_SUCCESS,     
        payload: data  
    }
}


//Réponse d'erreur
const getConsoVolantsError = error => {
    return {
        type: GET_CONSOVOLANTS_ERROR,     
        payload: error
    }
}


//En attente de réponse de l'API
const deleteConsoVolantLoading = () => {
    return {
        type: DELETE_CONSOVOLANT_LOADING
    }
}

//Réponse d'erreur
const deleteConsoVolantError = error => {
    return {
        type: DELETE_CONSOVOLANT_ERROR,     
        payload: error
    }
}


//Réponse success
const deleteConsoVolantSuccess = () => {
    return {
        type: DELETE_CONSOVOLANT_SUCCESS
    }
}


//En attente de réponse de l'API
const editConsoVolantLoading = () => {
    return {
        type: UPDATE_CONSOVOLANT_LOADING
    }
}

//Réponse d'erreur
const editConsoVolantError = error => {
    return {
        type: UPDATE_CONSOVOLANT_ERROR,     
        payload: error
    }
}

//Réponse success
const editConsoVolantSuccess = () => {
    return {
        type: UPDATE_CONSOVOLANT_SUCCESS
    }
}





//mise à jour de la liste des type tubes
export const refreshAllConsoVolants = token => {
    return dispatch => {
        dispatch(initConsoVolants())
        dispatch(getAllConsoVolants(token))
    }
}



//Dispatch des actions lors de l'update d'un consovolant
export const editConsoVolant = (token, data) => {
    return dispatch => {

        const {stock} = data

        dispatch(editConsoVolantLoading())

        axios.put(
            `${REACT_APP_AGCV_API_URL}/consovolants/${data.id}`,
            { stock },
            { headers: { "Authorization": `Bearer ${token}` } }
        )
        .then(() => {
            dispatch(editConsoVolantSuccess())
        })
        .catch(err => {
            try {
                dispatch(editConsoVolantError(err.response.data.message))
            } catch(_) {
                dispatch(editConsoVolantError(err))
            }
        })

    }
}





export const deleteConsoVolant = (token, id) => {
    return dispatch => {

        dispatch(deleteConsoVolantLoading())

        axios.delete(
            `${REACT_APP_AGCV_API_URL}/consovolants/${id}`,
            { headers: { "Authorization": `Bearer ${token}` } }
        )
        .then(() => {
            dispatch(deleteConsoVolantSuccess())
        })
        .catch(err => {
            try {
                dispatch(deleteConsoVolantError(err.response.data.message))
            } catch (_) {
                dispatch(deleteConsoVolantError(err))
            }
        })

    }
}


const listMois = ['Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre', 'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin']

export const getAllConsoVolants = (token, idSaison) => {
    return dispatch => {

        dispatch(getConsoVolantsLoading())

        axios.get(
            `${REACT_APP_AGCV_API_URL}/consovolants?idSaison=${idSaison}`,
            { headers: { "Authorization": `Bearer ${token}` } }
        )
        .then(res => {
            const listConsoVolants = []
            res.data.data.forEach(consovolant => {
                listConsoVolants.push({
                    id: consovolant.id,
                    stock: consovolant.stock,
                    idSaison: consovolant.idSaison,
                    idTypeTube: consovolant.idTypeTube,
                    dateCreation: consovolant.dateCreation,
                    horodatage: consovolant.horodatage,
                    ConsoMois: consovolant.ConsoMois.sort((a, b) => listMois.indexOf(a.name) - listMois.indexOf(b.name)),
                    TypeTube: consovolant.TypeTube,
                })
            })
            dispatch(getConsoVolantsSuccess(listConsoVolants))
        })
        .catch(err => {
            try {
                dispatch(getConsoVolantsError(err.response.data.message))
            } catch (_) {
                dispatch(getConsoVolantsError(err))
            } 
        })

    }
}