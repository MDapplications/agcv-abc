import axios from 'axios'
import {    GET_CONSOVOLANTS_LOADING,
            GET_CONSOVOLANTS_SUCCESS,
            GET_CONSOVOLANTS_ERROR,
            CREATE_CONSOVOLANT_LOADING,
            CREATE_CONSOVOLANT_ERROR,
            CREATE_CONSOVOLANT_SUCCESS,
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
const createConsoVolantLoading = () => {
    return {
        type: CREATE_CONSOVOLANT_LOADING
    }
}

//Réponse d'erreur
const createConsoVolantError = error => {
    return {
        type: CREATE_CONSOVOLANT_ERROR,     
        payload: error
    }
}

//Réponse success
const createConsoVolantSuccess = () => {
    return {
        type: CREATE_CONSOVOLANT_SUCCESS
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



//Dispatch des actions lors de la création d'un consovolant
export const createConsoVolant = (token, data) => {
    return dispatch => {
        
        const {stock, idSaison, idTypeTube} = data

        dispatch(createConsoVolantLoading())

        axios.post(
            `${REACT_APP_AGCV_API_URL}/consovolants`,
            {   
                stock, 
                idSaison,
                idTypeTube
            },
            { headers: { "Authorization": `Bearer ${token}` } }
        )
        .then(() => {
            dispatch(createConsoVolantSuccess())
        })
        .catch(res => {
            dispatch(createConsoVolantError(res.response.data.message))
        })
        .catch(err => {
            dispatch(createConsoVolantError(err))
        })

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
        .catch(res => {
            dispatch(editConsoVolantError(res.response.data.message))
        })
        .catch(err => {
            dispatch(editConsoVolantError(err))
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
        .catch(res => {
            dispatch(deleteConsoVolantError(res.response.data.message))
        })
        .catch(err => {
            dispatch(deleteConsoVolantError(err))
        })

    }
}






export const getAllConsoVolants = token => {
    return dispatch => {

        dispatch(getConsoVolantsLoading())

        axios.get(
            `${REACT_APP_AGCV_API_URL}/consovolants`,
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
                    horodatage: consovolant.horodatage
                })
            })
            dispatch(getConsoVolantsSuccess(listConsoVolants))
        })
        .catch(res => {
            dispatch(getConsoVolantsError(res.response.data.message))
        })
        .catch(err => {
            dispatch(getConsoVolantsError(err))
        })

    }
}