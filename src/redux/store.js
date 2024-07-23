import { configureStore } from '@reduxjs/toolkit'
import userReducer from '../redux/slices/userSlice'

export default configureStore({
  reducer: {
    user: userReducer
  }
})