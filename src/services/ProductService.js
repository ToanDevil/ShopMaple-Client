import axios from "axios"
export const axiosJWT = axios.create()
export const getAllProduct = async (data) => {
    console.log(data)
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/product/list-product`, {params: data})
    return res.data
}

export const getProductByCategoryId = async (categoryId) => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/product/list-product/${categoryId}`)
    return res.data
}

export const createProduct = async (data) => {
    const res = await axiosJWT.post(`${process.env.REACT_APP_API_URL}/product/add-product`, data)
    return res.data
}
export const deleteProduct = async (id) => {
    const res = await axiosJWT.delete(`${process.env.REACT_APP_API_URL}/product/delete-product/${id}`, {
        headers: {
            access_token: `Bearer ${localStorage.getItem('access_token')}`
        }
    })
    return res.data
}
export const deleteManyProduct = async (ids) => {
    const res = await axiosJWT.post(`${process.env.REACT_APP_API_URL}/product/deleteMany`, {ids}, {
        headers: {
            access_token: `Bearer ${localStorage.getItem('access_token')}`
        }
    })
    return res.data
}
export const updateProduct = async (id,data) => {
    const res = await axiosJWT.put(`${process.env.REACT_APP_API_URL}/product/update-product/${id}`, data, {
        headers: {
            access_token: `Bearer ${localStorage.getItem('access_token')}`
        }
    })
    return res.data
}
export const getDetailProduct = async (id) => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/product/detail-product/${id}`)
    return res.data
}