'use client';

import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import { useAuthStore } from '@/stores/auth-store';

const plans = [
  {
    name: 'Free',
    price: 0,
    description: 'Para probar el servicio',
    features: ['10 facturas/mes', 'Extracción básica', 'Soporte por email'],
    tier: 'free',
  },
  {
    name: 'Pro',
    price: 4900,
    description: 'Para profesionales y pequeños negocios',
    features: [
      'Facturas ilimitadas',
      'Extracción avanzada',
      'Soporte prioritario',
      'API access',
      'Exportación JSON',
    ],
    tier: 'pro',
  },
  {
    name: 'Enterprise',
    price: 14900,
    description: 'Para empresas con alto volumen',
    features: [
      'Todo en Pro',
      'Facturación mensual',
      'Soporte dedicado',
      'Integraciones personalizadas',
      'SLA garantizado',
    ],
    tier: 'enterprise',
  },
];

export function PricingSection() {
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();

  const handlePlanClick = (tier: string) => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }
    router.push('/subscription');
  };

  return (
    <section id="planes" className="py-24 px-6 bg-slate-950">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Planes y Precios</h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Elige el plan que mejor se adapte a tus necesidades
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <Card
              key={plan.tier}
              className={`border-slate-800 ${plan.tier === 'pro' ? 'ring-2 ring-teal-500' : ''}`}
            >
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {plan.name}
                  {plan.tier === 'pro' && (
                    <span className="text-xs bg-teal-500 text-white px-2 py-0.5 rounded">
                      Popular
                    </span>
                  )}
                </CardTitle>
                <CardDescription>
                  <span className="text-3xl font-bold">${plan.price.toLocaleString('es-AR')}</span>
                  <span className="text-muted-foreground">/mes</span>
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">{plan.description}</p>
                <ul className="space-y-2">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm">
                      <Check className="h-4 w-4 text-teal-500 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button
                  className="w-full mt-4"
                  variant={plan.tier === 'free' ? 'outline' : 'default'}
                  onClick={() => handlePlanClick(plan.tier)}
                >
                  {plan.tier === 'free' ? 'Comenzar Gratis' : 'Elegir Plan'}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
