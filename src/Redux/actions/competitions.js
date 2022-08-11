import axios from 'axios'
import {    GET_COMPETITIONS_LOADING,
            GET_COMPETITIONS_SUCCESS,
            GET_COMPETITIONS_ERROR,
            CREATE_COMPETITION_LOADING,
            CREATE_COMPETITION_ERROR,
            CREATE_COMPETITION_SUCCESS,
            UPDATE_COMPETITION_LOADING,
            UPDATE_COMPETITION_ERROR,
            UPDATE_COMPETITION_SUCCESS,
            DELETE_COMPETITION_LOADING,
            DELETE_COMPETITION_ERROR,
            DELETE_COMPETITION_SUCCESS,
            REMOVE_ALL_COMPETITIONS} from '../Constantes'

const {REACT_APP_AGCV_API_URL} = process.env



//réinitialisation de la liste des utilisateurs
export const initCompetitions = () => {
    return {
        type: REMOVE_ALL_COMPETITIONS
    }
}


//En attente de réponse de l'API
const getCompetitionsLoading = () => {
    return {
        type: GET_COMPETITIONS_LOADING
    }
}

//Réponse reçu
const getCompetitionsSuccess = data => {
    return {
        type: GET_COMPETITIONS_SUCCESS,     
        payload: data  
    }
}


//Réponse d'erreur
const getCompetitionsError = error => {
    return {
        type: GET_COMPETITIONS_ERROR,     
        payload: error
    }
}


//En attente de réponse de l'API
const createCompetitionLoading = () => {
    return {
        type: CREATE_COMPETITION_LOADING
    }
}

//Réponse d'erreur
const createCompetitionError = error => {
    return {
        type: CREATE_COMPETITION_ERROR,     
        payload: error
    }
}

//Réponse success
const createCompetitionSuccess = () => {
    return {
        type: CREATE_COMPETITION_SUCCESS
    }
}


//En attente de réponse de l'API
const deleteCompetitionLoading = () => {
    return {
        type: DELETE_COMPETITION_LOADING
    }
}

//Réponse d'erreur
const deleteCompetitionError = error => {
    return {
        type: DELETE_COMPETITION_ERROR,     
        payload: error
    }
}


//Réponse success
const deleteCompetitionSuccess = () => {
    return {
        type: DELETE_COMPETITION_SUCCESS
    }
}


//En attente de réponse de l'API
const editCompetitionLoading = () => {
    return {
        type: UPDATE_COMPETITION_LOADING
    }
}

//Réponse d'erreur
const editCompetitionError = error => {
    return {
        type: UPDATE_COMPETITION_ERROR,     
        payload: error
    }
}

//Réponse success
const editCompetitionSuccess = () => {
    return {
        type: UPDATE_COMPETITION_SUCCESS
    }
}





//mise à jour de la liste des type tubes
export const refreshAllCompetitions = token => {
    return dispatch => {
        dispatch(initCompetitions())
        dispatch(getAllCompetitions(token))
    }
}



//Dispatch des actions lors de la création d'un competition
export const createCompetition = (token, data) => {
    return dispatch => {
        
        const {name, nbTubesUsed, idSaison, idTypeTube} = data

        dispatch(createCompetitionLoading())

        axios.post(
            `${REACT_APP_AGCV_API_URL}/competitions`,
            {   
                name,
                nbTubesUsed,
                idSaison,
                idTypeTube,
            },
            { headers: { "Authorization": `Bearer ${token}` } }
        )
        .then(() => {
            dispatch(createCompetitionSuccess())
        })
        .catch(err => {
            if (err.response.data.message !== undefined) {
                dispatch(createCompetitionError(err.response.data.message))
            } else {
                dispatch(createCompetitionError(err))
            }
        })

    }
}






//Dispatch des actions lors de l'update d'un competition
export const editCompetition = (token, data) => {
    return dispatch => {

        const {nbTubesUsed} = data

        dispatch(editCompetitionLoading())

        axios.put(
            `${REACT_APP_AGCV_API_URL}/competitions/${data.id}`,
            { nbTubesUsed },
            { headers: { "Authorization": `Bearer ${token}` } }
        )
        .then(() => {
            dispatch(editCompetitionSuccess())
        })
        .catch(err => {
            if (err.response.data.message !== undefined) {
                dispatch(editCompetitionError(err.response.data.message))
            } else {
                dispatch(editCompetitionError(err))
            }
        })

    }
}





export const deleteCompetition = (token, id) => {
    return dispatch => {

        dispatch(deleteCompetitionLoading())

        axios.delete(
            `${REACT_APP_AGCV_API_URL}/competitions/${id}`,
            { headers: { "Authorization": `Bearer ${token}` } }
        )
        .then(() => {
            dispatch(deleteCompetitionSuccess())
        })
        .catch(err => {
            if (err.response.data.message !== undefined) {
                dispatch(deleteCompetitionError(err.response.data.message))
            } else {
                dispatch(deleteCompetitionError(err))
            }
        })

    }
}






export const getAllCompetitions = token => {
    return dispatch => {

        dispatch(getCompetitionsLoading())

        axios.get(
            `${REACT_APP_AGCV_API_URL}/competitions`,
            { headers: { "Authorization": `Bearer ${token}` } }
        )
        .then(res => {
            const listCompetitions = []
            res.data.data.forEach(competition => {
                listCompetitions.push({
                    id: competition.id,
                    name: competition.name,
                    nbTubesUsed: competition.nbTubesUsed,
                    idSaison: competition.idSaison,
                    idTypeTube: competition.idTypeTube,
                    dateCreation: competition.dateCreation,
                    horodatage: competition.horodatage
                })
            })
            dispatch(getCompetitionsSuccess(listCompetitions))
        })
        .catch(err => {
            if (err.response.data.message !== undefined) {
                dispatch(getCompetitionsError(err.response.data.message))
            } else {
                dispatch(getCompetitionsError(err))
            }
        })
    }
}