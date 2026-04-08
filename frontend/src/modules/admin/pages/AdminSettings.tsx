import { useState } from 'react';
import { User, Bell, Lock, Palette, Globe, Shield } from 'lucide-react';

const AdminSettings = () => {
  const [activeTab, setActiveTab] = useState('profile');

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Lock },
    { id: 'appearance', label: 'Appearance', icon: Palette },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100 relative pb-4 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-12 after:h-1 after:bg-blue-600">
            Settings
          </h1>
        </div>
      </div>

      {/* Settings Tabs */}
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
        {/* Tab Navigation */}
        <div className="border-b border-slate-200 dark:border-slate-700">
          <nav className="flex overflow-x-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-4 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'border-blue-600 text-blue-600 dark:text-blue-400'
                      : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {activeTab === 'profile' && (
            <div className="space-y-6 max-w-2xl">
              <div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-2">Profile Information</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">Update your account profile information</p>
              </div>

              <div className="flex items-center gap-6">
                <div className="w-24 h-24 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                  <span className="text-3xl font-bold text-blue-600 dark:text-blue-400">A</span>
                </div>
                <div>
                  <button className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors">
                    Change Photo
                  </button>
                  <p className="text-xs text-slate-500 mt-2">JPG, PNG or GIF. Max 2MB.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">First Name</label>
                  <input
                    type="text"
                    defaultValue="Admin"
                    className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Last Name</label>
                  <input
                    type="text"
                    defaultValue="User"
                    className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Email Address</label>
                  <input
                    type="email"
                    defaultValue="admin@talentai.com"
                    className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Bio</label>
                  <textarea
                    rows={4}
                    defaultValue="Platform administrator with expertise in system management and user support."
                    className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 resize-none"
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <button className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors">
                  Save Changes
                </button>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="space-y-6 max-w-2xl">
              <div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-2">Notification Preferences</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">Choose which notifications you want to receive</p>
              </div>

              <div className="space-y-4">
                {[
                  { label: 'Email notifications', desc: 'Receive email updates about your account activity' },
                  { label: 'Push notifications', desc: 'Receive push notifications on your devices' },
                  { label: 'New user registrations', desc: 'Get notified when new users join the platform' },
                  { label: 'Job postings', desc: 'Notifications about new job postings' },
                  { label: 'System updates', desc: 'Important system and security updates' },
                  { label: 'Marketing emails', desc: 'Receive news, tips, and promotional offers' },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between py-3 border-b border-slate-100 dark:border-slate-700 last:border-0">
                    <div>
                      <p className="font-medium text-slate-900 dark:text-slate-100">{item.label}</p>
                      <p className="text-sm text-slate-600 dark:text-slate-400">{item.desc}</p>
                    </div>
                    <button
                      onClick={() => {}}
                      className={`relative w-12 h-6 rounded-full transition-colors ${
                        idx < 4 ? 'bg-blue-600' : 'bg-slate-300 dark:bg-slate-600'
                      }`}
                    >
                      <span
                        className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${
                          idx < 4 ? 'translate-x-7' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="space-y-6 max-w-2xl">
              <div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-2">Security Settings</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">Manage your account security preferences</p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Current Password</label>
                  <input
                    type="password"
                    className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">New Password</label>
                  <input
                    type="password"
                    className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Confirm New Password</label>
                  <input
                    type="password"
                    className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-slate-200 dark:border-slate-700">
                <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-4">Two-Factor Authentication</h4>
                <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-700/50 rounded-lg">
                  <div>
                    <p className="font-medium text-slate-900 dark:text-slate-100">Enable 2FA</p>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Add an extra layer of security</p>
                  </div>
                  <button className="px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition-colors">
                    Enable
                  </button>
                </div>
              </div>

              <div className="flex justify-end">
                <button className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors">
                  Update Security
                </button>
              </div>
            </div>
          )}

          {activeTab === 'appearance' && (
            <div className="space-y-6 max-w-2xl">
              <div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-2">Appearance Settings</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">Customize the look and feel of your dashboard</p>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-4">Theme</h4>
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { name: 'Light', bg: 'bg-white', border: 'border-slate-200' },
                    { name: 'Dark', bg: 'bg-slate-800', border: 'border-slate-600' },
                    { name: 'System', bg: 'bg-gradient-to-br from-white to-slate-800', border: 'border-slate-400' },
                  ].map((theme) => (
                    <button
                      key={theme.name}
                      className={`p-4 rounded-xl border-2 ${theme.border} hover:border-blue-500 transition-colors`}
                    >
                      <div className={`w-full h-16 ${theme.bg} rounded-lg mb-2`}></div>
                      <p className="text-sm font-medium text-slate-900 dark:text-slate-100">{theme.name}</p>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-4">Accent Color</h4>
                <div className="flex gap-3">
                  {[
                    { color: 'bg-blue-600', name: 'Blue' },
                    { color: 'bg-purple-600', name: 'Purple' },
                    { color: 'bg-green-600', name: 'Green' },
                    { color: 'bg-orange-600', name: 'Orange' },
                    { color: 'bg-red-600', name: 'Red' },
                  ].map((accent) => (
                    <button
                      key={accent.name}
                      className={`w-10 h-10 ${accent.color} rounded-full ring-2 ring-offset-2 ring-transparent hover:ring-slate-400 transition-all`}
                      title={accent.name}
                    />
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-4">Language</h4>
                <select className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100">
                  <option>English (US)</option>
                  <option>English (UK)</option>
                  <option>French</option>
                  <option>Arabic</option>
                  <option>Spanish</option>
                </select>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;
