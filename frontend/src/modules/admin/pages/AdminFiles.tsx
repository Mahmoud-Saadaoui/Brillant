import { useState } from 'react';
import { Search, Upload, FileText, Image, Video, FileArchive, FileCode, Filter, Download, Trash2, Eye } from 'lucide-react';

const AdminFiles = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');

  // Helper pour obtenir les classes de couleur pour les stats
  const getStatColorClasses = (color: string) => {
    const colors: Record<string, { bg: string; text: string }> = {
      blue: { bg: 'bg-blue-100 dark:bg-blue-900/30', text: 'text-blue-600 dark:text-blue-400' },
      red: { bg: 'bg-red-100 dark:bg-red-900/30', text: 'text-red-600 dark:text-red-400' },
      purple: { bg: 'bg-purple-100 dark:bg-purple-900/30', text: 'text-purple-600 dark:text-purple-400' },
      orange: { bg: 'bg-orange-100 dark:bg-orange-900/30', text: 'text-orange-600 dark:text-orange-400' },
    };
    return colors[color] || colors.blue;
  };

  const files = [
    { id: 1, name: 'Q4_2023_Report.pdf', type: 'pdf', size: '2.4 MB', user: 'John Doe', date: '2024-03-15' },
    { id: 2, name: 'Platform_Design.fig', type: 'figma', size: '15.8 MB', user: 'Designer', date: '2024-03-14' },
    { id: 3, name: 'presentation.pptx', type: 'presentation', size: '8.2 MB', user: 'Admin', date: '2024-03-13' },
    { id: 4, name: 'demo_video.mp4', type: 'video', size: '245.5 MB', user: 'Marketing', date: '2024-03-12' },
    { id: 5, name: 'database_backup.sql', type: 'code', size: '128.3 MB', user: 'System', date: '2024-03-11' },
    { id: 6, name: 'assets_bundle.zip', type: 'archive', size: '45.7 MB', user: 'Developer', date: '2024-03-10' },
    { id: 7, name: 'user_manual.pdf', type: 'pdf', size: '1.8 MB', user: 'Support', date: '2024-03-09' },
    { id: 8, name: 'logo_set.png', type: 'image', size: '3.2 MB', user: 'Designer', date: '2024-03-08' },
    { id: 9, name: 'api_docs.pdf', type: 'pdf', size: '4.5 MB', user: 'Developer', date: '2024-03-07' },
    { id: 10, name: 'interview_template.docx', type: 'document', size: '256 KB', user: 'HR', date: '2024-03-06' },
    { id: 11, name: 'training_material.pdf', type: 'pdf', size: '12.1 MB', user: 'Training', date: '2024-03-05' },
    { id: 12, name: 'project_files.zip', type: 'archive', size: '89.4 MB', user: 'Admin', date: '2024-03-04' },
  ];

  const getFileIcon = (type: string) => {
    const icons: Record<string, { icon: any; color: string }> = {
      'pdf': { icon: FileText, color: 'text-red-600' },
      'figma': { icon: Image, color: 'text-purple-600' },
      'presentation': { icon: FileText, color: 'text-orange-600' },
      'video': { icon: Video, color: 'text-blue-600' },
      'code': { icon: FileCode, color: 'text-green-600' },
      'archive': { icon: FileArchive, color: 'text-yellow-600' },
      'image': { icon: Image, color: 'text-purple-600' },
      'document': { icon: FileText, color: 'text-blue-600' },
    };
    return icons[type] || icons['document'];
  };

  const filteredFiles = files.filter(file => {
    const matchesSearch = file.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         file.user.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = typeFilter === 'all' || file.type === typeFilter;
    return matchesSearch && matchesType;
  });

  const stats = [
    { label: 'Total Files', value: files.length.toString(), size: '542.3 MB', color: 'blue' },
    { label: 'Documents', value: files.filter(f => ['pdf', 'document'].includes(f.type)).length.toString(), size: '21.2 MB', color: 'red' },
    { label: 'Media', value: files.filter(f => ['image', 'video'].includes(f.type)).length.toString(), size: '248.7 MB', color: 'purple' },
    { label: 'Archives', value: files.filter(f => ['archive', 'zip'].includes(f.type)).length.toString(), size: '135.1 MB', color: 'orange' },
  ];

  const totalStorage = '542.3 MB';
  const usedStorage = 45;
  const storageLimit = '1 GB';

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100 relative pb-4 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-12 after:h-1 after:bg-blue-600">
            File Manager
          </h1>
        </div>
        <button className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors self-start">
          <Upload className="w-4 h-4" />
          Upload Files
        </button>
      </div>

      {/* Storage Overview */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-700 dark:to-blue-800 rounded-xl p-6 text-white">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          <div>
            <h3 className="text-lg font-semibold mb-1">Storage Overview</h3>
            <p className="text-blue-100 text-sm">{totalStorage} of {storageLimit} used</p>
          </div>
          <div className="flex-1 max-w-md">
            <div className="h-4 bg-white/20 rounded-full overflow-hidden">
              <div
                className="h-full bg-white rounded-full transition-all duration-500"
                style={{ width: `${usedStorage}%` }}
              />
            </div>
            <div className="flex justify-between text-xs mt-2 text-blue-100">
              <span>{usedStorage}% used</span>
              <span>{100 - usedStorage}% available</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const colorClasses = getStatColorClasses(stat.color);
          return (
            <div key={stat.label} className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
              <div className="flex items-center justify-between mb-3">
                <div className={`w-10 h-10 ${colorClasses.bg} rounded-lg flex items-center justify-center`}>
                  <FileText className={`w-5 h-5 ${colorClasses.text}`} />
                </div>
                <span className="text-xs text-slate-500 dark:text-slate-400">{stat.size}</span>
              </div>
              <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">{stat.value}</p>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">{stat.label}</p>
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
            placeholder="Search files..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100"
          />
        </div>
        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100"
        >
          <option value="all">All Types</option>
          <option value="pdf">PDFs</option>
          <option value="image">Images</option>
          <option value="video">Videos</option>
          <option value="archive">Archives</option>
          <option value="code">Code</option>
        </select>
        <button className="inline-flex items-center gap-2 px-4 py-2 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-600 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
          <Filter className="w-4 h-4" />
          Filters
        </button>
      </div>

      {/* Files List */}
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-700/50">
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                  File Name
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                  Size
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                  Uploaded By
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
              {filteredFiles.map((file) => {
                const { icon: Icon, color } = getFileIcon(file.type);
                return (
                  <tr key={file.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-slate-100 dark:bg-slate-700 rounded-lg flex items-center justify-center">
                          <Icon className={`w-5 h-5 ${color}`} />
                        </div>
                        <span className="font-medium text-slate-900 dark:text-slate-100">{file.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 text-xs font-medium bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-full capitalize">
                        {file.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-600 dark:text-slate-400">{file.size}</td>
                    <td className="px-6 py-4 text-slate-600 dark:text-slate-400">{file.user}</td>
                    <td className="px-6 py-4 text-slate-600 dark:text-slate-400">
                      {new Date(file.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors" title="Download">
                          <Download className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-slate-400 hover:text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg transition-colors" title="Preview">
                          <Eye className="w-4 h-4" />
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

        {filteredFiles.length === 0 && (
          <div className="text-center py-12">
            <FileText className="w-12 h-12 text-slate-400 mx-auto mb-4" />
            <p className="text-slate-500 dark:text-slate-400">No files found matching your criteria.</p>
          </div>
        )}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Showing <span className="font-medium text-slate-900 dark:text-slate-100">1</span> to <span className="font-medium text-slate-900 dark:text-slate-100">{filteredFiles.length}</span> of <span className="font-medium text-slate-900 dark:text-slate-100">{files.length}</span> files
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

export default AdminFiles;
