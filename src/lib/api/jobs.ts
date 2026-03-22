import client from './client';
import type { JobsResponse, JobDetail, ProcessResponse } from '@/types/jobs';

export const jobsApi = {
  list: (params?: { status?: string; page?: number; page_size?: number }) =>
    client.get<JobsResponse>('/jobs', { params }),

  get: (id: string) => client.get<JobDetail>(`/jobs/${id}`),

  process: (file: File, onProgress?: (progress: number) => void) => {
    const formData = new FormData();
    formData.append('file', file);

    return client.post<ProcessResponse>('/jobs/process', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
      onUploadProgress: (e) => {
        if (onProgress && e.total) {
          onProgress(Math.round((e.loaded * 100) / e.total));
        }
      },
    });
  },

  export: (id: string, format: 'json' | 'txt') =>
    client.get(`/jobs/${id}/export`, {
      params: { format },
      responseType: format === 'txt' ? 'text' : 'json',
    }),

  feedback: (jobId: string, corrections: Record<string, unknown>) =>
    client.post(`/jobs/${jobId}/feedback`, corrections),
};
