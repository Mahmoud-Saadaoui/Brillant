import { useTranslation } from 'react-i18next';
import { useState, FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import AuthLayout from '../components/AuthLayout';
import AuthPageHeader from '../components/AuthPageHeader';
import AuthFormCard from '../components/AuthFormCard';
import AuthInput from '../components/AuthInput';
import AuthSubmitButton from '../components/AuthSubmitButton';
import AuthFooterLink from '../components/AuthFooterLink';
import { useLogin } from '../hooks/useLogin';
import { toast } from 'react-toastify';
import { useAppContext } from '../../../shared/context';

const LoginPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const { mutate, isPending } = useLogin()
  const { setCredentials } = useAppContext();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    mutate(
      { email, password },
      {
        onSuccess: (data) => {
          setCredentials(data);
          navigate('/')
        },
        onError: (error) => {
          toast.error((error as any)?.response?.data?.message || "Failed Login")  
        }
      },
    );
    setEmail("");
    setPassword("");
  };

  return (
    <AuthLayout>
      <AuthPageHeader
        type="login"
        title={t('auth.login.title')}
        subtitle={t('auth.login.subtitle')}
      />

      <AuthFormCard>
        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Email */}
          <AuthInput
            type="email"
            label={t('auth.login.email')}
            placeholder={t('auth.login.emailPlaceholder')}
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {/* Password */}
          <AuthInput
            type={showPassword ? 'text' : 'password'}
            label={t('auth.login.password')}
            placeholder={t('auth.login.passwordPlaceholder')}
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

          {/* Remember & Forgot */}
          <div className="flex justify-end">
            <Link
              to="/forgot-password"
              className="text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
            >
              {t('auth.login.forgotPassword')}
            </Link>
          </div>

          {/* Submit Button */}
          <AuthSubmitButton isLoading={isPending}>
            {t('auth.login.submit')}
          </AuthSubmitButton>
        </form>

        {/* Register Link */}
        <AuthFooterLink
          text={t('auth.login.noAccount')}
          linkText={t('auth.login.registerLink')}
          to="/register"
        />
      </AuthFormCard>
    </AuthLayout>
  );
};

export default LoginPage;
