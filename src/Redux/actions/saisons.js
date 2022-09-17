import axios from 'axios'
import {    GET_SAISONS_LOADING,
            GET_SAISONS_SUCCESS,
            GET_SAISONS_ERROR,
            GET_SAISON_LOADING,
            GET_SAISON_SUCCESS,
            GET_SAISON_ERROR,
            GET_SAISON_ACTIVE_LOADING,
            GET_SAISON_ACTIVE_SUCCESS,
            GET_SAISON_ACTIVE_ERROR,
            CREATE_SAISON_LOADING,
            CREATE_SAISON_ERROR,
            CREATE_SAISON_SUCCESS,
            CREATE_SAISON_CONSOVOLANT_ERROR,
            CREATE_SAISON_CONSOMOIS_ERROR,
            UPDATE_SAISON_LOADING,
            UPDATE_SAISON_ERROR,
            UPDATE_SAISON_SUCCESS,
            DELETE_SAISON_LOADING,
            DELETE_SAISON_ERROR,
            DELETE_SAISON_SUCCESS,
            TRANSFER_SAISON_LOADING,
            TRANSFER_SAISON_SUCCESS,
            TRANSFER_SAISON_ERROR,
            REMOVE_SAISON_ACTIVE,
            REMOVE_ALL_SAISONS} from '../Constantes'

const {REACT_APP_AGCV_API_URL} = process.env
const listMois = ['Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre', 'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin']



//réinitialisation de la liste des saisons
export const initSaisons = () => {
    return {
        type: REMOVE_ALL_SAISONS
    }
}

