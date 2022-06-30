import {    GET_USER,
            INIT_USER } from '../Constantes'


//Action: chargement de la commande dans le reducer
export const getUser = user => {
    return {
        type: GET_USER,
        payload: user
    }
}

//Action: chargement de la commande dans le reducer
export const initUser = () => {
    return {
        type: INIT_USER
    }
}