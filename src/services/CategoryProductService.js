import axios from "axios"

export const axiosJWT = axios.create()

export const getAllCategory = async () => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/category-product/getAll`)
    return res.data
}

export const createCategoryProduct = async (data) => {
    const res = await axiosJWT.post(`${process.env.REACT_APP_API_URL}/category-product/add`, data, {
        headers: {
            access_token: `Bearer ${localStorage.getItem('access_token')}`
        }
    })
    return res.data
}

export const deleteCategoryProduct = async (id) => {
    const res = await axiosJWT.delete(`${process.env.REACT_APP_API_URL}/category-product/delete/${id}`, {
        headers: {
            access_token: `Bearer ${localStorage.getItem('access_token')}`
        }
    })
    return res.data
}

export const getCategoryById = async (id) => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/category-product/${id}`)
    return res.data
}

