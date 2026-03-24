import apiClient from './client';
import type {
  Job,
  JobCreateResponse,
  JobsResponse,
  FeedbackRequest,
  FeedbackResponse,
} from '@/types/jobs';

export const jobsApi = {
  process: (file: File, onProgress?: (progress: number) => void) =>
    apiClient.uploadFile<JobCreateResponse>('/jobs/process', file, onProgress),

  get: (id: string) => apiClient.get<Job>(`/jobs/${id}`),

  list: (params?: { limit?: number; offset?: number; status?: string }) => {
    const query = new URLSearchParams();
    if (params?.limit) query.set('limit', params.limit.toString());
    if (params?.offset) query.set('offset', params.offset.toString());
    if (params?.status) query.set('status', params.status);
    const queryString = query.toString();
    return apiClient.get<JobsResponse>(`/jobs${queryString ? `?${queryString}` : ''}`);
  },

  feedback: (jobId: string, data: FeedbackRequest) =>
    apiClient.post<FeedbackResponse>(`/jobs/${jobId}/feedback`, data),
};
