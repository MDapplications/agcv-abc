import axios from 'axios'
import {    GET_USERS_LOADING,
            GET_USERS_SUCCESS,
            GET_USERS_ERROR,
            EDIT_USER_LOADING,
            EDIT_USER_ERROR,
            DELETE_USER_LOADING,
            DELETE_USER_ERROR,
            REMOVE_ALL_USERS } from '../Constantes'

const {REACT_APP_AGCV_API_URL} = process.env



//réinitialisation de la liste des utilisateurs
export const initUsers = () => {
    return {
        type: REMOVE_ALL_USERS
    }
}


//En attente de réponse de l'API
const getUsersLoading = () => {
    return {
        type: GET_USERS_LOADING
    }
}

//Réponse reçu
const getUsersSuccess = data => {
    return {
        type: GET_USERS_SUCCESS,     
        payload: data  
    }
}

//Réponse d'erreur
const getUsersError = error => {
    return {
        type: GET_USERS_ERROR,     
        payload: error
    }
}


//En attente de réponse de l'API
const deleteUserLoading = () => {
    return {
        type: DELETE_USER_LOADING
    }
}

//Réponse d'erreur
const deleteUserError = error => {
    return {
        type: DELETE_USER_ERROR,     
        payload: error
    }
}


//En attente de réponse de l'API
const editUserLoading = () => {
    return {
        type: EDIT_USER_LOADING
    }
}

//Réponse d'erreur
const editUserError = error => {
    return {
        type: EDIT_USER_ERROR,     
        payload: error
    }
}




export const editUser = (token, userData) => {
    return dispatch => {

        const username = userData.identifiant
        const {actif, role} = userData

        dispatch(editUserLoading())

        axios.put(
            `${REACT_APP_AGCV_API_URL}/users/${userData.id}`,
            {   
                username, 
                role,
                actif
            },
            { headers: { "Authorization": `Bearer ${token}` } }
        )
        .then(() => {
            dispatch(initUsers())
            dispatch(getAllUsers(token))
        })
        .catch(res => {
            dispatch(editUserError(res.response.data.message))
        })

    }
}





export const deleteUser = (token, id) => {
    return dispatch => {

        dispatch(deleteUserLoading())

        axios.delete(
            `${REACT_APP_AGCV_API_URL}/users/${id}`,
            { headers: { "Authorization": `Bearer ${token}` } }
        )
        .then(() => {
            dispatch(initUsers())
            dispatch(getAllUsers(token))
        })
        .catch(res => {
            dispatch(deleteUserError(res.response.data.message))
        })

    }
}




export const getAllUsers = token => {
    return dispatch => {

        dispatch(getUsersLoading())

        axios.get(
            `${REACT_APP_AGCV_API_URL}/users`,
            { headers: { "Authorization": `Bearer ${token}` } }
        )
        .then(res => {
            //console.log(res)
            const listUsers = []
            res.data.data.forEach(user => {
                listUsers.push({
                    id: user.id,
                    identifiant: user.username,
                    role: user.role,
                    actif: user.actif,
                    dateCreation: user.dateCreation,
                    dateUpdate: user.dateUpdate
                })
            })
            dispatch(getUsersSuccess(listUsers))
        })
        .catch(res => {
            dispatch(getUsersError(res.response.data.message))
        })

    }
}