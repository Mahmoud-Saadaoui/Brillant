import { useState } from 'react';
import { Mail, Phone, MapPin, Calendar, Briefcase, Award, Edit } from 'lucide-react';

const AdminProfile = () => {
  const [isEditing, setIsEditing] = useState(false);

  const profile = {
    name: 'Admin User',
    email: 'admin@talentai.com',
    phone: '+1 234 567 8900',
    location: 'San Francisco, CA',
    joinDate: 'January 15, 2023',
    role: 'Administrator',
    department: 'Platform Operations',
  };

  const skills = [
    { name: 'System Administration', level: 95 },
    { name: 'User Management', level: 88 },
    { name: 'Security Operations', level: 92 },
    { name: 'Data Analysis', level: 78 },
    { name: 'Team Leadership', level: 85 },
  ];

  const activities = [
    {
      action: 'Updated system settings',
      desc: 'Modified platform configuration for enhanced performance',
      time: '2 hours ago',
      type: 'update',
    },
    {
      action: 'Reviewed user reports',
      desc: 'Analyzed and resolved 15 user tickets',
      time: '5 hours ago',
      type: 'review',
    },
    {
      action: 'Team meeting completed',
      desc: 'Weekly sync with development team',
      time: '1 day ago',
      type: 'meeting',
    },
    {
      action: 'Security audit initiated',
      desc: 'Started quarterly security assessment',
      time: '2 days ago',
      type: 'security',
    },
  ];

  const stats = [
    { label: 'Projects Managed', value: '47' },
    { label: 'Tickets Resolved', value: '1,234' },
    { label: 'Team Members', value: '12' },
    { label: 'Efficiency Rate', value: '98%' },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100 relative pb-4 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-12 after:h-1 after:bg-blue-600">
            Profile
          </h1>
        </div>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Edit className="w-4 h-4" />
          {isEditing ? 'Cancel' : 'Edit Profile'}
        </button>
      </div>

      {/* Profile Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 h-32"></div>
          <div className="px-6 pb-6">
            <div className="relative -mt-16 mb-4">
              <div className="w-32 h-32 bg-white dark:bg-slate-800 rounded-full border-4 border-white dark:border-slate-800 flex items-center justify-center">
                <span className="text-4xl font-bold text-blue-600 dark:text-blue-400">
                  {profile.name.charAt(0)}
                </span>
              </div>
            </div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">{profile.name}</h2>
            <p className="text-slate-600 dark:text-slate-400">{profile.role}</p>
            <p className="text-sm text-slate-500 dark:text-slate-500 mt-1">{profile.department}</p>

            <div className="mt-6 space-y-3">
              <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400">
                <Mail className="w-4 h-4" />
                {profile.email}
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400">
                <Phone className="w-4 h-4" />
                {profile.phone}
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400">
                <MapPin className="w-4 h-4" />
                {profile.location}
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400">
                <Calendar className="w-4 h-4" />
                Joined {profile.joinDate}
              </div>
            </div>
          </div>
        </div>

        {/* Stats & Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat) => (
              <div key={stat.label} className="bg-white dark:bg-slate-800 rounded-xl p-4 shadow-sm border border-slate-200 dark:border-slate-700 text-center">
                <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">{stat.value}</p>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Bio */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-3">About</h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Experienced platform administrator with a strong background in system management,
              user support, and team leadership. Passionate about creating efficient workflows
              and ensuring optimal platform performance for all users.
            </p>
          </div>

          {/* Skills */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4">Skills & Expertise</h3>
            <div className="space-y-4">
              {skills.map((skill) => (
                <div key={skill.name}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-slate-700 dark:text-slate-300">{skill.name}</span>
                    <span className="text-slate-600 dark:text-slate-400">{skill.level}%</span>
                  </div>
                  <div className="h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-600 rounded-full transition-all duration-500"
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4">Recent Activity</h3>
        <div className="space-y-4">
          {activities.map((activity, idx) => (
            <div key={idx} className="flex gap-4 pb-4 border-b border-slate-100 dark:border-slate-700 last:border-0 last:pb-0">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                activity.type === 'update' ? 'bg-blue-100 dark:bg-blue-900/30' :
                activity.type === 'review' ? 'bg-green-100 dark:bg-green-900/30' :
                activity.type === 'meeting' ? 'bg-purple-100 dark:bg-purple-900/30' :
                'bg-orange-100 dark:bg-orange-900/30'
              }`}>
                {activity.type === 'update' && <Edit className="w-5 h-5 text-blue-600 dark:text-blue-400" />}
                {activity.type === 'review' && <Award className="w-5 h-5 text-green-600 dark:text-green-400" />}
                {activity.type === 'meeting' && <Briefcase className="w-5 h-5 text-purple-600 dark:text-purple-400" />}
                {activity.type === 'security' && <Award className="w-5 h-5 text-orange-600 dark:text-orange-400" />}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-slate-900 dark:text-slate-100">{activity.action}</p>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">{activity.desc}</p>
                <p className="text-xs text-slate-500 mt-2">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
