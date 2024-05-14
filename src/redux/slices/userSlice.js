import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    username: '',
    phone: '',
    access_token: ''
}
export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        updateUser: (state, action) => {
            const {username, phone, access_token} = action.payload
            console.log('action',action)
            state.username = username || phone;
            state.phone = phone;
            state.access_token = access_token
        }
    }
})

// Action creators are generated for each case reducer function
export const { updateUser } = userSlice.actions

export default userSlice.reducer