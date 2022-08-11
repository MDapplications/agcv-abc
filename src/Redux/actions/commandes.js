import axios from 'axios'
import {    GET_COMMANDES_LOADING,
            GET_COMMANDES_SUCCESS,
            GET_COMMANDES_ERROR,
            CREATE_COMMANDE_LOADING,
            CREATE_COMMANDE_ERROR,
            CREATE_COMMANDE_SUCCESS,
            UPDATE_COMMANDE_LOADING,
            UPDATE_COMMANDE_ERROR,
            UPDATE_COMMANDE_SUCCESS,
            DELETE_COMMANDE_LOADING,
            DELETE_COMMANDE_ERROR,
            DELETE_COMMANDE_SUCCESS,
            REMOVE_ALL_COMMANDES} from '../Constantes'

const {REACT_APP_AGCV_API_URL} = process.env


//réinitialisation de la liste des utilisateurs
export const initCommandes = () => {
    return {
        type: REMOVE_ALL_COMMANDES
    }
}


//En attente de réponse de l'API
const getCommandesLoading = () => {
    return {
        type: GET_COMMANDES_LOADING
    }
}

//Réponse reçu
const getCommandesSuccess = data => {
    return {
        type: GET_COMMANDES_SUCCESS,     
        payload: data  
    }
}


//Réponse d'erreur
const getCommandesError = error => {
    return {
        type: GET_COMMANDES_ERROR,     
        payload: error
    }
}


//En attente de réponse de l'API
const createCommandeLoading = () => {
    return {
        type: CREATE_COMMANDE_LOADING
    }
}

//Réponse d'erreur
const createCommandeError = error => {
    return {
        type: CREATE_COMMANDE_ERROR,     
        payload: error
    }
}

//Réponse success
const createCommandeSuccess = () => {
    return {
        type: CREATE_COMMANDE_SUCCESS
    }
}


//En attente de réponse de l'API
const deleteCommandeLoading = () => {
    return {
        type: DELETE_COMMANDE_LOADING
    }
}

//Réponse d'erreur
const deleteCommandeError = error => {
    return {
        type: DELETE_COMMANDE_ERROR,     
        payload: error
    }
}


//Réponse success
const deleteCommandeSuccess = () => {
    return {
        type: DELETE_COMMANDE_SUCCESS
    }
}


//En attente de réponse de l'API
const editCommandeLoading = () => {
    return {
        type: UPDATE_COMMANDE_LOADING
    }
}

//Réponse d'erreur
const editCommandeError = error => {
    return {
        type: UPDATE_COMMANDE_ERROR,     
        payload: error
    }
}

//Réponse success
const editCommandeSuccess = () => {
    return {
        type: UPDATE_COMMANDE_SUCCESS
    }
}





//mise à jour de la liste des type tubes
export const refreshAllCommandes = (token, idSaison) => {
    return dispatch => {
        dispatch(initCommandes())
        dispatch(getAllCommandes(token, idSaison))
    }
}



//Dispatch des actions lors de la création d'un commande
export const createCommande = (token, data) => {
    return dispatch => {
        
        const {nbTubesOrdered, status, idSaison, idConsoMois, idPrixTube, idMembre} = data

        dispatch(createCommandeLoading())

        axios.post(
            `${REACT_APP_AGCV_API_URL}/commandes`,
            {   
                nbTubesOrdered,
                status,
                idSaison,
                idConsoMois,
                idPrixTube,
                idMembre
            },
            { headers: { "Authorization": `Bearer ${token}` } }
        )
        .then(() => {
            dispatch(createCommandeSuccess())
        })
        .catch(err => {
            try {
                dispatch(createCommandeError(err.response.data.message))
            } catch (error) {
                dispatch(createCommandeError(err))
            }
        })

    }
}






//Dispatch des actions lors de l'update d'un commande
export const editCommande = (token, data) => {
    return dispatch => {

        const {nbTubesOrdered, status} = data

        dispatch(editCommandeLoading())

        axios.put(
            `${REACT_APP_AGCV_API_URL}/commandes/${data.id}`,
            {   
                nbTubesOrdered,
                status,
            },
            { headers: { "Authorization": `Bearer ${token}` } }
        )
        .then(() => {
            dispatch(editCommandeSuccess())
        })
        .catch(err => {
            try {
                dispatch(editCommandeError(err.response.data.message))
            } catch (error) {
                dispatch(editCommandeError(err))
            }
        })

    }
}





export const deleteCommande = (token, id) => {
    return dispatch => {

        dispatch(deleteCommandeLoading())

        axios.delete(
            `${REACT_APP_AGCV_API_URL}/commandes/${id}`,
            { headers: { "Authorization": `Bearer ${token}` } }
        )
        .then(() => {
            dispatch(deleteCommandeSuccess())
        })
        .catch(err => {
            try {
                dispatch(deleteCommandeError(err.response.data.message))
            } catch (error) {
                dispatch(deleteCommandeError(err))
            }
        })
    }
}



export const getAllCommandes = (token, idSaison) => {
    return dispatch => {

        dispatch(getCommandesLoading())

        axios.get(
            `${REACT_APP_AGCV_API_URL}/commandes?idSaison=${idSaison}`,
            { headers: { "Authorization": `Bearer ${token}` } }
        )
        .then(res => {
            const listCommandes = []
            res.data.data.forEach(commande => {
                listCommandes.push(commande)
            })
            dispatch(getCommandesSuccess(listCommandes))
        })
        .catch(err => {
            try {
                dispatch(getCommandesError(err.response.data.message))
            } catch (error) {
                dispatch(getCommandesError(err))
            }
        })

    }
}