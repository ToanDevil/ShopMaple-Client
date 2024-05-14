import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '../redux/slices/counterSlice'
import userReducer from '../redux/slices/userSlice'

export default configureStore({
  reducer: {
    counter: counterReducer,
    user: userReducer
  }
})