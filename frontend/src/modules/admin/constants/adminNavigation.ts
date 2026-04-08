import {
  LayoutDashboard,
  Briefcase,
  Users,
  BarChart3,
  Settings,
} from 'lucide-react';

export interface NavigationItem {
  name: string;
  href: string;
  icon: any;
}

export const ADMIN_NAVIGATION: NavigationItem[] = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { name: 'Jobs', href: '/admin/jobs', icon: Briefcase },
  { name: 'Users', href: '/admin/users', icon: Users },
  { name: 'Analytics', href: '/admin/analytics', icon: BarChart3 },
  { name: 'Settings', href: '/admin/settings', icon: Settings },
];
