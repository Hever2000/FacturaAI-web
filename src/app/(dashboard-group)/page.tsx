'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Upload, History, Key, ArrowRight, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { authApi } from '@/lib/api/auth';
import { subscriptionApi } from '@/lib/api/subscription';
import { jobsApi } from '@/lib/api/jobs';
import { STORAGE_KEYS } from '@/lib/constants';
import type { User } from '@/types/auth';
import type { Subscription } from '@/types/subscription';
import type { Job } from '@/types/jobs';

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [recentJobs, setRecentJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
    if (!token) {
      router.push('/login');
      return;
    }

    const fetchData = async () => {
      try {
        const [userRes, subRes, jobsRes] = await Promise.all([
          authApi.me(),
          subscriptionApi
            .current()
            .catch(() => ({
              data: {
                tier: 'free',
                status: 'active',
                monthly_limit: 100,
                monthly_used: 0,
                monthly_remaining: 100,
              } as Subscription,
            })),
          jobsApi.list({ page_size: 5 }),
        ]);
        setUser(userRes.data);
        setSubscription(subRes.data);
        setRecentJobs(jobsRes.data.jobs);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-teal-500" />
      </div>
    );
  }

  const usagePercent = subscription
    ? Math.round((subscription.monthly_used / subscription.monthly_limit) * 100)
    : 0;

  const usageColor =
    usagePercent > 90 ? 'text-red-400' : usagePercent > 70 ? 'text-yellow-400' : 'text-teal-400';

  const tierColors = {
    free: 'bg-slate-500',
    pro: 'bg-teal-500',
    enterprise: 'bg-purple-500',
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-slate-400">Bienvenido, {user?.full_name}</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Usage Card */}
        <Card className="border-slate-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-400">Uso mensual</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className={`text-2xl font-bold ${usageColor}`}>
                {subscription?.monthly_used || 0} / {subscription?.monthly_limit || 100}
              </div>
              <Progress value={usagePercent} className="h-2" />
              <p className="text-xs text-slate-500">
                {subscription?.monthly_remaining || 0} requests restantes
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Plan Card */}
        <Card className="border-slate-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-400">Plan actual</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Badge className={tierColors[subscription?.tier || 'free']}>
                  {(subscription?.tier || 'free').toUpperCase()}
                </Badge>
                <Badge variant="outline">{subscription?.status || 'active'}</Badge>
              </div>
              <p className="text-sm text-slate-400">
                {subscription?.tier === 'free'
                  ? '100 requests/mes'
                  : subscription?.tier === 'pro'
                    ? '1,000 requests/mes'
                    : '10,000 requests/mes'}
              </p>
              {subscription?.tier === 'free' && (
                <Link href="/subscription">
                  <Button size="sm" className="mt-2">
                    Mejorar plan
                  </Button>
                </Link>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="border-slate-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-400">Acciones rápidas</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Link href="/upload">
              <Button variant="outline" className="w-full justify-start">
                <Upload className="mr-2 h-4 w-4" />
                Procesar factura
              </Button>
            </Link>
            <Link href="/api-keys">
              <Button variant="outline" className="w-full justify-start">
                <Key className="mr-2 h-4 w-4" />
                Gestionar API Keys
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      {/* Recent Jobs */}
      <Card className="border-slate-800">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Procesamientos recientes</CardTitle>
              <CardDescription>Últimas facturas procesadas</CardDescription>
            </div>
            <Link href="/jobs">
              <Button variant="ghost" size="sm">
                Ver todos
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          {recentJobs.length === 0 ? (
            <div className="text-center py-8 text-slate-500">
              <History className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No hay facturas procesadas todavía</p>
              <Link href="/upload">
                <Button variant="link" className="mt-2">
                  Subir tu primera factura
                </Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {recentJobs.map((job) => (
                <Link key={job.id} href={`/jobs/${job.id}`}>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-slate-900/50 hover:bg-slate-900 transition-colors cursor-pointer">
                    <div className="flex items-center gap-3">
                      <FileIcon status={job.status} />
                      <div>
                        <p className="font-medium">{job.filename}</p>
                        <p className="text-sm text-slate-500">
                          {new Date(job.created_at).toLocaleDateString('es-AR')}
                        </p>
                      </div>
                    </div>
                    <Badge
                      variant={
                        job.status === 'completed'
                          ? 'default'
                          : job.status === 'failed'
                            ? 'destructive'
                            : 'secondary'
                      }
                      className={job.status === 'completed' ? 'bg-teal-500' : ''}
                    >
                      {job.status}
                    </Badge>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function FileIcon({ status }: { status: string }) {
  if (status === 'completed') {
    return (
      <div className="h-10 w-10 rounded-lg bg-teal-500/20 flex items-center justify-center">
        <History className="h-5 w-5 text-teal-400" />
      </div>
    );
  }
  if (status === 'failed') {
    return (
      <div className="h-10 w-10 rounded-lg bg-red-500/20 flex items-center justify-center">
        <History className="h-5 w-5 text-red-400" />
      </div>
    );
  }
  return (
    <div className="h-10 w-10 rounded-lg bg-slate-500/20 flex items-center justify-center">
      <History className="h-5 w-5 text-slate-400" />
    </div>
  );
}
