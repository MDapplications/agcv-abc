import axios from 'axios'
import {    GET_USER_LOADING, 
            GET_USER_SUCCESS, 
            GET_USER_ERROR,
            CHANGE_PASSWORD_USER_LOADING,
            CHANGE_PASSWORD_USER_SUCCESS,
            CHANGE_PASSWORD_USER_ERROR,
            INIT_USER } from '../Constantes'

const {REACT_APP_AGCV_API_URL} = process.env


const getUserLoading = () => {
    return {
        type: GET_USER_LOADING
    }
}

const getUserSuccess = data => {
    return {
        type: GET_USER_SUCCESS,
        payload: data
    }
}

const getUserError = error => {
    return {
        type: GET_USER_ERROR,
        payload: error
    }
}

const changePasswordLoading = () => {
    return {
        type: CHANGE_PASSWORD_USER_LOADING
    }
}

const changePasswordSuccess = () => {
    return {
        type: CHANGE_PASSWORD_USER_SUCCESS
    }
}

const changePasswordError = error => {
    return {
        type: CHANGE_PASSWORD_USER_ERROR,
        payload: error
    }
}

export const initUser = () => {
    return {
        type: INIT_USER
    }
}



export const getUser = data => {
    return dispatch => {

        dispatch(getUserLoading())

        const {username, password} = data

        axios.post(
            `${REACT_APP_AGCV_API_URL}/login`,
            {   
                username, 
                password
            },
            { headers: { "Content-Type": "application/json" } }
        )
        .then(res => {
            const dataUser = {
                id: res.data.data.id,
                username: res.data.data.username,
                role: res.data.data.role,
                token: res.data.token
            }
            dispatch(getUserSuccess(dataUser))
        })
        .catch(err => {
            dispatch(getUserError(err))
        })

    }
}


export const changePassword = (token, data) => {
    return dispatch => {
        dispatch(changePasswordLoading())

        const {id, password, newPassword} = data

        axios.put(
            `${REACT_APP_AGCV_API_URL}/users/${id}`,
            {
                password,
                newPassword
            },
            { headers: { "Authorization": `Bearer ${token}` } }
        )
        .then(res => {
            console.log(res.data.message)
            dispatch(changePasswordSuccess())
        })
        .catch(err => {
            try {
                dispatch(changePasswordError(err.response.data.message))
            } catch (error) {
                dispatch(changePasswordError(err))
            }
        })
    }
}