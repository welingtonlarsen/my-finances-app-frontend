import axiosInstance from "./axios-instance";

const PATH = "/expenses";

export const createExpense = async (expense) => {
  await axiosInstance.post(PATH, expense);
};

export const getAllExpenses = async () => {
  const { data } = await axiosInstance.get(PATH);
  return data;
};
