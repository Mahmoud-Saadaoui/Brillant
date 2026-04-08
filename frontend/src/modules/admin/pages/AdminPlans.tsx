import { useState } from 'react';
import { Check, X, HelpCircle, CreditCard, Users, Zap, Crown } from 'lucide-react';

const AdminPlans = () => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  // Helper pour obtenir les classes de couleur pour les stats
  const getStatColorClasses = (color: string) => {
    const colors: Record<string, { text: string }> = {
      blue: { text: 'text-blue-600' },
      green: { text: 'text-green-600' },
      orange: { text: 'text-orange-600' },
      purple: { text: 'text-purple-600' },
    };
    return colors[color] || colors.blue;
  };

  const plans = [
    {
      id: 1,
      name: 'Basic',
      color: 'blue',
      icon: Users,
      price: { monthly: 29, yearly: 290 },
      features: [
        { name: 'Up to 50 active jobs', included: true },
        { name: 'Basic analytics', included: true },
        { name: 'Email support', included: true },
        { name: 'Candidate database search', included: true },
        { name: 'AI-powered matching', included: false },
        { name: 'Priority support', included: false },
        { name: 'Custom branding', included: false },
        { name: 'API access', included: false },
      ],
      popular: false,
    },
    {
      id: 2,
      name: 'Professional',
      color: 'green',
      icon: Zap,
      price: { monthly: 79, yearly: 790 },
      features: [
        { name: 'Up to 200 active jobs', included: true },
        { name: 'Advanced analytics', included: true },
        { name: 'Priority email & chat support', included: true },
        { name: 'Candidate database search', included: true },
        { name: 'AI-powered matching', included: true },
        { name: 'Bulk candidate outreach', included: true },
        { name: 'Custom branding', included: false },
        { name: 'API access', included: false },
      ],
      popular: true,
    },
    {
      id: 3,
      name: 'Enterprise',
      color: 'orange',
      icon: Crown,
      price: { monthly: 199, yearly: 1990 },
      features: [
        { name: 'Unlimited active jobs', included: true },
        { name: 'Advanced analytics & reporting', included: true },
        { name: '24/7 dedicated support', included: true },
        { name: 'Full candidate database access', included: true },
        { name: 'AI-powered matching', included: true },
        { name: 'Bulk candidate outreach', included: true },
        { name: 'Custom branding & white-label', included: true },
        { name: 'Full API access', included: true },
      ],
      popular: false,
    },
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: {
        bg: 'bg-blue-100 dark:bg-blue-900/30',
        text: 'text-blue-600 dark:text-blue-400',
        border: 'border-blue-500',
        bgDark: 'bg-blue-600',
      },
      green: {
        bg: 'bg-green-100 dark:bg-green-900/30',
        text: 'text-green-600 dark:text-green-400',
        border: 'border-green-500',
        bgDark: 'bg-green-600',
      },
      orange: {
        bg: 'bg-orange-100 dark:bg-orange-900/30',
        text: 'text-orange-600 dark:text-orange-400',
        border: 'border-orange-500',
        bgDark: 'bg-orange-600',
      },
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  const stats = [
    { label: 'Active Subscriptions', value: '1,234', change: '+12%', color: 'blue' },
    { label: 'Monthly Revenue', value: '$45,678', change: '+8%', color: 'green' },
    { label: 'Avg. Revenue/User', value: '$67', change: '+5%', color: 'orange' },
    { label: 'Conversion Rate', value: '4.5%', change: '+2%', color: 'purple' },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100 relative pb-4 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-12 after:h-1 after:bg-blue-600">
            Subscription Plans
          </h1>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const colorClasses = getStatColorClasses(stat.color);
          return (
            <div key={stat.label} className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-slate-600 dark:text-slate-400">{stat.label}</p>
                <span className={`text-xs ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                  {stat.change}
                </span>
              </div>
              <p className={`text-2xl font-bold text-slate-900 dark:text-slate-100`}>{stat.value}</p>
            </div>
          );
        })}
      </div>

      {/* Billing Toggle */}
      <div className="flex items-center justify-center gap-4 py-4">
        <button
          onClick={() => setBillingCycle('monthly')}
          className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
            billingCycle === 'monthly'
              ? 'bg-blue-600 text-white'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700'
          }`}
        >
          Monthly
        </button>
        <button
          onClick={() => setBillingCycle('yearly')}
          className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
            billingCycle === 'yearly'
              ? 'bg-blue-600 text-white'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700'
          }`}
        >
          Yearly
          <span className="ml-2 text-xs bg-green-500 px-2 py-0.5 rounded-full">Save 17%</span>
        </button>
      </div>

      {/* Plans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan) => {
          const colorClasses = getColorClasses(plan.color);
          const Icon = plan.icon;
          const price = billingCycle === 'monthly' ? plan.price.monthly : plan.price.yearly;

          return (
            <div
              key={plan.id}
              className={`relative bg-white dark:bg-slate-800 rounded-xl shadow-sm border-2 overflow-hidden transition-all hover:shadow-lg ${
                plan.popular ? 'border-green-500' : 'border-slate-200 dark:border-slate-700'
              }`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute top-0 right-0 bg-green-500 text-white text-xs font-semibold px-3 py-1 rounded-bl-lg">
                  Most Popular
                </div>
              )}

              {/* Plan Header */}
              <div className={`p-6 ${colorClasses.bg} dark:bg-opacity-20 border-b border-slate-200 dark:border-slate-700`}>
                <div className={`w-12 h-12 ${colorClasses.bg} rounded-xl flex items-center justify-center mb-4`}>
                  <Icon className={`w-6 h-6 ${colorClasses.text}`} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">{plan.name}</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                  {plan.name === 'Basic' && 'Perfect for small teams getting started'}
                  {plan.name === 'Professional' && 'For growing companies with active hiring'}
                  {plan.name === 'Enterprise' && 'Full-featured solution for large organizations'}
                </p>
              </div>

              {/* Price */}
              <div className="p-6 text-center border-b border-slate-200 dark:border-slate-700">
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-4xl font-bold text-slate-900 dark:text-slate-100">
                    ${price}
                  </span>
                  <span className="text-slate-600 dark:text-slate-400">
                    /{billingCycle === 'monthly' ? 'month' : 'year'}
                  </span>
                </div>
                {billingCycle === 'yearly' && (
                  <p className="text-sm text-green-600 dark:text-green-400 mt-2">
                    Save ${(plan.price.monthly * 12 - price)} annually
                  </p>
                )}
              </div>

              {/* Features */}
              <div className="p-6">
                <ul className="space-y-3">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <div className="flex-shrink-0 mt-0.5">
                        {feature.included ? (
                          <div className={`w-5 h-5 ${colorClasses.bgDark} rounded-full flex items-center justify-center`}>
                            <Check className="w-3 h-3 text-white" />
                          </div>
                        ) : (
                          <div className="w-5 h-5 bg-slate-200 dark:bg-slate-700 rounded-full flex items-center justify-center">
                            <X className="w-3 h-3 text-slate-500" />
                          </div>
                        )}
                      </div>
                      <span className={`text-sm ${feature.included ? 'text-slate-900 dark:text-slate-100' : 'text-slate-500'}`}>
                        {feature.name}
                      </span>
                      {!feature.included && (
                        <span title="Available on higher plans">
                          <HelpCircle className="w-4 h-4 text-slate-400 ml-auto" />
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Button */}
              <div className="p-6 pt-0">
                <button
                  className={`w-full py-3 px-4 font-medium rounded-lg transition-colors ${
                    plan.popular
                      ? `${colorClasses.bgDark} text-white hover:opacity-90`
                      : 'bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-slate-100 hover:bg-slate-200 dark:hover:bg-slate-600'
                  }`}
                >
                  {plan.popular ? 'Start Free Trial' : 'Get Started'}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Feature Comparison */}
      <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-6">Feature Comparison</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-700">
                <th className="px-4 py-3 text-left text-sm font-semibold text-slate-600 dark:text-slate-400">Feature</th>
                <th className="px-4 py-3 text-center text-sm font-semibold text-blue-600 dark:text-blue-400">Basic</th>
                <th className="px-4 py-3 text-center text-sm font-semibold text-green-600 dark:text-green-400">Professional</th>
                <th className="px-4 py-3 text-center text-sm font-semibold text-orange-600 dark:text-orange-400">Enterprise</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
              {[
                { feature: 'Active job postings', basic: '50', pro: '200', enterprise: 'Unlimited' },
                { feature: 'Team members', basic: '5', pro: '20', enterprise: 'Unlimited' },
                { feature: 'AI matching credits/month', basic: '100', pro: '1000', enterprise: 'Unlimited' },
                { feature: 'Storage', basic: '5 GB', pro: '50 GB', enterprise: 'Unlimited' },
                { feature: 'Support response time', basic: '24h', pro: '4h', enterprise: '1h' },
                { feature: 'Custom integrations', basic: false, pro: true, enterprise: true },
              ].map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-700/30">
                  <td className="px-4 py-3 text-sm text-slate-900 dark:text-slate-100">{row.feature}</td>
                  <td className="px-4 py-3 text-sm text-center text-slate-600 dark:text-slate-400">
                    {typeof row.basic === 'boolean' ? (
                      row.basic ? <Check className="w-4 h-4 text-green-500 mx-auto" /> : <X className="w-4 h-4 text-slate-400 mx-auto" />
                    ) : (
                      row.basic
                    )}
                  </td>
                  <td className="px-4 py-3 text-sm text-center text-slate-600 dark:text-slate-400">
                    {typeof row.pro === 'boolean' ? (
                      row.pro ? <Check className="w-4 h-4 text-green-500 mx-auto" /> : <X className="w-4 h-4 text-slate-400 mx-auto" />
                    ) : (
                      row.pro
                    )}
                  </td>
                  <td className="px-4 py-3 text-sm text-center text-slate-600 dark:text-slate-400">
                    {typeof row.enterprise === 'boolean' ? (
                      row.enterprise ? <Check className="w-4 h-4 text-green-500 mx-auto" /> : <X className="w-4 h-4 text-slate-400 mx-auto" />
                    ) : (
                      row.enterprise
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminPlans;
