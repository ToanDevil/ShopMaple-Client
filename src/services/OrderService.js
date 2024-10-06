import axios from "axios"
export const axiosJWT = axios.create()

export const createOrder = async (id, data) => {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/order/add-detail-order/${id}`, data)
    return res.data
}

export const getUserOrder = async (userId) => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/order/getOrderByUserID`, {
        params: { userId: userId }  // Truyền userId qua query string
    })
    return res.data
}

export const updateStatus = async (orderId) => {
    const res = await axiosJWT.put(`${process.env.REACT_APP_API_URL}/order/update-status`, {orderId: orderId})
    return res.data
}

export const getAllOrder = async () => {
    const res = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/order/getAllOrder`)
    return res.data
}