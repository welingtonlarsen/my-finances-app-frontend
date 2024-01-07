import axiosInstance from "./axios-instance"

const PATH = '/paymentmethods'

export const getPaymentMethods = async () => {
    const { data } = await axiosInstance.get(PATH)
    return data;
}