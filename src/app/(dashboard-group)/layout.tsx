'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  FileText,
  LayoutDashboard,
  Upload,
  History,
  Key,
  CreditCard,
  Settings,
  LogOut,
  Menu,
  X,
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { STORAGE_KEYS } from '@/lib/constants';

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/upload', label: 'Procesar', icon: Upload },
  { href: '/jobs', label: 'Historial', icon: History },
  { href: '/api-keys', label: 'API Keys', icon: Key },
  { href: '/subscription', label: 'Suscripción', icon: CreditCard },
  { href: '/settings', label: 'Configuración', icon: Settings },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [showUserMenu, setShowUserMenu] = useState(false);

  useEffect(() => {
    const userStr = localStorage.getItem(STORAGE_KEYS.USER);
    if (userStr) {
      setUser(JSON.parse(userStr));
    }
  }, []);

  const initials =
    user?.full_name
      ?.split(' ')
      .map((n: string) => n[0])
      .join('')
      .toUpperCase() || 'U';

  const handleLogout = () => {
    localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
    localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
    localStorage.removeItem(STORAGE_KEYS.USER);
    router.push('/login');
  };

  return (
    <div className="flex h-screen bg-slate-950">
      {/* Sidebar */}
      <aside
        className={cn(
          'flex flex-col border-r border-slate-800 bg-slate-900 transition-all duration-300',
          sidebarOpen ? 'w-64' : 'w-16'
        )}
      >
        {/* Logo */}
        <div className="flex items-center gap-2 p-4 border-b border-slate-800">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-teal-500 to-teal-600">
            <FileText className="h-5 w-5 text-white" />
          </div>
          {sidebarOpen && (
            <span className="text-xl font-bold">
              Factura<span className="text-teal-400">AI</span>
            </span>
          )}
        </div>

        {/* Nav */}
        <nav className="flex-1 p-2 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link key={item.href} href={item.href}>
                <Button
                  variant={isActive ? 'secondary' : 'ghost'}
                  className={cn(
                    'w-full justify-start gap-3',
                    !sidebarOpen && 'justify-center px-0',
                    isActive && 'bg-teal-500/10 text-teal-400 hover:bg-teal-500/20'
                  )}
                >
                  <Icon className="h-5 w-5" />
                  {sidebarOpen && <span>{item.label}</span>}
                </Button>
              </Link>
            );
          })}
        </nav>

        {/* User */}
        <div className="p-2 border-t border-slate-800">
          <div className="relative">
            <Button
              variant="ghost"
              onClick={() => setShowUserMenu(!showUserMenu)}
              className={cn('w-full justify-start gap-3', !sidebarOpen && 'justify-center px-0')}
            >
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-teal-500/20 text-teal-400">{initials}</AvatarFallback>
              </Avatar>
              {sidebarOpen && (
                <div className="flex flex-col items-start text-left">
                  <span className="text-sm font-medium">{user?.full_name || 'Usuario'}</span>
                  <span className="text-xs text-slate-500">{user?.email || ''}</span>
                </div>
              )}
            </Button>

            {showUserMenu && (
              <div className="absolute bottom-full left-0 w-full mb-2 p-2 bg-slate-800 rounded-lg border border-slate-700 shadow-lg">
                <div className="text-xs text-slate-400 px-2 py-1">
                  {user?.full_name || 'Usuario'}
                </div>
                <div className="text-xs text-slate-500 px-2 py-1 mb-2">{user?.email || ''}</div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start"
                  onClick={() => router.push('/settings')}
                >
                  <Settings className="mr-2 h-4 w-4" />
                  Configuración
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start text-red-400"
                  onClick={handleLogout}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Cerrar sesión
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Toggle */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="absolute bottom-20 left-4 z-10"
        >
          {sidebarOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </Button>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-auto">
        <div className="p-6">{children}</div>
      </main>
    </div>
  );
}
