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
import reducerStock from './reducers/stocks'
import reducerCommandes from './reducers/commandes'


const store = configureStore({
  reducer: {
    user: reducerUser,
    users: reducerUsers,
    page: reducerPage,
    typetubes: reducerTypetubes,
    membres: reducerMembres,
    prixtubes: reducerPrixtubes,
    saisons: reducerSaisons,
    consovolants: reducerConsoVolants,
    consomois: reducerConsoMois,
    stocks: reducerStock,
    commandes: reducerCommandes,
  }
})


export default store