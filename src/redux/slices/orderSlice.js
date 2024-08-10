import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    orderItems: [],
    shippingAddress: {},
    paymentMethod: '',
    orderPrice: 0,
    shippingPrice: 0,
    taxPrice: 0,
    totalPrice: 0,
    user: '',
    isPaid: '',
    paidAt: '',
    isDelivered: '',
    deliveredAt: '',
}
export const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        addOrder: (state, action) => {
            const { orderItem } = action.payload;
            const existingItem = state.orderItems.find((item) => item.product === orderItem.product);
            if (existingItem) {
                existingItem.amount += orderItem.amount;
            } else {
                state.orderItems.push(orderItem);
            }
        },
        removeOrder: (state, action) => {
            const { idProduct } = action.payload;
            state.orderItems = state.orderItems.filter((item) => item.product !== idProduct);
        },
        updateQuantity: (state, action) => {
            const { id, amount } = action.payload;
            const existingItem = state.orderItems.find(item => item.product === id);
            
            if (existingItem) {
                existingItem.amount = amount;
            }
        },
        calculatorOrderPrice: (state, action) => {
            const selectedItems = state.orderItems.filter(item => action.payload.includes(item.product));
            state.orderPrice = selectedItems.reduce((total, item) => total + (item.price * item.amount), 0);
        }
    }
})

// Action creators are generated for each case reducer function
export const { addOrder, updateQuantity, removeOrder,calculatorOrderPrice } = orderSlice.actions    

export default orderSlice.reducer