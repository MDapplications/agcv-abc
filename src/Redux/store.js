import { configureStore } from '@reduxjs/toolkit'
import reducerUser from './reducers/user'
import reducerUsers from './reducers/users'

const store = configureStore({
  reducer: {
    user: reducerUser,
    users: reducerUsers
  }
})


export default store