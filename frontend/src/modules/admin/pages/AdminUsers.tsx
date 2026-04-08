import { useState } from 'react';
import { Search, Eye, Edit, Trash2, Shield, Check, X } from 'lucide-react';
import { MOCK_USERS, USER_STATUS, USER_ROLES } from '../data';

const AdminUsers = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  // Helper pour obtenir les classes de couleur pour les stats
  const getStatColorClasses = (color: string) => {
    const colors: Record<string, { bg: string; text: string }> = {
      blue: { bg: 'bg-blue-100 dark:bg-blue-900/30', text: 'text-blue-600 dark:text-blue-400' },
      green: { bg: 'bg-green-100 dark:bg-green-900/30', text: 'text-green-600 dark:text-green-400' },
      purple: { bg: 'bg-purple-100 dark:bg-purple-900/30', text: 'text-purple-600 dark:text-purple-400' },
      emerald: { bg: 'bg-emerald-100 dark:bg-emerald-900/30', text: 'text-emerald-600 dark:text-emerald-400' },
    };
    return colors[color] || colors.blue;
  };

  const filteredUsers = MOCK_USERS.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const getRoleClasses = (role: string) => {
    const roleMap: Record<string, { bg: string; text: string; label: string }> = {
      candidate: { bg: 'bg-blue-100 dark:bg-blue-900/30', text: 'text-blue-700 dark:text-blue-400', label: 'Candidat' },
      recruiter: { bg: 'bg-purple-100 dark:bg-purple-900/30', text: 'text-purple-700 dark:text-purple-400', label: 'Recruteur' },
      admin: { bg: 'bg-green-100 dark:bg-green-900/30', text: 'text-green-700 dark:text-green-400', label: 'Admin' },
    };
    return roleMap[role] || roleMap.candidate;
  };

  const getStatusClasses = (status: string) => {
    const statusMap: Record<string, { bg: string; text: string; label: string }> = {
      active: { bg: 'bg-green-100 dark:bg-green-900/30', text: 'text-green-700 dark:text-green-400', label: 'Actif' },
      inactive: { bg: 'bg-gray-100 dark:bg-gray-900/30', text: 'text-gray-700 dark:text-gray-400', label: 'Inactif' },
      suspended: { bg: 'bg-red-100 dark:bg-red-900/30', text: 'text-red-700 dark:text-red-400', label: 'Suspendu' },
      pending: { bg: 'bg-orange-100 dark:bg-orange-900/30', text: 'text-orange-700 dark:text-orange-400', label: 'En attente' },
    };
    return statusMap[status] || statusMap.active;
  };

  // Stats
  const stats = [
    {
      label: 'Total Utilisateurs',
      value: MOCK_USERS.length.toString(),
      color: 'blue',
    },
    {
      label: 'Candidats',
      value: MOCK_USERS.filter((u) => u.role === 'candidate').length.toString(),
      color: 'green',
    },
    {
      label: 'Recruteurs',
      value: MOCK_USERS.filter((u) => u.role === 'recruiter').length.toString(),
      color: 'purple',
    },
    {
      label: 'Actifs',
      value: MOCK_USERS.filter((u) => u.status === 'active').length.toString(),
      color: 'emerald',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            Utilisateurs
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">
            Gérer tous les utilisateurs de la plateforme
          </p>
        </div>
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
                  <Shield className={`w-6 h-6 ${colorClasses.text}`} />
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
            placeholder="Rechercher par nom ou email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100"
          />
        </div>
        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          className="px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100"
        >
          <option value="all">Tous les rôles</option>
          <option value="candidate">Candidats</option>
          <option value="recruiter">Recruteurs</option>
          <option value="admin">Admins</option>
        </select>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100"
        >
          <option value="all">Tous les statuts</option>
          <option value="active">Actifs</option>
          <option value="inactive">Inactifs</option>
          <option value="suspended">Suspendus</option>
          <option value="pending">En attente</option>
        </select>
      </div>

      {/* Users Table */}
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-700/50">
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                  Utilisateur
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                  Rôle
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                  Statut
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                  Date d'inscription
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                  Profil
                </th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
              {filteredUsers.map((user) => {
                const roleClasses = getRoleClasses(user.role);
                const statusClasses = getStatusClasses(user.status);
                return (
                  <tr key={user.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                          <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">
                            {user.avatar}
                          </span>
                        </div>
                        <span className="font-medium text-slate-900 dark:text-slate-100">{user.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-600 dark:text-slate-400">{user.email}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 text-xs font-medium rounded-full ${roleClasses.bg} ${roleClasses.text}`}>
                        {roleClasses.label}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 text-xs font-medium rounded-full ${statusClasses.bg} ${statusClasses.text}`}>
                        {statusClasses.label}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-600 dark:text-slate-400">
                      {new Date(user.joinDate).toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' })}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-blue-600 rounded-full"
                            style={{ width: `${user.profileComplete}%` }}
                          />
                        </div>
                        <span className="text-sm text-slate-600 dark:text-slate-400">{user.profileComplete}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors" title="Voir">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-slate-400 hover:text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg transition-colors" title="Modifier">
                          <Edit className="w-4 h-4" />
                        </button>
                        {user.status === 'active' ? (
                          <button className="p-2 text-slate-400 hover:text-orange-600 hover:bg-orange-50 dark:hover:bg-orange-900/20 rounded-lg transition-colors" title="Désactiver">
                            <X className="w-4 h-4" />
                          </button>
                        ) : (
                          <button className="p-2 text-slate-400 hover:text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg transition-colors" title="Activer">
                            <Check className="w-4 h-4" />
                          </button>
                        )}
                        <button className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors" title="Supprimer">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {filteredUsers.length === 0 && (
          <div className="text-center py-12">
            <Shield className="w-12 h-12 text-slate-400 mx-auto mb-4" />
            <p className="text-slate-500 dark:text-slate-400">Aucun utilisateur trouvé correspondant à vos critères.</p>
          </div>
        )}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Affichage de <span className="font-medium text-slate-900 dark:text-slate-100">1</span> à{' '}
          <span className="font-medium text-slate-900 dark:text-slate-100">{filteredUsers.length}</span> sur{' '}
          <span className="font-medium text-slate-900 dark:text-slate-100">{MOCK_USERS.length}</span> utilisateurs
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

export default AdminUsers;
