'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { X, Send } from 'lucide-react';

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  jobId: string;
  extractedData: Record<string, unknown>;
  onSubmit: (corrections: Record<string, unknown>) => Promise<void>;
}

export function FeedbackModal({
  isOpen,
  onClose,
  jobId,
  extractedData,
  onSubmit,
}: FeedbackModalProps) {
  const [corrections, setCorrections] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleFieldChange = (key: string, value: string) => {
    setCorrections((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    await onSubmit(corrections);
    setIsSubmitting(false);
  };

  const getDisplayValue = (key: string, originalValue: unknown): string => {
    if (corrections[key] !== undefined) {
      return corrections[key];
    }
    if (originalValue === null || originalValue === undefined) {
      return '';
    }
    return String(originalValue);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
      <div className="relative z-10 w-full max-w-2xl max-h-[90vh] overflow-hidden rounded-xl border bg-slate-950 shadow-2xl">
        <div className="flex items-center justify-between p-6 border-b bg-slate-900">
          <div>
            <h2 className="text-xl font-bold text-white">Corregir Datos</h2>
            <p className="text-sm text-slate-400">
              Edita los campos incorrectos para mejorar el modelo
            </p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="text-white hover:text-slate-300"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-180px)] bg-slate-950">
          <div className="space-y-4">
            {Object.entries(extractedData).map(([key, value]) => {
              if (key === 'items' && Array.isArray(value)) {
                return (
                  <div key={key} className="p-4 rounded-lg border border-slate-700 bg-slate-900">
                    <label className="text-sm font-medium text-slate-300 uppercase tracking-wide">
                      {key}
                    </label>
                    <div className="mt-2 space-y-3">
                      {value.map((item: Record<string, unknown>, index: number) => (
                        <div key={index} className="p-3 rounded bg-slate-800">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            {Object.entries(item).map(([itemKey, itemValue]) => (
                              <div key={itemKey} className="flex flex-col gap-1">
                                <label className="text-xs font-medium text-slate-400">
                                  {itemKey}
                                </label>
                                <Input
                                  value={getDisplayValue(`${key}[${index}].${itemKey}`, itemValue)}
                                  onChange={(e) =>
                                    handleFieldChange(`${key}[${index}].${itemKey}`, e.target.value)
                                  }
                                  className="h-9 text-sm bg-slate-700 border-slate-600 text-white placeholder:text-slate-500"
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              }

              if (typeof value !== 'object') {
                return (
                  <div key={key} className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-slate-300 uppercase tracking-wide">
                      {key}
                    </label>
                    <Input
                      value={getDisplayValue(key, value)}
                      onChange={(e) => handleFieldChange(key, e.target.value)}
                      className="h-10 bg-slate-800 border-slate-600 text-white placeholder:text-slate-500"
                    />
                  </div>
                );
              }

              return (
                <div key={key} className="p-4 rounded-lg border border-slate-700 bg-slate-900">
                  <label className="text-sm font-medium text-slate-300 uppercase tracking-wide">
                    {key}
                  </label>
                  <div className="mt-2 text-slate-400 text-sm font-mono">
                    {JSON.stringify(value, null, 2)}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 p-6 border-t bg-slate-900 border-slate-700">
          <Button
            variant="outline"
            onClick={onClose}
            className="border-slate-600 text-slate-300 hover:bg-slate-800"
          >
            Cancelar
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="gap-2 bg-teal-600 hover:bg-teal-700"
          >
            {isSubmitting ? (
              <>Enviando...</>
            ) : (
              <>
                <Send className="h-4 w-4" />
                Enviar Corrección
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
