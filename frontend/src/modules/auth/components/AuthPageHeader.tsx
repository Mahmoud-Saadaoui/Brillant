import { LogIn, UserPlus, MailCheck, KeyRound } from 'lucide-react';
import { AuthPageHeaderProps } from '../types';

const AuthPageHeader = ({ type, title, subtitle }: AuthPageHeaderProps) => {
  const Icon = type === 'login' ? LogIn : type === 'register' ? UserPlus : type === 'verify' ? MailCheck : KeyRound;

  return (
    <div className="text-center mb-8">
      <div className="mx-auto w-16 h-16 bg-linear-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
        <Icon className="w-8 h-8 text-white" />
      </div>
      <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
        {title}
      </h1>
      <p className="text-gray-600 dark:text-gray-400">
        {subtitle}
      </p>
    </div>
  );
};

export default AuthPageHeader;
