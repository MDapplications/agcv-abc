import axios from 'axios'
import {    GET_RESTOCKS_LOADING,
            GET_RESTOCKS_SUCCESS,
            GET_RESTOCKS_ERROR,
            CREATE_RESTOCK_LOADING,
            CREATE_RESTOCK_SUCCESS,
            CREATE_RESTOCK_ERROR,
            REMOVE_ALL_RESTOCKS} from '../Constantes'

const {REACT_APP_AGCV_API_URL} = process.env

//réinitialisation de la liste des utilisateurs
export const initRestocks = () => {
    return {
        type: REMOVE_ALL_RESTOCKS
    }
}


//En attente de réponse de l'API
const getRestocksLoading = () => {
    return {
        type: GET_RESTOCKS_LOADING
    }
}

//Réponse reçu
const getRestocksSuccess = data => {
    return {
        type: GET_RESTOCKS_SUCCESS,     
        payload: data  
    }
}


//Réponse d'erreur
const getRestocksError = error => {
    return {
        type: GET_RESTOCKS_ERROR,     
        payload: error
    }
}


//En attente de réponse de l'API
const createRestockLoading = () => {
    return {
        type: CREATE_RESTOCK_LOADING
    }
}

//Réponse d'erreur
const createRestockError = error => {
    return {
        type: CREATE_RESTOCK_ERROR,     
        payload: error
    }
}

//Réponse success
const createRestockSuccess = () => {
    return {
        type: CREATE_RESTOCK_SUCCESS
    }
}



//mise à jour de la liste des prix tubes
export const refreshAllRestocks = (token, idSaison) => {
    return dispatch => {
        dispatch(initRestocks())
        dispatch(getAllRestocks(token, idSaison))
    }
}


//Dispatch des actions lors de la création d'un restock
export const createRestock = (token, data) => {
    return dispatch => {
        
        const {value, idSaison, idConsoMois, idStock, idTypeTube} = data

        dispatch(createRestockLoading())

        axios.post(
            `${REACT_APP_AGCV_API_URL}/restocks`,
            {   
                value,
                idConsoMois,
                idSaison,
                idStock,
                idTypeTube,
            },
            { headers: { "Authorization": `Bearer ${token}` } }
        )
        .then(() => {
            dispatch(createRestockSuccess())
        })
        .catch(err => {
            try {
                dispatch(createRestockError(err.response.data.message))
            } catch(error) {
                dispatch(createRestockError(err))
            }
        })

    }
}



//Dispatch des actions lors de la récupérations des restocks
export const getAllRestocks = (token, idSaison) => {
    return dispatch => {
        dispatch(getRestocksLoading())

        axios.get(
            `${REACT_APP_AGCV_API_URL}/restocks?idSaison=${idSaison}`,
            { headers: { "Authorization": `Bearer ${token}` } }
        )
        .then(res => {
            const listRestocks = []
            res.data.data.forEach(restock => {
                listRestocks.push(restock)
            })
            dispatch(getRestocksSuccess(listRestocks))
        })
        .catch(err => {
            try {
                dispatch(getRestocksError(err.response.data.message))
            } catch(error) {
                dispatch(getRestocksError(err))
            }
        })
    }
}