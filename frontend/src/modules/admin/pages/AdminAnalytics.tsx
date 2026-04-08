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
  TrendingUp,
  Calendar,
  Briefcase,
  Building,
  DollarSign,
  Clock,
} from 'lucide-react';
import {
  MOCK_REGISTRATION_TREND,
  MOCK_CANDIDATES_BY_EXPERIENCE,
  MOCK_JOBS_BY_SECTOR_ANALYTICS,
  MOCK_AVG_SALARY_BY_POSITION,
  MOCK_ACTIVE_COMPANIES,
  MOCK_RECRUITMENT_TIMELINE,
  MOCK_APPLICATION_SOURCES,
} from '../data';
import { CHART_COLORS } from '../constants';

const AdminAnalytics = () => {
  // Formatter pour les nombres
  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  // Données pour le graphique des tendances d'inscription
  const registrationTrendData = MOCK_REGISTRATION_TREND.map((item) => ({
    mois: item.month.split(' ')[0],
    candidats: item.candidates,
    recruteurs: item.recruiters,
  }));

  // Données pour les candidats par expérience
  const experienceChartData = MOCK_CANDIDATES_BY_EXPERIENCE.map((item) => ({
    name: item.level,
    value: item.value,
    color: item.color,
  }));

  // Données pour les emplois par secteur
  const sectorChartData = MOCK_JOBS_BY_SECTOR_ANALYTICS.map((item) => ({
    name: item.sector,
    value: item.value,
    color: item.color,
  }));

  // Données pour les salaires moyens
  const salaryChartData = MOCK_AVG_SALARY_BY_POSITION.map((item) => ({
    poste: item.position,
    salaire: item.salary,
  }));

  // Données pour les entreprises actives
  const companiesChartData = MOCK_ACTIVE_COMPANIES.map((item) => ({
    entreprise: item.company,
    emplois: item.jobs,
    embauches: item.hires,
  }));

  // Données pour la timeline de recrutement
  const timelineChartData = MOCK_RECRUITMENT_TIMELINE.map((item) => ({
    etape: item.stage,
    jours: item.days,
  }));

  // Données pour les sources de candidatures
  const sourcesChartData = MOCK_APPLICATION_SOURCES.map((item) => ({
    name: item.source,
    value: item.value,
    color: item.color,
  }));

  return (
    <div className="space-y-6">
      {/* Page Title */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            Analytics
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">
            Statistiques détaillées de la plateforme
          </p>
        </div>
      </div>

      {/* Évolution Mensuelle des Inscriptions */}
      <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="w-5 h-5 text-blue-600" />
          <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
            Évolution Mensuelle des Inscriptions
          </h3>
        </div>
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={registrationTrendData}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-slate-200 dark:stroke-slate-700" />
            <XAxis dataKey="mois" className="text-sm text-slate-600 dark:text-slate-400" stroke="#94a3b8" />
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
              dataKey="candidats"
              stroke={CHART_COLORS.primary}
              strokeWidth={3}
              dot={{ fill: CHART_COLORS.primary, r: 4 }}
              activeDot={{ r: 6 }}
              name="Candidats"
            />
            <Line
              type="monotone"
              dataKey="recruteurs"
              stroke={CHART_COLORS.secondary}
              strokeWidth={3}
              dot={{ fill: CHART_COLORS.secondary, r: 4 }}
              activeDot={{ r: 6 }}
              name="Recruteurs"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Candidats par Niveau & Emplois par Secteur */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Candidats par Niveau d'Expérience */}
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
          <div className="flex items-center gap-2 mb-4">
            <Briefcase className="w-5 h-5 text-purple-600" />
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
              Candidats par Niveau d'Expérience
            </h3>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={experienceChartData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                paddingAngle={2}
                dataKey="value"
                label={({ name, percent }: { name: string; percent: number }) => {
                  const shortName = name.split(' ')[0];
                  return `${shortName} ${(percent * 100).toFixed(0)}%`;
                }}
                labelLine={false}
              >
                {experienceChartData.map((entry, index) => (
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

        {/* Emplois par Secteur */}
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
          <div className="flex items-center gap-2 mb-4">
            <Building className="w-5 h-5 text-green-600" />
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
              Emplois par Secteur
            </h3>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={sectorChartData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                paddingAngle={2}
                dataKey="value"
                label={({ name, percent }: { name: string; percent: number }) => percent > 5 ? `${name} ${(percent * 100).toFixed(0)}%` : ''}
                labelLine={false}
              >
                {sectorChartData.map((entry, index) => (
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
      </div>

      {/* Salaire Moyen par Poste */}
      <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
        <div className="flex items-center gap-2 mb-4">
          <DollarSign className="w-5 h-5 text-green-600" />
          <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
            Salaire Moyen par Poste
          </h3>
        </div>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={salaryChartData} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" className="stroke-slate-200 dark:stroke-slate-700" />
            <XAxis type="number" className="text-sm text-slate-600 dark:text-slate-400" stroke="#94a3b8" />
            <YAxis type="category" dataKey="poste" width={140} className="text-sm text-slate-600 dark:text-slate-400" stroke="#94a3b8" />
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(15, 23, 42, 0.9)',
                border: 'none',
                borderRadius: '8px',
                color: '#fff',
              }}
              formatter={(value: number) => `€${value.toLocaleString()}`}
            />
            <Bar dataKey="salaire" fill={CHART_COLORS.secondary} radius={[0, 4, 4, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Entreprises les Plus Actives */}
      <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
        <div className="flex items-center gap-2 mb-4">
          <Building className="w-5 h-5 text-blue-600" />
          <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
            Entreprises les Plus Actives
          </h3>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={companiesChartData}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-slate-200 dark:stroke-slate-700" />
            <XAxis
              dataKey="entreprise"
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
            />
            <Legend />
            <Bar dataKey="emplois" fill={CHART_COLORS.primary} name="Emplois postés" radius={[4, 4, 0, 0]} />
            <Bar dataKey="embauches" fill={CHART_COLORS.secondary} name="Embauches" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Timeline de Recrutement & Sources de Candidatures */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Temps de Recrutement Moyen */}
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
          <div className="flex items-center gap-2 mb-4">
            <Clock className="w-5 h-5 text-orange-600" />
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
              Temps de Recrutement Moyen
            </h3>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={timelineChartData}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-slate-200 dark:stroke-slate-700" />
              <XAxis
                dataKey="etape"
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
                formatter={(value: number) => `${value} jours`}
              />
              <Bar dataKey="jours" fill={CHART_COLORS.tertiary} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Sources de Candidatures */}
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-5 h-5 text-purple-600" />
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
              Sources de Candidatures
            </h3>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={sourcesChartData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                paddingAngle={2}
                dataKey="value"
                label={({ name, percent }: { name: string; percent: number }) => percent > 5 ? `${name} ${(percent * 100).toFixed(0)}%` : ''}
                labelLine={false}
              >
                {sourcesChartData.map((entry, index) => (
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
      </div>
    </div>
  );
};

export default AdminAnalytics;
