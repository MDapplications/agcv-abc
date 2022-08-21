import { configureStore } from '@reduxjs/toolkit'
import reducerPage from './reducers/pages'
import reducerTypetubes from './reducers/typetubes'
import reducerUser from './reducers/user'
import reducerUsers from './reducers/users'
import reducerMembres from './reducers/membres'
import reducerPrixtubes from './reducers/prixtubes'
import reducerSaisons from './reducers/saisons'
import reducerConsoVolants from './reducers/consovolants'
import reducerConsoMois from './reducers/consomois'
import reducerRestocks from './reducers/restocks'
import reducerStock from './reducers/stocks'
import reducerCommandes from './reducers/commandes'
import reducerCompetitions from './reducers/competitions'


const store = configureStore({
  reducer: {
    user: reducerUser,
    users: reducerUsers,
    page: reducerPage,
    typetubes: reducerTypetubes,
    membres: reducerMembres,
    prixtubes: reducerPrixtubes,
    restocks: reducerRestocks,
    saisons: reducerSaisons,
    consovolants: reducerConsoVolants,
    consomois: reducerConsoMois,
    stocks: reducerStock,
    commandes: reducerCommandes,
    competitions: reducerCompetitions,
  }
})


export default store