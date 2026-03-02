import { useTranslation } from 'react-i18next';
import { useState, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import AuthLayout from '../components/AuthLayout';
import AuthPageHeader from '../components/AuthPageHeader';
import AuthFormCard from '../components/AuthFormCard';
import AuthInput from '../components/AuthInput';
import AuthSubmitButton from '../components/AuthSubmitButton';
import AuthFooterLink from '../components/AuthFooterLink';
import { useForgotPassword } from '../hooks/useForgotPassword';
import { toast } from 'react-toastify';

const ForgotPasswordPage = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState("")

  const { mutate, isPending } = useForgotPassword()

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    mutate(
      { email },
      {
        onSuccess: () => {
          toast.success(t('auth.forgotPassword.success'));
          setEmail("");
        },
        onError: (error) => {
          toast.error((error as any)?.response?.data?.message || t('auth.forgotPassword.error'))
        }
      },
    );
  };

  return (
    <AuthLayout>
      <AuthPageHeader
        type="forgot"
        title={t('auth.forgotPassword.title')}
        subtitle={t('auth.forgotPassword.subtitle')}
      />

      <AuthFormCard>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <AuthInput
            type="email"
            label={t('auth.forgotPassword.email')}
            placeholder={t('auth.forgotPassword.emailPlaceholder')}
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <AuthSubmitButton isLoading={isPending}>
            {t('auth.forgotPassword.submit')}
          </AuthSubmitButton>
        </form>

        <AuthFooterLink
          text={t('auth.forgotPassword.backToLogin')}
          linkText={t('auth.forgotPassword.backToLoginLink')}
          to="/login"
        />
      </AuthFormCard>
    </AuthLayout>
  );
};

export default ForgotPasswordPage;
