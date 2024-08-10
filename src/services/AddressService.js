import axios from "axios"

export const createAddress = async(data) => {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/address/add_address`, data)
    return res.data
}

export const updateAddress = async(id,data) => {
    const res = await axios.put(`${process.env.REACT_APP_API_URL}/address/update/${id}`, data)
    return res.data
}

export const getAddressById = async (id) => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/address/${id}`)
    return res.data
}

export const deleteAddressById = async (id) => {
    const res = await axios.delete(`${process.env.REACT_APP_API_URL}/address/delete/${id}`)
    return res.data
}