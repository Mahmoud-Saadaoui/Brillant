import { ForgotPasswordData } from "../types";
import { useMutation } from "@tanstack/react-query";
import { api } from "../../../shared/config";

const forgotPasswordApi = async (data: ForgotPasswordData) => {
  try {
    const res = await api.post('/auth/password/forgot-password', data)
    return res.data
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export const useForgotPassword = () => {
  return useMutation({
    mutationFn: (data: ForgotPasswordData) => forgotPasswordApi(data),
  });
};
