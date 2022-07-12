import {    
    GET_PAGE,
    INIT_PAGE } from '../Constantes'


export const getPage = pageName => {
    return {
        type: GET_PAGE,
        payload: pageName
    }
}


export const initPage = () => {
    return {
        type: INIT_PAGE
    }
}