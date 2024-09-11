import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    items: [],
    shippingAddress: {}, 
    orderPrice: 0,
    shippingPrice: 0,
    taxPrice: 0,
    totalPrice: 0,
    user: '',
}
export const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        addOrder: (state, action) => {
            const { items, orderPrice, shippingPrice, taxPrice, totalPrice } = action.payload;
            state.items = items || []
            state.orderPrice = orderPrice
            state.totalPrice = totalPrice
            state.shippingPrice = shippingPrice
            state.taxPrice = taxPrice
        },
    }
})

// Action creators are generated for each case reducer function
export const { addOrder } = orderSlice.actions    

export default orderSlice.reducer