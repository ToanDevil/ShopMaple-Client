import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    username: '',
    name: '',
    phone: '',
    email: '',
    sex: '',
    dob: '',
    id: '',
    avatar: '',
    access_token: '',
    isAdmin: false,
}
export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        updateUser: (state, action) => {
            const {username, name='', sex='', dob='', email='',_id, phone, avatar, access_token, isAdmin} = action.payload
            // console.log('action',action)
            state.username = username || 'User';
            state.email = email;
            state.name = name;
            state.sex = sex;
            state.phone = '0'+ phone || '';
            state.dob = dob;
            state.id = _id;
            state.avatar = avatar;
            state.access_token = access_token !== undefined ? access_token : state.access_token;
            state.isAdmin = isAdmin
        },
        resetUser: (state, action) => {
            state.username = '';
            state.email = '';
            state.name = '';
            state.sex = '';
            state.phone = '';
            state.dob = '';
            state.id = '';
            state.avatar = '';
            state.access_token = '';
            state.isAdmin = false
        }
    }
})

// Action creators are generated for each case reducer function
export const { updateUser, resetUser } = userSlice.actions

export default userSlice.reducer