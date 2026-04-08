import { useState } from 'react';
import { Search, Filter, Plus, Eye, Edit, Trash2, Calendar, Users, DollarSign, FolderOpen, Clock, CheckCircle } from 'lucide-react';

const AdminProjects = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Helper pour obtenir les classes de couleur pour les stats
  const getStatColorClasses = (color: string) => {
    const colors: Record<string, { bg: string; text: string }> = {
      blue: { bg: 'bg-blue-100 dark:bg-blue-900/30', text: 'text-blue-600 dark:text-blue-400' },
      orange: { bg: 'bg-orange-100 dark:bg-orange-900/30', text: 'text-orange-600 dark:text-orange-400' },
      green: { bg: 'bg-green-100 dark:bg-green-900/30', text: 'text-green-600 dark:text-green-400' },
      purple: { bg: 'bg-purple-100 dark:bg-purple-900/30', text: 'text-purple-600 dark:text-purple-400' },
    };
    return colors[color] || colors.blue;
  };

  const projects = [
    {
      id: 1,
      name: 'TalentAI Platform Redesign',
      client: 'Internal',
      finishDate: '2024-05-15',
      price: '$15,000',
      team: ['JD', 'SM', 'AK', 'RL'],
      status: 'In Progress',
    },
    {
      id: 2,
      name: 'Mobile App Development',
      client: 'TechCorp Inc.',
      finishDate: '2024-06-20',
      price: '$25,000',
      team: ['JD', 'SM'],
      status: 'Completed',
    },
    {
      id: 3,
      name: 'Analytics Dashboard',
      client: 'DataFlow Ltd.',
      finishDate: '2024-04-30',
      price: '$8,500',
      team: ['AK', 'RL', 'MT'],
      status: 'Pending',
    },
    {
      id: 4,
      name: 'API Integration',
      client: 'CloudSystems',
      finishDate: '2024-03-25',
      price: '$5,200',
      team: ['SM'],
      status: 'Rejected',
    },
    {
      id: 5,
      name: 'Security Audit',
      client: 'SecureBank',
      finishDate: '2024-07-10',
      price: '$18,000',
      team: ['JD', 'AK', 'RL', 'SM', 'MT'],
      status: 'In Progress',
    },
    {
      id: 6,
      name: 'UX/UI Overhaul',
      client: 'DesignStudio',
      finishDate: '2024-05-01',
      price: '$12,000',
      team: ['JD', 'RL'],
      status: 'Completed',
    },
  ];

  const getStatusClasses = (status: string) => {
    const statusMap: Record<string, { bg: string; text: string }> = {
      'In Progress': { bg: 'bg-blue-100 dark:bg-blue-900/30', text: 'text-blue-700 dark:text-blue-400' },
      'Completed': { bg: 'bg-green-100 dark:bg-green-900/30', text: 'text-green-700 dark:text-green-400' },
      'Pending': { bg: 'bg-orange-100 dark:bg-orange-900/30', text: 'text-orange-700 dark:text-orange-400' },
      'Rejected': { bg: 'bg-red-100 dark:bg-red-900/30', text: 'text-red-700 dark:text-red-400' },
    };
    return statusMap[status] || statusMap['Pending'];
  };

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.client.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || project.status.toLowerCase().replace(' ', '-') === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100 relative pb-4 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-12 after:h-1 after:bg-blue-600">
            Projects
          </h1>
        </div>
        <button className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors self-start">
          <Plus className="w-4 h-4" />
          New Project
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Projects', value: '156', icon: FolderOpen, color: 'blue' },
          { label: 'Active', value: '45', icon: Clock, color: 'orange' },
          { label: 'Completed', value: '98', icon: CheckCircle, color: 'green' },
          { label: 'Total Revenue', value: '$1.2M', icon: DollarSign, color: 'purple' },
        ].map((stat) => {
          const Icon = stat.icon;
          const colorClasses = getStatColorClasses(stat.color);
          return (
            <div key={stat.label} className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600 dark:text-slate-400">{stat.label}</p>
                  <p className="text-2xl font-bold text-slate-900 dark:text-slate-100 mt-1">{stat.value}</p>
                </div>
                <div className={`w-12 h-12 ${colorClasses.bg} rounded-xl flex items-center justify-center`}>
                  <Icon className={`w-6 h-6 ${colorClasses.text}`} />
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
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100"
        >
          <option value="all">All Status</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
          <option value="pending">Pending</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>

      {/* Projects Table */}
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-700/50">
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                  Project Name
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                  Client
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                  Finish Date
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                  Budget
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                  Team
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
              {filteredProjects.map((project) => {
                const statusClasses = getStatusClasses(project.status);
                return (
                  <tr key={project.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors">
                    <td className="px-6 py-4">
                      <p className="font-medium text-slate-900 dark:text-slate-100">{project.name}</p>
                    </td>
                    <td className="px-6 py-4 text-slate-600 dark:text-slate-400">{project.client}</td>
                    <td className="px-6 py-4 text-slate-600 dark:text-slate-400">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        {new Date(project.finishDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </div>
                    </td>
                    <td className="px-6 py-4 font-medium text-slate-900 dark:text-slate-100">{project.price}</td>
                    <td className="px-6 py-4">
                      <div className="flex -space-x-2">
                        {project.team.map((member, idx) => (
                          <div
                            key={idx}
                            className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 border-2 border-white dark:border-slate-800 flex items-center justify-center text-xs font-medium text-blue-600 dark:text-blue-400"
                            title={member}
                          >
                            {member}
                          </div>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 text-xs font-medium rounded-full ${statusClasses.bg} ${statusClasses.text}`}>
                        {project.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors" title="View">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-slate-400 hover:text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg transition-colors" title="Edit">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors" title="Delete">
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

        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <p className="text-slate-500 dark:text-slate-400">No projects found matching your criteria.</p>
          </div>
        )}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Showing <span className="font-medium text-slate-900 dark:text-slate-100">1</span> to <span className="font-medium text-slate-900 dark:text-slate-100">{filteredProjects.length}</span> of <span className="font-medium text-slate-900 dark:text-slate-100">{projects.length}</span> results
        </p>
        <div className="flex gap-2">
          <button className="px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-600 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed" disabled>
            Previous
          </button>
          <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700">
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminProjects;
