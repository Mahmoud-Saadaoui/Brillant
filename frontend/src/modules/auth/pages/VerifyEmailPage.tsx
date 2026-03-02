import { Link, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useVerifyEmail } from '../hooks/useVerifyEmail'
import { Loader2, CheckCircle, AlertTriangle, MailX } from 'lucide-react'
import AuthLayout from '../components/AuthLayout'
import AuthFormCard from '../components/AuthFormCard'

const getErrorMessage = (error: unknown, fallback: string): string => {
  if (error && typeof error === 'object' && 'response' in error) {
    const err = error as { response?: { data?: { message?: string } } }
    return err.response?.data?.message || fallback
  }
  if (error instanceof Error) {
    return error.message
  }
  return fallback
}

const VerifyEmailPage = () => {
  const { t } = useTranslation()
  const { userId, token } = useParams()
  const { data, error, isLoading, isError, isSuccess } = useVerifyEmail(userId, token)

  // Loading State
  if (isLoading) {
    return (
      <AuthLayout>
        <AuthFormCard>
          <div className="py-12 text-center">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-linear-to-br from-blue-50 to-purple-50 dark:from-gray-700 dark:to-gray-600 flex items-center justify-center border-4 border-blue-100 dark:border-gray-600">
              <Loader2 className="w-10 h-10 text-blue-600 dark:text-blue-400 animate-spin" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
              {t('auth.verifyEmail.loading')}
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Veuillez patienter...
            </p>
          </div>
        </AuthFormCard>
      </AuthLayout>
    )
  }

  // Error State
  if (isError) {
    return (
      <AuthLayout>
        <AuthFormCard>
          <div className="py-10 text-center">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-linear-to-br from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 flex items-center justify-center border-4 border-red-100 dark:border-red-900/30">
              <AlertTriangle className="w-10 h-10 text-red-600 dark:text-red-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-3">
              {t('auth.verifyEmail.error')}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-sm mx-auto mb-8">
              {getErrorMessage(error, t('auth.verifyEmail.invalidLink'))}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                to="/register"
                className="inline-flex items-center justify-center bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300"
              >
                {t('auth.verifyEmail.toRegister')}
              </Link>
              <Link
                to="/login"
                className="inline-flex items-center justify-center bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 font-semibold py-3 px-6 rounded-xl border-2 border-gray-200 dark:border-gray-600 transition-all duration-300"
              >
                {t('auth.verifyEmail.backToLogin')}
              </Link>
            </div>
          </div>
        </AuthFormCard>
      </AuthLayout>
    )
  }

  // Success State
  if (isSuccess && data) {
    return (
      <AuthLayout>
        <AuthFormCard>
          <div className="py-10 text-center">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-linear-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 flex items-center justify-center border-4 border-green-100 dark:border-green-900/30">
              <CheckCircle className="w-10 h-10 text-green-600 dark:text-green-400 animate-bounce" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-3">
              {t('auth.verifyEmail.success')}
            </h2>
            {data.user && (
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                {t('auth.verifyEmail.welcome')}, <span className="font-semibold">{data.user.name}</span>!
              </p>
            )}
            <Link
              to="/login"
              className="inline-flex items-center justify-center gap-2 bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300"
            >
              {t('auth.verifyEmail.toLogin')}
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        </AuthFormCard>
      </AuthLayout>
    )
  }

  // Invalid Link State
  return (
    <AuthLayout>
      <AuthFormCard>
        <div className="py-10 text-center">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-linear-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 flex items-center justify-center border-4 border-yellow-100 dark:border-yellow-900/30">
            <MailX className="w-10 h-10 text-yellow-600 dark:text-yellow-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-3">
            {t('auth.verifyEmail.invalidLink')}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-sm mx-auto mb-8">
            Veuillez vérifier votre email pour le lien complet.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/register"
              className="inline-flex items-center justify-center bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300"
            >
              {t('auth.verifyEmail.toRegister')}
            </Link>
            <Link
              to="/login"
              className="inline-flex items-center justify-center bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 font-semibold py-3 px-6 rounded-xl border-2 border-gray-200 dark:border-gray-600 transition-all duration-300"
            >
              {t('auth.verifyEmail.backToLogin')}
            </Link>
          </div>
        </div>
      </AuthFormCard>
    </AuthLayout>
  )
}

export default VerifyEmailPage