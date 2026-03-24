'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Upload, Key, CreditCard, TrendingUp } from 'lucide-react';
import { STORAGE_KEYS } from '@/lib/constants';
import { authApi } from '@/lib/api/auth';

interface User {
  id: string;
  email: string;
  full_name: string;
}

interface Stats {
  totalJobs: number;
  thisMonthJobs: number;
}

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null);
  const [stats, setStats] = useState<Stats>({ totalJobs: 0, thisMonthJobs: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userStr = localStorage.getItem(STORAGE_KEYS.USER);
    if (userStr) {
      setUser(JSON.parse(userStr));
    }
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const response = await authApi.me();
      const userData = response.data;
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(userData));
      setUser(userData);

      setStats({
        totalJobs: userData.jobs_count || 0,
        thisMonthJobs: userData.jobs_this_month || 0,
      });
    } catch (error) {
      console.error('Error loading stats:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Welcome */}
      <div>
        <h1 className="text-3xl font-bold">
          Bienvenido, {user?.full_name?.split(' ')[0] || 'Usuario'}
        </h1>
        <p className="text-muted-foreground mt-1">Aquí está el resumen de tu actividad</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Facturas</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalJobs}</div>
            <p className="text-xs text-muted-foreground">Procesadas hasta ahora</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Este Mes</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.thisMonthJobs}</div>
            <p className="text-xs text-muted-foreground">Facturas procesadas</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">API Keys</CardTitle>
            <Key className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-muted-foreground">Claves activas</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Plan</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Free</div>
            <p className="text-xs text-muted-foreground">Plan actual</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Procesar Factura</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Sube una factura o PDF y extracmos los datos automáticamente
            </p>
            <div className="flex gap-2">
              <a
                href="/upload"
                className="inline-flex items-center justify-center rounded-md text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-4 py-2"
              >
                <Upload className="mr-2 h-4 w-4" />
                Subir Archivo
              </a>
              <a
                href="/api-keys"
                className="inline-flex items-center justify-center rounded-md text-sm font-medium border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2"
              >
                <Key className="mr-2 h-4 w-4" />
                Ver API
              </a>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Mejorar Plan</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Desbloquea más funciones con un plan pago
            </p>
            <a
              href="/subscription"
              className="inline-flex items-center justify-center rounded-md text-sm font-medium bg-teal-500 text-white hover:bg-teal-600 h-9 px-4 py-2"
            >
              Ver Planes
            </a>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
