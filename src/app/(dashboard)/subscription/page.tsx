'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Loader2, Check, CreditCard } from 'lucide-react';
import { subscriptionApi } from '@/lib/api/subscription';
import { toast } from 'sonner';
import type { Subscription, Plan } from '@/types/subscription';

const PLAN_FEATURES: Record<string, string[]> = {
  free: ['100 requests/mes', '2 requests/min', 'Soporte por email'],
  pro: ['1,000 requests/mes', '10 requests/min', 'Soporte prioritario', 'API keys ilimitadas'],
  enterprise: [
    '10,000 requests/mes',
    '20 requests/min',
    'Soporte dedicado',
    'API keys ilimitadas',
    'Exportar datos',
  ],
};

export default function SubscriptionPage() {
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);
  const [upgrading, setUpgrading] = useState<string | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [subRes, plansRes] = await Promise.all([
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
        subscriptionApi.plans(),
      ]);
      setSubscription(subRes.data);
      setPlans(plansRes.data.plans);
    } catch (error) {
      console.error('Error fetching subscription:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpgrade = async (tier: 'pro' | 'enterprise') => {
    setUpgrading(tier);
    try {
      const response = await subscriptionApi.checkout(tier);
      const url = response.data.sandbox_init_point || response.data.init_point;
      window.open(url, '_blank');
      toast.success('Redirigiendo a Mercado Pago...');
    } catch (error) {
      toast.error('Error al iniciar el pago');
    } finally {
      setUpgrading(null);
    }
  };

  const handlePause = async () => {
    try {
      await subscriptionApi.pause();
      toast.success('Suscripción pausada');
      fetchData();
    } catch (error) {
      toast.error('Error al pausar la suscripción');
    }
  };

  const handleResume = async () => {
    try {
      await subscriptionApi.resume();
      toast.success('Suscripción reactivada');
      fetchData();
    } catch (error) {
      toast.error('Error al reanudar la suscripción');
    }
  };

  const handleCancel = async () => {
    if (!confirm('¿Estás seguro de cancelar tu suscripción?')) return;
    try {
      await subscriptionApi.cancel();
      toast.success('Suscripción cancelada');
      fetchData();
    } catch (error) {
      toast.error('Error al cancelar la suscripción');
    }
  };

  const tierColors = {
    free: 'bg-slate-500',
    pro: 'bg-teal-500',
    enterprise: 'bg-purple-500',
  };

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

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Suscripción</h1>
        <p className="text-slate-400">Gestiona tu plan y facturación</p>
      </div>

      {/* Current Plan */}
      <Card className="border-slate-800">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Plan actual</CardTitle>
              <CardDescription>Tu suscripción actual</CardDescription>
            </div>
            <Badge className={tierColors[subscription?.tier || 'free']}>
              {(subscription?.tier || 'free').toUpperCase()}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between text-sm">
            <span>Uso mensual</span>
            <span className="font-medium">
              {subscription?.monthly_used || 0} / {subscription?.monthly_limit || 100}
            </span>
          </div>
          <Progress value={usagePercent} className="h-2" />
          <p className="text-sm text-slate-500">
            {subscription?.monthly_remaining || 0} requests restantes
          </p>

          {subscription?.tier !== 'free' && (
            <div className="flex gap-2 pt-4 border-t border-slate-800">
              {subscription?.status === 'active' ? (
                <Button variant="outline" onClick={handlePause}>
                  Pausar
                </Button>
              ) : (
                <Button variant="outline" onClick={handleResume}>
                  Reanudar
                </Button>
              )}
              <Button variant="destructive" onClick={handleCancel}>
                Cancelar
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Plans */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {plans.map((plan) => {
          const tier = plan.name.toLowerCase();
          const isCurrent = subscription?.tier === tier;
          const isUpgrade =
            (tier === 'pro' || tier === 'enterprise') && subscription?.tier === 'free';

          return (
            <Card
              key={plan.id}
              className={`border-slate-800 ${isCurrent ? 'ring-2 ring-teal-500' : ''}`}
            >
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {plan.name}
                  {isCurrent && <Badge className="bg-teal-500">Actual</Badge>}
                </CardTitle>
                <CardDescription>
                  <span className="text-2xl font-bold">${plan.price.toLocaleString('es-AR')}</span>
                  <span className="text-slate-500">/mes</span>
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2">
                  {PLAN_FEATURES[tier]?.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm">
                      <Check className="h-4 w-4 text-teal-500" />
                      {feature}
                    </li>
                  ))}
                </ul>

                {isCurrent ? (
                  <Button variant="outline" className="w-full" disabled>
                    Plan actual
                  </Button>
                ) : tier === 'free' ? (
                  <Button variant="outline" className="w-full" disabled>
                    Free (gratis)
                  </Button>
                ) : (
                  <Button
                    className="w-full"
                    onClick={() => handleUpgrade(tier as 'pro' | 'enterprise')}
                    disabled={upgrading !== null}
                  >
                    {upgrading === tier ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : isUpgrade ? (
                      <>
                        <CreditCard className="h-4 w-4 mr-2" />
                        Mejorar a {plan.name}
                      </>
                    ) : (
                      `Cambiar a ${plan.name}`
                    )}
                  </Button>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
