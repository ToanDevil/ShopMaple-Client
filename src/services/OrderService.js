import axios from "axios"

export const createOrder = async (id, data) => {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/order/add-detail-order/${id}`, data)
    return res.data
}