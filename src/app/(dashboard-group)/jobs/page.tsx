'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
import { Loader2, Search, History, FileText } from 'lucide-react';
import { jobsApi } from '@/lib/api/jobs';
import type { Job } from '@/types/jobs';

export default function JobsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      try {
        const response = await jobsApi.list({
          status: statusFilter || undefined,
          limit: 10,
          offset: (page - 1) * 10,
        });
        setJobs(response.jobs);
        setTotalPages(Math.ceil(response.total / 10));
      } catch (error) {
        console.error('Error fetching jobs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [page, statusFilter]);

  const filteredJobs = search
    ? jobs.filter((job) => job.filename.toLowerCase().includes(search.toLowerCase()))
    : jobs;

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-teal-500">Completado</Badge>;
      case 'failed':
        return <Badge variant="destructive">Fallido</Badge>;
      case 'processing':
        return <Badge variant="secondary">Procesando</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Historial</h1>
        <p className="text-slate-400">Ver todos tus procesamientos</p>
      </div>

      {/* Filters */}
      <Card className="border-slate-800">
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-500" />
              <Input
                placeholder="Buscar por nombre..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 rounded-md border border-slate-700 bg-slate-900 text-sm"
            >
              <option value="">Todos</option>
              <option value="processing">Procesando</option>
              <option value="completed">Completado</option>
              <option value="failed">Fallido</option>
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card className="border-slate-800">
        <CardContent className="p-0">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-teal-500" />
            </div>
          ) : filteredJobs.length === 0 ? (
            <div className="py-12 text-center text-slate-500">
              <History className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No hay procesamientos</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow className="border-slate-800">
                  <TableHead>Archivo</TableHead>
                  <TableHead>Fecha</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead>Confianza</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredJobs.map((job) => (
                  <TableRow key={job.id} className="border-slate-800">
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-slate-500" />
                        {job.filename}
                      </div>
                    </TableCell>
                    <TableCell>{new Date(job.created_at).toLocaleDateString('es-AR')}</TableCell>
                    <TableCell>{getStatusBadge(job.status)}</TableCell>
                    <TableCell>
                      {job.confidence_score ? `${Math.round(job.confidence_score * 100)}%` : '-'}
                    </TableCell>
                    <TableCell className="text-right">
                      <Link href={`/jobs/${job.id}`}>
                        <Button variant="ghost" size="sm">
                          Ver
                        </Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2">
          <Button
            variant="outline"
            size="sm"
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
          >
            Anterior
          </Button>
          <span className="text-sm text-slate-500">
            Página {page} de {totalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
          >
            Siguiente
          </Button>
        </div>
      )}
    </div>
  );
}
