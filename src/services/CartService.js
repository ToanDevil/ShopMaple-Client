import axios from "axios"

export const add = async (productId, data) => {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/cart/add/${productId}`, data)
    return res.data
}

export const getAllItem = async (userId) => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/cart/get-all-item/${userId}`)
    return res.data
}

export const updateAmount = async (productId, data) => {
    const res = await axios.put(`${process.env.REACT_APP_API_URL}/cart/update-amount/${productId}`, data)
    return res.data
}

export const deleteItem = async (productId) => {
    const res = await axios.delete(`${process.env.REACT_APP_API_URL}/cart/delete/${productId}`)
    return res.data
}

export const deleteManyItem = async (data) => {
    console.log('data', data)
    const res = await axios.put(`${process.env.REACT_APP_API_URL}/cart/delete-many`, data)
    return res.data
}