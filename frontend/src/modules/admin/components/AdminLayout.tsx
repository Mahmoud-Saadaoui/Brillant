import { ReactNode, useEffect, useState } from 'react';
import { Link, useNavigate, useLocation, Outlet } from 'react-router-dom';
import {
  Bell,
  LogOut,
  Menu,
  X,
  Search,
} from 'lucide-react';
import { useAppContext } from '../../../shared/context';
import { ADMIN_NAVIGATION } from '../constants';
import { MOCK_DASHBOARD_KPI } from '../data';

interface AdminLayoutProps {
  children?: ReactNode;
}

const AdminLayout = () => {
  const { auth, logout } = useAppContext();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // useEffect(() => {
  //   if (!auth || auth.role !== 'admin') {
  //     navigate('/login');
  //   }
  // }, [auth, navigate]);

  // if (!auth || auth.role !== 'admin') {
  //   return null;
  // }

  const isActivePath = (href: string) => {
    // Pour le dashboard (/admin), on vérifie si le pathname est exactement /admin
    if (href === '/admin') {
      return location.pathname === '/admin';
    }
    return location.pathname.startsWith(href);
  };

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-900 admin-dashboard">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-50 w-72 bg-white dark:bg-slate-800 shadow-xl
          transform transition-transform duration-300 lg:translate-x-0 flex flex-col
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        {/* Logo */}
        <div className="flex items-center justify-between h-16 px-6 border-b border-slate-200 dark:border-slate-700 shrink-0">
          <Link to="/admin" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 dark:from-blue-500 dark:to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-xl font-bold text-white">A</span>
            </div>
            <div>
              <span className="text-lg font-bold text-slate-900 dark:text-slate-100 block">
                Admin Panel
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400">Brillant</span>
            </div>
          </Link>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* User Info */}
        <div className="p-4 border-b border-slate-200 dark:border-slate-700 shrink-0">
          <div className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-700/50 rounded-xl">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700 rounded-full flex items-center justify-center shadow-md">
              <span className="text-lg font-bold text-white">
                {auth?.name?.charAt(0).toUpperCase() || 'A'}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-slate-900 dark:text-slate-100 truncate">
                {auth?.name || 'Admin User'}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                {'admin@brillant.com'}
              </p>
            </div>
          </div>
        </div>

        {/* Search in Sidebar */}
        <div className="p-4 shrink-0">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="search"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-sm border border-slate-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 transition-all"
            />
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-4 py-2 space-y-1">
          <p className="px-3 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mt-2 mb-2">
            Menu
          </p>
          {ADMIN_NAVIGATION.map((item) => {
            const Icon = item.icon;
            const isActive = isActivePath(item.href);
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`
                  flex items-center gap-3 px-3 py-3 text-sm font-medium rounded-xl
                  transition-all duration-200 group
                  ${isActive
                    ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 shadow-sm'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
                  }
                `}
                onClick={() => setSidebarOpen(false)}
              >
                <Icon className={`w-5 h-5 flex-shrink-0 ${isActive ? 'text-blue-600 dark:text-blue-400' : 'text-slate-500 dark:text-slate-400 group-hover:text-slate-700 dark:group-hover:text-slate-300'}`} />
                <span className="flex-1">{item.name}</span>
                {isActive && (
                  <span className="w-1.5 h-1.5 bg-blue-600 dark:bg-blue-400 rounded-full" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Quick Stats in Sidebar */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-700 shrink-0">
          <p className="px-3 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3">
            Quick Stats
          </p>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-xl">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-green-100 dark:bg-green-900/40 rounded-lg flex items-center justify-center">
                  <span className="text-lg">👥</span>
                </div>
                <div>
                  <p className="text-xs text-slate-600 dark:text-slate-400">Candidats</p>
                  <p className="text-sm font-bold text-slate-900 dark:text-slate-100">{MOCK_DASHBOARD_KPI.totalCandidates.toLocaleString()}</p>
                </div>
              </div>
              <span className="text-xs text-green-600 dark:text-green-400 font-medium">+12%</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/40 rounded-lg flex items-center justify-center">
                  <span className="text-lg">💼</span>
                </div>
                <div>
                  <p className="text-xs text-slate-600 dark:text-slate-400">Jobs Actifs</p>
                  <p className="text-sm font-bold text-slate-900 dark:text-slate-100">{MOCK_DASHBOARD_KPI.totalJobs.toLocaleString()}</p>
                </div>
              </div>
              <span className="text-xs text-blue-600 dark:text-blue-400 font-medium">+8%</span>
            </div>
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-700 shrink-0">
          <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-700/50 rounded-xl">
            <Link
              to="/"
              className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100"
            >
              <span>🏠</span>
              <span>Back to Home</span>
            </Link>
          </div>
          <button
            onClick={logout}
            className="flex items-center gap-3 w-full px-3 py-3 mt-2 text-sm font-medium rounded-xl text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="lg:pl-72">
        {/* Mobile Header Only */}
        <header className="sticky top-0 z-30 lg:hidden bg-white dark:bg-slate-800 shadow-sm border-b border-slate-200 dark:border-slate-700">
          <div className="flex items-center justify-between h-16 px-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
            >
              <Menu className="w-6 h-6" />
            </button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
                <span className="text-sm font-bold text-white">A</span>
              </div>
              <span className="font-semibold text-slate-900 dark:text-slate-100">Admin Panel</span>
            </div>
            <button className="relative p-2 text-slate-500 hover:text-slate-700 dark:hover:text-slate-300">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-4 lg:p-6 min-h-screen">
          <Outlet />
        </main>
      </div>

      <style>{`
        .admin-dashboard {
          font-family: 'Cairo', 'Open Sans', sans-serif;
        }
        /* Admin Dashboard Scrollbar */
        .admin-dashboard ::-webkit-scrollbar {
          width: 6px;
          height: 6px;
        }
        .admin-dashboard ::-webkit-scrollbar-track {
          background: transparent;
        }
        .admin-dashboard ::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 3px;
        }
        .admin-dashboard.dark ::-webkit-scrollbar-thumb {
          background: #475569;
        }
        .admin-dashboard ::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }
        .admin-dashboard.dark ::-webkit-scrollbar-thumb:hover {
          background: #64748b;
        }
      `}</style>
    </div>
  );
};

export default AdminLayout;
