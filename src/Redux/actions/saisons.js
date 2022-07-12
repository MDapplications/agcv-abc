import axios from 'axios'
import {    GET_SAISONS_LOADING,
            GET_SAISONS_SUCCESS,
            GET_SAISONS_ERROR,
            CREATE_SAISON_LOADING,
            CREATE_SAISON_ERROR,
            CREATE_SAISON_SUCCESS,
            UPDATE_SAISON_LOADING,
            UPDATE_SAISON_ERROR,
            UPDATE_SAISON_SUCCESS,
            DELETE_SAISON_LOADING,
            DELETE_SAISON_ERROR,
            DELETE_SAISON_SUCCESS,
            REMOVE_ALL_SAISONS} from '../Constantes'

const {REACT_APP_AGCV_API_URL} = process.env




//réinitialisation de la liste des utilisateurs
export const initSaisons = () => {
    return {
        type: REMOVE_ALL_SAISONS
    }
}


//En attente de réponse de l'API
const getSaisonsLoading = () => {
    return {
        type: GET_SAISONS_LOADING
    }
}

//Réponse reçu
const getSaisonsSuccess = data => {
    return {
        type: GET_SAISONS_SUCCESS,     
        payload: data  
    }
}


//Réponse d'erreur
const getSaisonsError = error => {
    return {
        type: GET_SAISONS_ERROR,     
        payload: error
    }
}


//En attente de réponse de l'API
const createSaisonLoading = () => {
    return {
        type: CREATE_SAISON_LOADING
    }
}

//Réponse d'erreur
const createSaisonError = error => {
    return {
        type: CREATE_SAISON_ERROR,     
        payload: error
    }
}

//Réponse success
const createSaisonSuccess = () => {
    return {
        type: CREATE_SAISON_SUCCESS
    }
}


//En attente de réponse de l'API
const deleteSaisonLoading = () => {
    return {
        type: DELETE_SAISON_LOADING
    }
}

//Réponse d'erreur
const deleteSaisonError = error => {
    return {
        type: DELETE_SAISON_ERROR,     
        payload: error
    }
}


//Réponse success
const deleteSaisonSuccess = () => {
    return {
        type: DELETE_SAISON_SUCCESS
    }
}


//En attente de réponse de l'API
const editSaisonLoading = () => {
    return {
        type: UPDATE_SAISON_LOADING
    }
}

//Réponse d'erreur
const editSaisonError = error => {
    return {
        type: UPDATE_SAISON_ERROR,     
        payload: error
    }
}

//Réponse success
const editSaisonSuccess = () => {
    return {
        type: UPDATE_SAISON_SUCCESS
    }
}





//mise à jour de la liste des type tubes
export const refreshAllSaisons = token => {
    return dispatch => {
        dispatch(initSaisons())
        dispatch(getAllSaisons(token))
    }
}



//Dispatch des actions lors de la création d'un saison
export const createSaison = (token, data) => {
    return dispatch => {
        
        const {name, comment, orderable, lowLevel} = data

        dispatch(createSaisonLoading())

        axios.post(
            `${REACT_APP_AGCV_API_URL}/saisons`,
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
            dispatch(createSaisonSuccess())
        })
        .catch(res => {
            dispatch(createSaisonError(res.response.data.message))
        })
        .catch(err => {
            dispatch(createSaisonError(err))
        })

    }
}






//Dispatch des actions lors de l'update d'un saison
export const editSaison = (token, data) => {
    return dispatch => {

        const {anneeDebut, anneeFin, budget, active} = data

        dispatch(editSaisonLoading())

        axios.put(
            `${REACT_APP_AGCV_API_URL}/saisons/${data.id}`,
            {   
                anneeDebut,
                anneeFin,
                budget,
                active
            },
            { headers: { "Authorization": `Bearer ${token}` } }
        )
        .then(() => {
            dispatch(editSaisonSuccess())
        })
        .catch(res => {
            dispatch(editSaisonError(res.response.data.message))
        })
        .catch(err => {
            dispatch(editSaisonError(err))
        })

    }
}





export const deleteSaison = (token, id) => {
    return dispatch => {

        dispatch(deleteSaisonLoading())

        axios.delete(
            `${REACT_APP_AGCV_API_URL}/saisons/${id}`,
            { headers: { "Authorization": `Bearer ${token}` } }
        )
        .then(() => {
            dispatch(deleteSaisonSuccess())
        })
        .catch(res => {
            dispatch(deleteSaisonError(res.response.data.message))
        })
        .catch(err => {
            dispatch(deleteSaisonError(err))
        })

    }
}






export const getAllSaisons = token => {
    return dispatch => {

        dispatch(getSaisonsLoading())

        axios.get(
            `${REACT_APP_AGCV_API_URL}/saisons`,
            { headers: { "Authorization": `Bearer ${token}` } }
        )
        .then(res => {
            const listSaisons = []
            res.data.data.forEach(saison => {
                listSaisons.push({
                    id: saison.id,
                    anneeDebut: saison.anneeDebut,
                    anneeFin: saison.anneeFin,
                    budget: saison.budget,
                    active: saison.active,
                    dateCreation: saison.dateCreation,
                    horodatage: saison.horodatage
                })
            })
            dispatch(getSaisonsSuccess(listSaisons))
        })
        .catch(res => {
            dispatch(getSaisonsError(res.response.data.message))
        })
        .catch(err => {
            dispatch(getSaisonsError(err))
        })

    }
}