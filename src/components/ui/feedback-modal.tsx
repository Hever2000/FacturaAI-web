'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { X, Send, Check } from 'lucide-react';

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

  const renderValue = (value: unknown, depth = 0): React.ReactNode => {
    if (depth > 2) return <span className="text-muted-foreground">...</span>;
    if (Array.isArray(value)) {
      return (
        <div className="pl-4 border-l-2 border-border">
          {value.map((item, index) => (
            <div key={index} className="py-1">
              {renderValue(item, depth + 1)}
            </div>
          ))}
        </div>
      );
    }
    if (typeof value === 'object' && value !== null) {
      return (
        <div className="pl-4 border-l-2 border-border">
          {Object.entries(value).map(([k, v]) => (
            <div key={k} className="py-1">
              <span className="font-medium">{k}: </span>
              {renderValue(v, depth + 1)}
            </div>
          ))}
        </div>
      );
    }
    return <span>{String(value)}</span>;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

      <div className="relative z-10 w-full max-w-2xl max-h-[90vh] overflow-hidden rounded-xl border bg-background shadow-2xl">
        <div className="flex items-center justify-between p-6 border-b">
          <div>
            <h2 className="text-xl font-bold">Corregir Datos</h2>
            <p className="text-sm text-muted-foreground">
              Edita los campos incorrectos para mejorar el modelo
            </p>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-180px)]">
          <div className="space-y-4">
            {Object.entries(extractedData).map(([key, value]) => {
              if (key === 'items' && Array.isArray(value)) {
                return (
                  <div key={key} className="p-4 rounded-lg border bg-muted/50">
                    <label className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                      {key}
                    </label>
                    <div className="mt-2 space-y-3">
                      {value.map((item: Record<string, unknown>, index: number) => (
                        <div key={index} className="p-3 rounded bg-background">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            {Object.entries(item).map(([itemKey, itemValue]) => (
                              <div key={itemKey} className="flex flex-col gap-1">
                                <label className="text-xs font-medium text-muted-foreground">
                                  {itemKey}
                                </label>
                                <Input
                                  value={
                                    corrections[`${key}[${index}].${itemKey}`] ??
                                    String(itemValue ?? '')
                                  }
                                  onChange={(e) =>
                                    handleFieldChange(`${key}[${index}].${itemKey}`, e.target.value)
                                  }
                                  placeholder={String(itemValue ?? '')}
                                  className="h-8 text-sm"
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
                    <label className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                      {key}
                    </label>
                    <Input
                      value={corrections[key] ?? ''}
                      onChange={(e) => handleFieldChange(key, e.target.value)}
                      placeholder={String(value ?? '')}
                    />
                  </div>
                );
              }

              return (
                <div key={key} className="p-4 rounded-lg border bg-muted/50">
                  <label className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                    {key}
                  </label>
                  <div className="mt-2">{renderValue(value)}</div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 p-6 border-t bg-muted/30">
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button onClick={handleSubmit} disabled={isSubmitting} className="gap-2">
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
