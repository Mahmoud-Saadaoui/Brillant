import { useTranslation } from 'react-i18next';
import { useState, FormEvent, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import AuthLayout from '../components/AuthLayout';
import AuthPageHeader from '../components/AuthPageHeader';
import AuthFormCard from '../components/AuthFormCard';
import AuthInput from '../components/AuthInput';
import AuthSubmitButton from '../components/AuthSubmitButton';
import AuthFooterLink from '../components/AuthFooterLink';
import { useResetPassword } from '../hooks/useResetPassword';
import { toast } from 'react-toastify';

const ResetPasswordPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { userId, token } = useParams<{ userId: string; token: string }>();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const { mutate, isPending } = useResetPassword()

  // Check if userId and token exist in URL
  useEffect(() => {
    if (!userId || !token) {
      toast.error(t('auth.resetPassword.invalidLink'));
      navigate("/login");
    }
  }, [userId, token, navigate, t]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!userId || !token) {
      toast.error(t('auth.resetPassword.invalidLink'));
      return;
    }

    mutate(
      { userId, token, password, confirmPassword },
      {
        onSuccess: () => {
          toast.success(t('auth.resetPassword.success'));
          navigate("/login");
        },
        onError: (error) => {
          toast.error((error as any)?.response?.data?.message || t('auth.resetPassword.error'))
        }
      },
    );
  };

  if (!userId || !token) {
    return null;
  }

  return (
    <AuthLayout>
      <AuthPageHeader
        type="reset"
        title={t('auth.resetPassword.title')}
        subtitle={t('auth.resetPassword.subtitle')}
      />

      <AuthFormCard>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <AuthInput
            type={showPassword ? 'text' : 'password'}
            label={t('auth.resetPassword.newPassword')}
            placeholder={t('auth.resetPassword.newPasswordPlaceholder')}
            rightElement={
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            }
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <AuthInput
            type={showConfirmPassword ? 'text' : 'password'}
            label={t('auth.resetPassword.confirmPassword')}
            placeholder={t('auth.resetPassword.confirmPasswordPlaceholder')}
            rightElement={
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
              >
                {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            }
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <AuthSubmitButton isLoading={isPending}>
            {t('auth.resetPassword.submit')}
          </AuthSubmitButton>
        </form>

        <AuthFooterLink
          text={t('auth.resetPassword.backToLogin')}
          linkText={t('auth.resetPassword.backToLoginLink')}
          to="/login"
        />
      </AuthFormCard>
    </AuthLayout>
  );
};

export default ResetPasswordPage;
