import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    number: 0
}
export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        updateSizeCart: (state, action) => {
            const {number} = action.payload
            state.number = number;
        },
    }
})

// Action creators are generated for each case reducer function
export const { updateSizeCart } = cartSlice.actions

export default cartSlice.reducer