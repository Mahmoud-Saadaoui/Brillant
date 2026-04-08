import { useState } from 'react';
import { Search, Eye, Edit, Trash2, MapPin, Building, Briefcase, Calendar } from 'lucide-react';
import { MOCK_JOBS, JOB_CONTRACT_TYPES, EXPERIENCE_LEVELS } from '../data';

const AdminJobs = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sectorFilter, setSectorFilter] = useState('all');
  const [contractFilter, setContractFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  // Helper pour obtenir les classes de couleur pour les stats
  const getStatColorClasses = (color: string) => {
    const colors: Record<string, { bg: string; text: string }> = {
      blue: { bg: 'bg-blue-100 dark:bg-blue-900/30', text: 'text-blue-600 dark:text-blue-400' },
      green: { bg: 'bg-green-100 dark:bg-green-900/30', text: 'text-green-600 dark:text-green-400' },
      orange: { bg: 'bg-orange-100 dark:bg-orange-900/30', text: 'text-orange-600 dark:text-orange-400' },
      purple: { bg: 'bg-purple-100 dark:bg-purple-900/30', text: 'text-purple-600 dark:text-purple-400' },
    };
    return colors[color] || colors.blue;
  };

  // Extraire les secteurs uniques depuis les jobs
  const sectors = Array.from(new Set(MOCK_JOBS.map((job) => job.sector)));

  const filteredJobs = MOCK_JOBS.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSector = sectorFilter === 'all' || job.sector === sectorFilter;
    const matchesContract = contractFilter === 'all' || job.contractType === contractFilter;
    const matchesStatus = statusFilter === 'all' || job.status === statusFilter;
    return matchesSearch && matchesSector && matchesContract && matchesStatus;
  });

  const getContractClasses = (contract: string) => {
    const contractMap: Record<string, { bg: string; text: string }> = {
      'Full-Time (CDI)': { bg: 'bg-green-100 dark:bg-green-900/30', text: 'text-green-700 dark:text-green-400' },
      'Contract (CDD)': { bg: 'bg-orange-100 dark:bg-orange-900/30', text: 'text-orange-700 dark:text-orange-400' },
      'Freelance': { bg: 'bg-blue-100 dark:bg-blue-900/30', text: 'text-blue-700 dark:text-blue-400' },
      'Internship': { bg: 'bg-purple-100 dark:bg-purple-900/30', text: 'text-purple-700 dark:text-purple-400' },
    };
    return contractMap[contract] || contractMap['Full-Time (CDI)'];
  };

  const getStatusClasses = (status: string) => {
    const statusMap: Record<string, { bg: string; text: string; label: string }> = {
      active: { bg: 'bg-green-100 dark:bg-green-900/30', text: 'text-green-700 dark:text-green-400', label: 'Actif' },
      paused: { bg: 'bg-orange-100 dark:bg-orange-900/30', text: 'text-orange-700 dark:text-orange-400', label: 'En pause' },
      closed: { bg: 'bg-gray-100 dark:bg-gray-900/30', text: 'text-gray-700 dark:text-gray-400', label: 'Fermé' },
    };
    return statusMap[status] || statusMap.active;
  };

  // Stats
  const stats = [
    {
      label: 'Total Emplois',
      value: MOCK_JOBS.length.toString(),
      color: 'blue',
    },
    {
      label: 'Actifs',
      value: MOCK_JOBS.filter((j) => j.status === 'active').length.toString(),
      color: 'green',
    },
    {
      label: 'En pause',
      value: MOCK_JOBS.filter((j) => j.status === 'paused').length.toString(),
      color: 'orange',
    },
    {
      label: 'Candidatures',
      value: MOCK_JOBS.reduce((acc, job) => acc + job.applications, 0).toLocaleString(),
      color: 'purple',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            Emplois
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">
            Gérer toutes les offres d'emploi de la plateforme
          </p>
        </div>
        <button className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors self-start">
          <Briefcase className="w-4 h-4" />
          Nouvelle offre
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const colorClasses = getStatColorClasses(stat.color);
          return (
            <div
              key={stat.label}
              className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600 dark:text-slate-400">{stat.label}</p>
                  <p className="text-2xl font-bold text-slate-900 dark:text-slate-100 mt-1">{stat.value}</p>
                </div>
                <div className={`w-12 h-12 ${colorClasses.bg} rounded-xl flex items-center justify-center`}>
                  <Briefcase className={`w-6 h-6 ${colorClasses.text}`} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="search"
            placeholder="Rechercher par titre, entreprise ou lieu..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100"
          />
        </div>
        <select
          value={sectorFilter}
          onChange={(e) => setSectorFilter(e.target.value)}
          className="px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100"
        >
          <option value="all">Tous les secteurs</option>
          {sectors.map((sector) => (
            <option key={sector} value={sector}>
              {sector}
            </option>
          ))}
        </select>
        <select
          value={contractFilter}
          onChange={(e) => setContractFilter(e.target.value)}
          className="px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100"
        >
          <option value="all">Tous les contrats</option>
          {JOB_CONTRACT_TYPES.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100"
        >
          <option value="all">Tous les statuts</option>
          <option value="active">Actifs</option>
          <option value="paused">En pause</option>
          <option value="closed">Fermés</option>
        </select>
      </div>

      {/* Jobs Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
        {filteredJobs.map((job) => {
          const contractClasses = getContractClasses(job.contractType);
          const statusClasses = getStatusClasses(job.status);
          return (
            <div
              key={job.id}
              className="bg-white dark:bg-slate-800 rounded-xl p-5 shadow-sm border border-slate-200 dark:border-slate-700 hover:shadow-md transition-all hover:border-blue-300 dark:hover:border-blue-600"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 line-clamp-2">{job.title}</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 flex items-center gap-1">
                    <Building className="w-3 h-3" />
                    {job.company}
                  </p>
                </div>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusClasses.bg} ${statusClasses.text} shrink-0`}>
                  {statusClasses.label}
                </span>
              </div>

              {/* Details */}
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                  <MapPin className="w-4 h-4" />
                  <span>{job.location}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                  <Briefcase className="w-4 h-4" />
                  <span className={`px-2 py-0.5 rounded-md ${contractClasses.bg} ${contractClasses.text}`}>
                    {job.contractType}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                  <Calendar className="w-4 h-4" />
                  <span>{job.experience}</span>
                </div>
              </div>

              {/* Skills Tags */}
              <div className="flex flex-wrap gap-1.5 mb-4">
                {job.skills.slice(0, 4).map((skill) => (
                  <span
                    key={skill}
                    className="px-2 py-1 text-xs bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-md"
                  >
                    {skill}
                  </span>
                ))}
                {job.skills.length > 4 && (
                  <span className="px-2 py-1 text-xs bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-md">
                    +{job.skills.length - 4}
                  </span>
                )}
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between pt-3 border-t border-slate-200 dark:border-slate-700">
                <div className="text-sm">
                  <span className="text-slate-600 dark:text-slate-400">{job.applications}</span>
                  <span className="text-slate-500 dark:text-slate-500 ml-1">candidats</span>
                </div>
                <div className="flex items-center gap-1">
                  <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors" title="Voir">
                    <Eye className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-slate-400 hover:text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg transition-colors" title="Modifier">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors" title="Supprimer">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredJobs.length === 0 && (
        <div className="text-center py-12 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
          <Briefcase className="w-12 h-12 text-slate-400 mx-auto mb-4" />
          <p className="text-slate-500 dark:text-slate-400">Aucune offre trouvée correspondant à vos critères.</p>
        </div>
      )}

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Affichage de <span className="font-medium text-slate-900 dark:text-slate-100">1</span> à{' '}
          <span className="font-medium text-slate-900 dark:text-slate-100">{filteredJobs.length}</span> sur{' '}
          <span className="font-medium text-slate-900 dark:text-slate-100">{MOCK_JOBS.length}</span> offres
        </p>
        <div className="flex gap-2">
          <button className="px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-600 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed" disabled>
            Précédent
          </button>
          <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700">
            Suivant
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminJobs;
