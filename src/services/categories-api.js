import axiosInstance from "./axios-instance"

const PATH = '/categories'

export const getCategories = async () => {
    const { data } = await axiosInstance.get(PATH)
    return data;
}