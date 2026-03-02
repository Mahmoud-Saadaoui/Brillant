import { ResetPasswordData, ResetPasswordParams } from "../types";
import { useMutation } from "@tanstack/react-query";
import { api } from "../../../shared/config";

const resetPasswordApi = async ({ userId, token, password, confirmPassword }: ResetPasswordParams & ResetPasswordData) => {
  try {
    const res = await api.post(`/auth/password/reset-password/${userId}/${token}`, { password, confirmPassword })
    return res.data
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export const useResetPassword = () => {
  return useMutation({
    mutationFn: (data: ResetPasswordParams & ResetPasswordData) => resetPasswordApi(data),
  });
};
