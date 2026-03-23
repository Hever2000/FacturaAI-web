'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Loader2, Key, Plus, Copy, Trash2, AlertTriangle } from 'lucide-react';
import { keysApi } from '@/lib/api/keys';
import { toast } from 'sonner';
import type { ApiKey } from '@/types/api-keys';

export default function ApiKeysPage() {
  const [keys, setKeys] = useState<ApiKey[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newKeyName, setNewKeyName] = useState('');
  const [newKey, setNewKey] = useState<string | null>(null);
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    fetchKeys();
  }, []);

  const fetchKeys = async () => {
    setLoading(true);
    try {
      const response = await keysApi.list();
      setKeys(response.data.api_keys);
    } catch (error) {
      console.error('Error fetching keys:', error);
    } finally {
      setLoading(false);
    }
  };

  const createKey = async () => {
    if (!newKeyName.trim()) return;
    setCreating(true);
    try {
      const response = await keysApi.create({ name: newKeyName });
      setNewKey(response.data.key);
      toast.success('API Key creada exitosamente');
      fetchKeys();
    } catch (error) {
      toast.error('Error al crear la API Key');
    } finally {
      setCreating(false);
    }
  };

  const deleteKey = async (id: string) => {
    if (!confirm('¿Estás seguro de eliminar esta API Key?')) return;
    try {
      await keysApi.delete(id);
      toast.success('API Key eliminada');
      fetchKeys();
    } catch (error) {
      toast.error('Error al eliminar la API Key');
    }
  };

  const copyKey = (key: string) => {
    navigator.clipboard.writeText(key);
    toast.success('Copiado al portapapeles');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">API Keys</h1>
          <p className="text-slate-400">Gestiona tus claves de API</p>
        </div>
        <Button
          onClick={() => {
            setShowCreateModal(true);
            setNewKey(null);
            setNewKeyName('');
          }}
        >
          <Plus className="h-4 w-4 mr-2" />
          Nueva API Key
        </Button>
      </div>

      {/* Keys Table */}
      <Card className="border-slate-800">
        <CardContent className="p-0">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-teal-500" />
            </div>
          ) : keys.length === 0 ? (
            <div className="py-12 text-center text-slate-500">
              <Key className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No tenés API Keys</p>
              <Button variant="link" onClick={() => setShowCreateModal(true)}>
                Crear tu primera API Key
              </Button>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow className="border-slate-800">
                  <TableHead>Nombre</TableHead>
                  <TableHead>Prefijo</TableHead>
                  <TableHead>Creada</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {keys.map((key) => (
                  <TableRow key={key.id} className="border-slate-800">
                    <TableCell className="font-medium">{key.name}</TableCell>
                    <TableCell className="font-mono text-sm">{key.key_prefix}...</TableCell>
                    <TableCell>{new Date(key.created_at).toLocaleDateString('es-AR')}</TableCell>
                    <TableCell>
                      <Badge className={key.is_active ? 'bg-teal-500' : 'bg-slate-500'}>
                        {key.is_active ? 'Activa' : 'Inactiva'}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" onClick={() => deleteKey(key.id)}>
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Create Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
          <Card className="w-full max-w-md border-slate-700 bg-slate-900">
            <CardHeader>
              <CardTitle>Nueva API Key</CardTitle>
              <CardDescription>Crea una nueva clave para usar la API</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {newKey ? (
                <div className="space-y-4">
                  <div className="p-4 rounded-lg bg-amber-500/10 border border-amber-500/50">
                    <div className="flex items-center gap-2 text-amber-400 mb-2">
                      <AlertTriangle className="h-5 w-5" />
                      <span className="font-medium">Importante</span>
                    </div>
                    <p className="text-sm text-amber-300">
                      Esta clave solo se muestra una vez. Guardala en un lugar seguro.
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Input value={newKey} readOnly className="font-mono text-sm" />
                    <Button onClick={() => copyKey(newKey)}>
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                  <Button
                    className="w-full"
                    onClick={() => {
                      setShowCreateModal(false);
                      setNewKey(null);
                    }}
                  >
                    Cerrar
                  </Button>
                </div>
              ) : (
                <>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Nombre</label>
                    <Input
                      placeholder="Mi API Key"
                      value={newKeyName}
                      onChange={(e) => setNewKeyName(e.target.value)}
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      className="flex-1"
                      onClick={() => setShowCreateModal(false)}
                    >
                      Cancelar
                    </Button>
                    <Button
                      className="flex-1"
                      onClick={createKey}
                      disabled={creating || !newKeyName.trim()}
                    >
                      {creating ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Crear'}
                    </Button>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
