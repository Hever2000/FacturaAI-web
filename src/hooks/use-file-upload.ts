"use client";

import { useState, useCallback } from "react";

interface UseFileUploadOptions {
  maxSize?: number;
  acceptedFormats?: string[];
  onSuccess?: (file: File) => void;
  onError?: (error: string) => void;
}

interface UseFileUploadReturn {
  file: File | null;
  isLoading: boolean;
  error: string | null;
  handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  reset: () => void;
}

export function useFileUpload({
  maxSize = 10 * 1024 * 1024,
  acceptedFormats = [".pdf", ".jpg", ".jpeg", ".png", ".webp"],
  onSuccess,
  onError,
}: UseFileUploadOptions = {}): UseFileUploadReturn {
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validateFile = useCallback(
    (file: File): string | null => {
      const extension = "." + file.name.split(".").pop()?.toLowerCase();

      if (!acceptedFormats.includes(extension)) {
        return `Formato no soportado. Usa: ${acceptedFormats.join(", ")}`;
      }

      if (file.size > maxSize) {
        return `El archivo excede el límite de ${Math.round(maxSize / 1024 / 1024)}MB`;
      }

      return null;
    },
    [acceptedFormats, maxSize]
  );

  const handleFileChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const selectedFile = event.target.files?.[0];

      if (!selectedFile) return;

      const validationError = validateFile(selectedFile);

      if (validationError) {
        setError(validationError);
        onError?.(validationError);
        return;
      }

      setFile(selectedFile);
      setError(null);
      onSuccess?.(selectedFile);
    },
    [validateFile, onSuccess, onError]
  );

  const reset = useCallback(() => {
    setFile(null);
    setError(null);
    setIsLoading(false);
  }, []);

  return {
    file,
    isLoading,
    error,
    handleFileChange,
    reset,
  };
}
