import axios from "axios"

export const createDetailOrder = async (id, data) => {
    console.log(id, data)
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/order-detail/add-detail-order/${id}`, data)
    return res.data
}