import axios from 'axios'
import {    GET_MEMBRES_LOADING,
            GET_MEMBRES_SUCCESS,
            GET_MEMBRES_ERROR,
            CREATE_MEMBRE_LOADING,
            CREATE_MEMBRE_ERROR,
            CREATE_MEMBRE_SUCCESS,
            UPDATE_MEMBRE_LOADING,
            UPDATE_MEMBRE_ERROR,
            UPDATE_MEMBRE_SUCCESS,
            DELETE_MEMBRE_LOADING,
            DELETE_MEMBRE_ERROR,
            DELETE_MEMBRE_SUCCESS,
            REMOVE_ALL_MEMBRES} from '../Constantes'

const {REACT_APP_AGCV_API_URL} = process.env



//réinitialisation de la liste des utilisateurs
export const initMembres = () => {
    return {
        type: REMOVE_ALL_MEMBRES
    }
}


//En attente de réponse de l'API
const getMembresLoading = () => {
    return {
        type: GET_MEMBRES_LOADING
    }
}

//Réponse reçu
const getMembresSuccess = data => {
    return {
        type: GET_MEMBRES_SUCCESS,     
        payload: data  
    }
}


//Réponse d'erreur
const getMembresError = error => {
    return {
        type: GET_MEMBRES_ERROR,     
        payload: error
    }
}


//En attente de réponse de l'API
const createMembreLoading = () => {
    return {
        type: CREATE_MEMBRE_LOADING
    }
}

//Réponse d'erreur
const createMembreError = error => {
    return {
        type: CREATE_MEMBRE_ERROR,     
        payload: error
    }
}

//Réponse success
const createMembreSuccess = () => {
    return {
        type: CREATE_MEMBRE_SUCCESS
    }
}


//En attente de réponse de l'API
const deleteMembreLoading = () => {
    return {
        type: DELETE_MEMBRE_LOADING
    }
}

//Réponse d'erreur
const deleteMembreError = error => {
    return {
        type: DELETE_MEMBRE_ERROR,     
        payload: error
    }
}


//Réponse success
const deleteMembreSuccess = () => {
    return {
        type: DELETE_MEMBRE_SUCCESS
    }
}


//En attente de réponse de l'API
const editMembreLoading = () => {
    return {
        type: UPDATE_MEMBRE_LOADING
    }
}

//Réponse d'erreur
const editMembreError = error => {
    return {
        type: UPDATE_MEMBRE_ERROR,     
        payload: error
    }
}

//Réponse success
const editMembreSuccess = () => {
    return {
        type: UPDATE_MEMBRE_SUCCESS
    }
}


//mise à jour de la liste des type tubes
export const refreshAllMembres = (token, actif) => {
    return dispatch => {
        dispatch(initMembres())
        dispatch(getAllMembres(token, actif))
    }
}



//Dispatch des actions lors de la création d'un membre
export const createMembre = (token, data) => {
    return dispatch => {
        
        const {prenom, nom, actif} = data

        dispatch(createMembreLoading())

        axios.post(
            `${REACT_APP_AGCV_API_URL}/membres`,
            {   
                prenom,
                nom,
                actif,
            },
            { headers: { "Authorization": `Bearer ${token}` } }
        )
        .then(() => {
            dispatch(createMembreSuccess())
        })
        .catch(err => {
            try {
                dispatch(createMembreError(err.response.data.message))
            } catch (error) {
                dispatch(createMembreError(err))
            }
        })
    }
}






//Dispatch des actions lors de l'update d'un membre
export const editMembre = (token, data) => {
    return dispatch => {

        const {actif} = data

        dispatch(editMembreLoading())

        axios.put(
            `${REACT_APP_AGCV_API_URL}/membres/${data.id}`,
            { actif },
            { headers: { "Authorization": `Bearer ${token}` } }
        )
        .then(() => {
            dispatch(editMembreSuccess())
        })
        .catch(err => {
            try {
                dispatch(editMembreError(err.response.data.message))
            } catch (error) {
                dispatch(editMembreError(err))
            }
        })
    }
}





export const deleteMembre = (token, id) => {
    return dispatch => {

        dispatch(deleteMembreLoading())

        axios.delete(
            `${REACT_APP_AGCV_API_URL}/membres/${id}`,
            { headers: { "Authorization": `Bearer ${token}` } }
        )
        .then(() => {
            dispatch(deleteMembreSuccess())
        })
        .catch(err => {
            try {
                dispatch(deleteMembreError(err.response.data.message))
            } catch (error) {
                dispatch(deleteMembreError(err))
            }
        })

    }
}






export const getAllMembres = (token, actif) => {
    return dispatch => {

        dispatch(getMembresLoading())
        let optionActif = ''

        if (actif !== undefined) {
            optionActif = `?actif=${actif}`
        }

        axios.get(
            `${REACT_APP_AGCV_API_URL}/membres${optionActif}`,
            { headers: { "Authorization": `Bearer ${token}` } }
        )
        .then(res => {
            const listMembres = []
            res.data.data.forEach(membre => {
                listMembres.push({
                    id: membre.id,
                    prenom: membre.prenom,
                    nom: membre.nom,
                    actif: membre.actif,
                    dateCreation: membre.dateCreation,
                    horodatage: membre.horodatage
                })
            })
            dispatch(getMembresSuccess(listMembres))
        })
        .catch(err => {
            try {
                dispatch(getMembresError(err.response.data.message))
            } catch (error) {
                dispatch(getMembresError(err))
            }
        })

    }
}