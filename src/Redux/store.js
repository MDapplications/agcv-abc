import { configureStore } from '@reduxjs/toolkit'
import reducerPage from './reducers/pages'
import reducerTypetubes from './reducers/typetubes'
import reducerUser from './reducers/user'
import reducerUsers from './reducers/users'
import reducerMembres from './reducers/membres'
import reducerPrixtubes from './reducers/prixtubes'
import reducerSaisons from './reducers/saisons'


const store = configureStore({
  reducer: {
    user: reducerUser,
    users: reducerUsers,
    page: reducerPage,
    typetubes: reducerTypetubes,
    membres: reducerMembres,
    prixtubes: reducerPrixtubes,
    saisons: reducerSaisons,
  }
})


export default store