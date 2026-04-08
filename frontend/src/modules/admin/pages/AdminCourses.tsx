import { useState } from 'react';
import { Search, Plus, BookOpen, Users, Clock, Star, Filter } from 'lucide-react';

const AdminCourses = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

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

  const courses = [
    {
      id: 1,
      title: 'Complete React Development',
      instructor: 'John Smith',
      category: 'Development',
      students: 1234,
      rating: 4.8,
      duration: '24 hours',
      price: '$99',
      image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=300&h=200&fit=crop',
      status: 'published',
    },
    {
      id: 2,
      title: 'UI/UX Design Fundamentals',
      instructor: 'Sarah Johnson',
      category: 'Design',
      students: 892,
      rating: 4.6,
      duration: '18 hours',
      price: '$79',
      image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=300&h=200&fit=crop',
      status: 'published',
    },
    {
      id: 3,
      title: 'Data Science with Python',
      instructor: 'Mike Chen',
      category: 'Data Science',
      students: 2341,
      rating: 4.9,
      duration: '36 hours',
      price: '$149',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=300&h=200&fit=crop',
      status: 'published',
    },
    {
      id: 4,
      title: 'Digital Marketing Mastery',
      instructor: 'Emily Davis',
      category: 'Marketing',
      students: 567,
      rating: 4.5,
      duration: '12 hours',
      price: '$59',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=300&h=200&fit=crop',
      status: 'draft',
    },
    {
      id: 5,
      title: 'Machine Learning Basics',
      instructor: 'Dr. Alex Turner',
      category: 'Data Science',
      students: 1876,
      rating: 4.7,
      duration: '28 hours',
      price: '$129',
      image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=300&h=200&fit=crop',
      status: 'published',
    },
    {
      id: 6,
      title: 'Business Communication',
      instructor: 'Lisa Wang',
      category: 'Business',
      students: 423,
      rating: 4.4,
      duration: '8 hours',
      price: '$49',
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=300&h=200&fit=crop',
      status: 'draft',
    },
  ];

  const categories = ['all', 'Development', 'Design', 'Data Science', 'Marketing', 'Business'];

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.instructor.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || course.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const stats = [
    { label: 'Total Courses', value: courses.length.toString(), icon: BookOpen, color: 'blue' },
    { label: 'Total Students', value: '7,333', icon: Users, color: 'green' },
    { label: 'Avg. Rating', value: '4.7', icon: Star, color: 'orange' },
    { label: 'Total Hours', value: '126', icon: Clock, color: 'purple' },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100 relative pb-4 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-12 after:h-1 after:bg-blue-600">
            Courses Management
          </h1>
        </div>
        <button className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors self-start">
          <Plus className="w-4 h-4" />
          New Course
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
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
            placeholder="Search courses..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100"
          />
        </div>
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat === 'all' ? 'All Categories' : cat}
            </option>
          ))}
        </select>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course) => (
          <div key={course.id} className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden hover:shadow-md transition-shadow">
            {/* Course Image */}
            <div className="relative h-48 overflow-hidden">
              <img
                src={course.image}
                alt={course.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 left-3">
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                  course.status === 'published'
                    ? 'bg-green-500 text-white'
                    : 'bg-slate-700 text-white'
                }`}>
                  {course.status}
                </span>
              </div>
              <div className="absolute top-3 right-3">
                <span className="px-2 py-1 text-xs font-medium bg-white/90 dark:bg-slate-800/90 rounded-full">
                  {course.category}
                </span>
              </div>
            </div>

            {/* Course Info */}
            <div className="p-5">
              <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-2 line-clamp-2">
                {course.title}
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">{course.instructor}</p>

              {/* Stats */}
              <div className="flex items-center gap-4 text-sm text-slate-600 dark:text-slate-400 mb-4">
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  <span>{course.students.toLocaleString()}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{course.duration}</span>
                </div>
                <div className="flex items-center gap-1 text-orange-500">
                  <Star className="w-4 h-4 fill-current" />
                  <span>{course.rating}</span>
                </div>
              </div>

              {/* Price & Action */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-700">
                <span className="text-xl font-bold text-slate-900 dark:text-slate-100">{course.price}</span>
                <button className="px-4 py-2 text-sm font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors">
                  Manage
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredCourses.length === 0 && (
        <div className="text-center py-12 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
          <BookOpen className="w-12 h-12 text-slate-400 mx-auto mb-4" />
          <p className="text-slate-500 dark:text-slate-400">No courses found matching your criteria.</p>
        </div>
      )}

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Showing <span className="font-medium text-slate-900 dark:text-slate-100">1</span> to <span className="font-medium text-slate-900 dark:text-slate-100">{filteredCourses.length}</span> of <span className="font-medium text-slate-900 dark:text-slate-100">{courses.length}</span> courses
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

export default AdminCourses;