//réinitialisation de la saison active
export const initSaisonActive = () => {
    return {
        type: REMOVE_SAISON_ACTIVE
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
const getSaisonLoading = () => {
    return {
        type: GET_SAISON_LOADING
    }
}

//Réponse reçu
const getSaisonSuccess = data => {
    return {
        type: GET_SAISON_SUCCESS,     
        payload: data  
    }
}


//Réponse d'erreur
const getSaisonError = error => {
    return {
        type: GET_SAISON_ERROR,     
        payload: error
    }
}

//En attente de réponse de l'API
const getSaisonActiveLoading = () => {
    return {
        type: GET_SAISON_ACTIVE_LOADING
    }
}

//Réponse reçu
const getSaisonActiveSuccess = data => {
    return {
        type: GET_SAISON_ACTIVE_SUCCESS,     
        payload: data  
    }
}

//Réponse d'erreur
const getSaisonActiveError = error => {
    return {
        type: GET_SAISON_ACTIVE_ERROR,     
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


//Réponse d'erreur
const createConsoVolantError = error => {
    return {
        type: CREATE_SAISON_CONSOVOLANT_ERROR,     
        payload: error
    }
}

//Réponse d'erreur
const createConsoMoisError = error => {
    return {
        type: CREATE_SAISON_CONSOMOIS_ERROR,     
        payload: error
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


//En attente de réponse de l'API
const transferSaisonLoading = () => {
    return {
        type: TRANSFER_SAISON_LOADING
    }
}

//Réponse reçu
const transferSaisonSuccess = () => {
    return {
        type: TRANSFER_SAISON_SUCCESS
    }
}


//Réponse d'erreur
const transferSaisonError = error => {
    return {
        type: TRANSFER_SAISON_ERROR,     
        payload: error
    }
}




//mise à jour de la liste des type tubes
export const refreshAllSaisons = token => {
    return dispatch => {
        dispatch(initSaisons())
        dispatch(getAllSaisons(token))
    }
}



//Dispatch des actions lors de la création d'un consomois
const createStock = (token, data) => {
    return dispatch => {
        axios.post(
            `${REACT_APP_AGCV_API_URL}/stocks`, data,
            { headers: { "Authorization": `Bearer ${token}` } }
        )
        .then(res => {
            console.log(res.data.message)
        })
        .catch(err => {
            try {
                dispatch(createConsoVolantError(err.response.data.message))
            } catch (error) {
                dispatch(createConsoVolantError(err))
            }
        })
    }
}




//Dispatch des actions lors de la création d'un consomois
const createConsoMois = (token, data) => {
    return dispatch => {
        
        const {name, nbTubesUsed, nbTubesOrdered, idConsoVolant, idPrixTube} = data

        axios.post(
            `${REACT_APP_AGCV_API_URL}/consomois`,
            {   
                name,
                nbTubesUsed,
                nbTubesOrdered,
                idConsoVolant,
                idPrixTube,
            },
            { headers: { "Authorization": `Bearer ${token}` } }
        )
        .catch(err => {
            try {
                dispatch(createConsoMoisError(err.response.data.message))
            } catch (error) {
                dispatch(createConsoMoisError(err))
            }
        })

    }
}





//Dispatch des actions lors de la création d'un consovolant
export const createConsoVolant = (token, data, options) => {
    return dispatch => {
        
        const {typeTubeName} = options
        const {stock, idSaison, idTypeTube} = data

        axios.post(
            `${REACT_APP_AGCV_API_URL}/consovolants`,
            {   
                stock, 
                idSaison,
                idTypeTube
            },
            { headers: { "Authorization": `Bearer ${token}` } }
        )
        .then(res => {
            const idConsoVolant = res.data.data.id
            listMois.forEach(mois => {
                const consoMoisData = {
                    name: mois,
                    nbTubesUsed: 0,
                    nbTubesOrdered: 0,
                    idConsoVolant,
                    idPrixTube: 0
                }
                dispatch(createConsoMois(token, consoMoisData))
            })
            if (typeTubeName === 'Compétition') {
                dispatch(createStock(token,{
                    value: 0,
                    idSaison,
                    idTypeTube
                }))
            }
        })
        .catch(err => {
            try {
                dispatch(createConsoVolantError(err.response.data.message))
            } catch (error) {
                dispatch(createConsoVolantError(err))
            }
        })
    }
}


export const disableSaisonActive = (token, idSaison) => {
    return dispatch => {
        axios.get(
            `${REACT_APP_AGCV_API_URL}/saisons?active=true`,
            { headers: { "Authorization": `Bearer ${token}` } }
        )
        .then(res => {
            const saisonActive = res.data.data.filter(saison => saison.id !== idSaison)
            try {
                saisonActive.forEach(saison => {
                    axios.put(
                        `${REACT_APP_AGCV_API_URL}/saisons/${saison.id}`,
                        {active: false},
                        { headers: { "Authorization": `Bearer ${token}` } }
                    )
                    .then(res => {
                        console.log(res.data.message)
                    })
                })
            } catch (error) {
                dispatch(createSaisonError('Impossible de désactiver la saison active !'))
            } finally {
                dispatch(createSaisonSuccess())
            }
        })
    }
}


//Dispatch des actions lors de la création d'un saison
export const createSaison = (token, data, typetubes) => {
    return dispatch => {
        
        const {anneeDebut, anneeFin, budget, active} = data

        dispatch(createSaisonLoading())

        axios.post(
            `${REACT_APP_AGCV_API_URL}/saisons`,
            {   
                anneeDebut, 
                anneeFin,
                budget,
                active
            },
            { headers: { "Authorization": `Bearer ${token}` } }
        )
        .then(res => {
            const idSaison = res.data.data.id
            try { 
                typetubes.forEach(typetube => {
                    const options = {typeTubeName: typetube.name}
                    const dataConsoVolant = {
                        stock: 0,
                        idSaison,
                        idTypeTube: typetube.id
                    }
                    dispatch(createConsoVolant(token, dataConsoVolant, options))
                })
            } catch (error) {
                dispatch(createSaisonError('Impossible de créer les consommations de volant lié à cette nouvelle saison.'))
            } finally {
                dispatch(disableSaisonActive(token, idSaison))
            }
        })
        .catch(err => {
            try {
                dispatch(createSaisonError(err.response.data.message))
            } catch (error) {
                dispatch(createSaisonError(err))
            }
        })
    }
}






//Dispatch des actions lors de l'update d'un saison
export const editSaison = (token, data) => {
    return dispatch => {

        const {budget, active} = data

        dispatch(editSaisonLoading())

        axios.put(
            `${REACT_APP_AGCV_API_URL}/saisons/${data.id}`,
            {   
                budget,
                active
            },
            { headers: { "Authorization": `Bearer ${token}` } }
        )
        .then(() => {
            dispatch(editSaisonSuccess())
        })
        .catch(err => {
            try {
                dispatch(editSaisonError(err.response.data.message))
            } catch (error) {
                dispatch(editSaisonError(err))
            }
        })
    }
}





export const deleteSaison = (token, data) => {
    return dispatch => {

        dispatch(deleteSaisonLoading())

        axios.delete(
            `${REACT_APP_AGCV_API_URL}/saisons/${data.id}`,
            { headers: { "Authorization": `Bearer ${token}` } }
        )
        .then(_ => {
            try {
                data.Stocks.forEach(stock => {
                    console.log('DELETE STOCK : ', stock.id)
                    axios.delete(
                        `${REACT_APP_AGCV_API_URL}/stocks/${stock.id}`,
                        { headers: { "Authorization": `Bearer ${token}` } }
                    )
                    .catch(err => {
                        console.log(err.response.data.message)
                    })
                })
                data.ConsoVolants.forEach(consovolant => {
                    consovolant.ConsoMois.forEach(consomois => 
                        axios.delete(
                            `${REACT_APP_AGCV_API_URL}/consomois/${consomois.id}`,
                            { headers: { "Authorization": `Bearer ${token}` } }
                        )
                    )
                    axios.delete(
                        `${REACT_APP_AGCV_API_URL}/consovolants/${consovolant.id}`,
                        { headers: { "Authorization": `Bearer ${token}` } }
                    )               
                })
            } catch (error) {} 
            finally {
                dispatch(deleteSaisonSuccess())
            }
                        
        })
        .catch(err => {
            try {
                dispatch(deleteSaisonError(err.response.data.message))
            } catch (error) {
                dispatch(deleteSaisonError(err))
            } 
        })
    }
}



export const getSaisonActive = token => {
    return dispatch => {

        dispatch(getSaisonActiveLoading())

        axios.get(
            `${REACT_APP_AGCV_API_URL}/saisons?active=true`,
            { headers: { "Authorization": `Bearer ${token}` } }
        )
        .then(res => {
            const saisonActive = []
            res.data.data.forEach(saison => {
                const listConsoVolants = []
                saison.ConsoVolants.forEach(consovolant => {
                    listConsoVolants.push({...consovolant,
                        ConsoMois: consovolant.ConsoMois.sort((a, b) => listMois.indexOf(a.name) - listMois.indexOf(b.name)),
                    })
                })
                saison.ConsoVolants = listConsoVolants.sort((a, b) => a.id - b.id)
                saisonActive.push(saison)
            })
            dispatch(getSaisonActiveSuccess(saisonActive[0]))
        })
        .catch(err => {
            try {
                dispatch(getSaisonActiveError(err.response.data.message))
            } catch (error) {
                dispatch(getSaisonActiveError(err))
            } 
        })

    }
}

export const getSaison = (token, id) => {
    return dispatch => {

        dispatch(getSaisonLoading())
        console.log('getSaisonLoading')

        axios.get(
            `${REACT_APP_AGCV_API_URL}/saisons/${id}`,
            { headers: { "Authorization": `Bearer ${token}` } }
        )
        .then(res => {
            console.log('getSaisonThen')
            const saison = res.data.data
                const listConsoVolants = []
                saison.ConsoVolants.forEach(consovolant => {
                    listConsoVolants.push({...consovolant,
                        ConsoMois: consovolant.ConsoMois.sort((a, b) => listMois.indexOf(a.name) - listMois.indexOf(b.name)),
                    })
                })
                saison.ConsoVolants = listConsoVolants.sort((a, b) => a.id - b.id)
            dispatch(getSaisonSuccess(saison))
        })
        .catch(err => {
            console.log('getSaison - ERROR !!')
            try {
                dispatch(getSaisonError(err.response.data.message))
            } catch (error) {
                dispatch(getSaisonError(err))
            } 
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
                listSaisons.push(saison)
            })
            dispatch(getSaisonsSuccess(listSaisons))
        })
        .catch(err => {
            try {
                dispatch(getSaisonsError(err.response.data.message))
            } catch (error) {
                dispatch(getSaisonsError(err))
            } 
        })
    }
}



export const transferSaison = (token, saisonActive, saisonData) => {
    return dispatch => {
        dispatch(transferSaisonLoading())

        //calcul du stock initial de la nouvelle saison en récupérant les infos de l'ancienne (saisonData)
        saisonData.ConsoVolants.forEach(consovolant => {
            const idConsoVolant = consovolant.id
            const idTypeTube = consovolant.TypeTube.id
            const typetubeName = consovolant.TypeTube.name
            const calculConsoVolant = consovolant.ConsoMois.reduce((prevValue, data) => {
                if (data.PrixTube !== null) {
                    return {
                        nbUsed: prevValue.nbUsed + data.nbTubesUsed,
                        nbOrdered:  prevValue.nbOrdered + data.nbTubesOrdered,
                    }
                } else {
                    return {
                        nbUsed: prevValue.nbUsed + data.nbTubesUsed,
                        nbOrdered:  prevValue.nbOrdered + data.nbTubesOrdered,
                    }
                }
            }, {nbUsed:0, nbOrdered: 0})

            let stock = consovolant.stock - calculConsoVolant.nbUsed + calculConsoVolant.nbOrdered
            
            if (typetubeName === 'Compétition') {
                //Commandes
                saisonData.Commandes.forEach(commande => {
                    if (idConsoVolant === commande.ConsoMoi.idConsoVolant) {
                        stock = stock - commande.nbTubesOrdered
                    }
                })

                //Restocks
                const dataStock = saisonData.Stocks.find(data => idTypeTube === data.idTypeTube)
                dataStock.Restocks.forEach(restock => stock = stock - restock.value)
            }
            
            //mise à jour du stock du consovolant
            const dataConsoVolant = saisonActive.ConsoVolants.find(data => data.idTypeTube === idTypeTube)
            axios.put(
                `${REACT_APP_AGCV_API_URL}/consovolants/${dataConsoVolant.id}`,
                { stock },
                { headers: { "Authorization": `Bearer ${token}` } }
            )
            .catch(err => {
                try {
                    dispatch(transferSaisonError(err.response.data.message))
                } catch(error) {
                    dispatch(transferSaisonError(err))
                }
            })
        })


        //Récupération de la valeurs des stock pour compétitions
        saisonData.Stocks.forEach(stock => {
            const idTypeTube = stock.idTypeTube

            let stockValue = stock.value
            if (stock.Competitions.length > 0) {
                stockValue = stockValue - stock.Competitions.reduce((prevValue, competition) => {
                    return prevValue + competition.nbTubesUsed
                }, 0)
            }
            if (stock.Restocks.length > 0) {
                stockValue = stockValue + stock.Restocks.reduce((prevValue, restock) => {
                    return prevValue + restock.value
                }, 0)
            }

            //mise à jour du stock du consovolant
            const dataStock = saisonActive.Stocks.find(data => data.idTypeTube === idTypeTube)
            axios.put(
                `${REACT_APP_AGCV_API_URL}/stocks/${dataStock.id}`,
                { value: stockValue },
                { headers: { "Authorization": `Bearer ${token}` } }
            )
            .catch(err => {
                try {
                    dispatch(transferSaisonError(err.response.data.message))
                } catch(error) {
                    dispatch(transferSaisonError(err))
                }
            })
        })

        dispatch(transferSaisonSuccess())

    }
}