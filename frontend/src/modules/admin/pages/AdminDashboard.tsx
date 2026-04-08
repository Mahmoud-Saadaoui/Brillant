import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import {
  Users,
  Building,
  Briefcase,
  TrendingUp,
} from 'lucide-react';
import {
  MOCK_DASHBOARD_KPI,
  MOCK_MONTHLY_ACTIVE_USERS,
  MOCK_CANDIDATES_BY_SECTOR,
  MOCK_JOBS_BY_CONTRACT,
  MOCK_USERS_BY_CITY,
} from '../data';
import { CHART_COLORS } from '../constants';

const AdminDashboard = () => {
  // Helper pour obtenir les classes de couleur
  const getColorClasses = (color: string) => {
    const colors: Record<string, { bg: string; iconBg: string; text: string }> = {
      blue: { bg: 'bg-blue-100 dark:bg-blue-900/30', iconBg: 'bg-blue-600', text: 'text-blue-700 dark:text-blue-400' },
      purple: { bg: 'bg-purple-100 dark:bg-purple-900/30', iconBg: 'bg-purple-600', text: 'text-purple-700 dark:text-purple-400' },
      green: { bg: 'bg-green-100 dark:bg-green-900/30', iconBg: 'bg-green-600', text: 'text-green-700 dark:text-green-400' },
      orange: { bg: 'bg-orange-100 dark:bg-orange-900/30', iconBg: 'bg-orange-600', text: 'text-orange-700 dark:text-orange-400' },
    };
    return colors[color] || colors.blue;
  };

  // KPIs Cards
  const kpiData = [
    {
      label: 'Total Utilisateurs',
      value: MOCK_DASHBOARD_KPI.totalUsers.toLocaleString(),
      icon: Users,
      color: 'blue',
    },
    {
      label: 'Total Recruteurs',
      value: MOCK_DASHBOARD_KPI.totalRecruiters.toLocaleString(),
      icon: Building,
      color: 'purple',
    },
    {
      label: 'Total Candidats',
      value: MOCK_DASHBOARD_KPI.totalCandidates.toLocaleString(),
      icon: Users,
      color: 'green',
    },
    {
      label: 'Total Emplois',
      value: MOCK_DASHBOARD_KPI.totalJobs.toLocaleString(),
      icon: Briefcase,
      color: 'orange',
    },
  ];

  // Données pour le graphique des utilisateurs actifs vs inactifs
  const activeUsersChartData = MOCK_MONTHLY_ACTIVE_USERS.map((item) => ({
    month: item.month.split(' ')[0],
    actifs: item.active,
    inactifs: item.inactive,
  }));

  // Données pour les candidats par secteur
  const sectorChartData = MOCK_CANDIDATES_BY_SECTOR.map((item) => ({
    name: item.sector,
    candidats: item.candidates,
  }));

  // Données pour les emplois par type de contrat
  const contractChartData = MOCK_JOBS_BY_CONTRACT.map((item) => ({
    name: item.type,
    shortName: item.type === 'Freelance' ? 'Free.' : item.type === 'Alternance' ? 'Alt.' : item.type,
    value: item.count,
    color: item.color,
  }));

  // Données pour les utilisateurs par ville
  const cityChartData = MOCK_USERS_BY_CITY.slice(0, 8).map((item) => ({
    ville: item.city,
    candidats: item.candidates,
    recruteurs: item.recruiters,
  }));

  return (
    <div className="space-y-6">
      {/* Page Title */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            Dashboard
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">
            Vue d'ensemble de la plateforme TalentAI
          </p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpiData.map((kpi, idx) => {
          const Icon = kpi.icon;
          const colorClasses = getColorClasses(kpi.color);
          return (
            <div
              key={idx}
              className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">{kpi.label}</p>
                  <p className="text-3xl font-bold text-slate-900 dark:text-slate-100">{kpi.value}</p>
                </div>
                <div className={`w-12 h-12 ${colorClasses.iconBg} rounded-xl flex items-center justify-center shrink-0`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Utilisateurs Actifs vs Inactifs */}
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4">
            Utilisateurs Actifs vs Inactifs
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={activeUsersChartData}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-slate-200 dark:stroke-slate-700" />
              <XAxis
                dataKey="month"
                className="text-sm text-slate-600 dark:text-slate-400"
                stroke="#94a3b8"
              />
              <YAxis className="text-sm text-slate-600 dark:text-slate-400" stroke="#94a3b8" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(15, 23, 42, 0.9)',
                  border: 'none',
                  borderRadius: '8px',
                  color: '#fff',
                }}
                formatter={(value: number) => value.toLocaleString()}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="actifs"
                stroke={CHART_COLORS.primary}
                strokeWidth={3}
                dot={{ fill: CHART_COLORS.primary, r: 4 }}
                activeDot={{ r: 6 }}
                name="Actifs"
              />
              <Line
                type="monotone"
                dataKey="inactifs"
                stroke={CHART_COLORS.quaternary}
                strokeWidth={3}
                dot={{ fill: CHART_COLORS.quaternary, r: 4 }}
                activeDot={{ r: 6 }}
                name="Inactifs"
                strokeDasharray="5 5"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Candidats par Secteur */}
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4">
            Candidats par Secteur
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={sectorChartData}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-slate-200 dark:stroke-slate-700" />
              <XAxis
                dataKey="name"
                className="text-sm text-slate-600 dark:text-slate-400"
                stroke="#94a3b8"
                angle={-45}
                textAnchor="end"
                height={80}
              />
              <YAxis className="text-sm text-slate-600 dark:text-slate-400" stroke="#94a3b8" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(15, 23, 42, 0.9)',
                  border: 'none',
                  borderRadius: '8px',
                  color: '#fff',
                }}
                formatter={(value: number) => value.toLocaleString()}
              />
              <Bar dataKey="candidats" fill={CHART_COLORS.primary} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Emplois par Type de Contrat */}
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4">
            Emplois par Type de Contrat
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={contractChartData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                paddingAngle={2}
                dataKey="value"
                label={({ name, percent }: { name: string; percent: number }) => {
                  const entry = contractChartData.find(c => c.name === name);
                  const displayName = entry?.shortName || name;
                  return percent > 5 ? `${displayName} ${(percent * 100).toFixed(0)}%` : '';
                }}
                labelLine={false}
              >
                {contractChartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(15, 23, 42, 0.9)',
                  border: 'none',
                  borderRadius: '8px',
                  color: '#fff',
                }}
                formatter={(value: number) => value.toLocaleString()}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Utilisateurs par Ville */}
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4">
            Utilisateurs par Ville
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={cityChartData}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-slate-200 dark:stroke-slate-700" />
              <XAxis
                dataKey="ville"
                className="text-sm text-slate-600 dark:text-slate-400"
                stroke="#94a3b8"
                angle={-45}
                textAnchor="end"
                height={80}
              />
              <YAxis className="text-sm text-slate-600 dark:text-slate-400" stroke="#94a3b8" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(15, 23, 42, 0.9)',
                  border: 'none',
                  borderRadius: '8px',
                  color: '#fff',
                }}
                formatter={(value: number) => value.toLocaleString()}
              />
              <Legend />
              <Bar dataKey="candidats" fill={CHART_COLORS.primary} name="Candidats" radius={[4, 4, 0, 0]} />
              <Bar dataKey="recruteurs" fill={CHART_COLORS.secondary} name="Recruteurs" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
// Force reload Fri Mar 27 10:58:23     2026
