'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Loader2, User } from 'lucide-react';
import { authApi } from '@/lib/api/auth';
import { toast } from 'sonner';
import { STORAGE_KEYS } from '@/lib/constants';

export default function SettingsPage() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userStr = localStorage.getItem(STORAGE_KEYS.USER);
    if (userStr) {
      const user = JSON.parse(userStr);
      setFullName(user.full_name || '');
      setEmail(user.email || '');
    }
    setLoading(false);
  }, []);

  const handleSave = async () => {
    toast.success('Configuración guardada');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-teal-500" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Configuración</h1>
        <p className="text-slate-400">Gestiona tu cuenta</p>
      </div>

      {/* Profile */}
      <Card className="border-slate-800">
        <CardHeader>
          <div className="flex items-center gap-2">
            <User className="h-5 w-5 text-slate-400" />
            <CardTitle>Perfil</CardTitle>
          </div>
          <CardDescription>Información de tu cuenta</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Nombre completo</label>
            <Input value={fullName} onChange={(e) => setFullName(e.target.value)} />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Email</label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled
              className="opacity-50"
            />
            <p className="text-xs text-slate-500">El email no puede ser modificado</p>
          </div>

          <Button onClick={handleSave}>Guardar cambios</Button>
        </CardContent>
      </Card>
    </div>
  );
}
