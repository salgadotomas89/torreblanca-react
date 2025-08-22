import { useState, useEffect } from 'react';
import { colegioService } from '@/services/ColegioService';
import type { Colegio, ColegioApiResponse } from '@/services/ColegioService';

// Custom hook for fetching all schools
export const useColegios = () => {
  const [colegios, setColegios] = useState<Colegio[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchColegios = async () => {
    try {
      setLoading(true);
      setError(null);
      const response: ColegioApiResponse = await colegioService.getAllColegios();
      setColegios(response.results);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error fetching colegios');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchColegios();
  }, []);

  return {
    colegios,
    loading,
    error,
    refetch: fetchColegios,
  };
};

// Custom hook for fetching primary school (first one)
export const usePrimaryColegio = () => {
  const [colegio, setColegio] = useState<Colegio | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPrimaryColegio = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await colegioService.getPrimaryColegio();
      setColegio(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error fetching primary colegio');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPrimaryColegio();
  }, []);

  return {
    colegio,
    loading,
    error,
    refetch: fetchPrimaryColegio,
  };
};

// Custom hook for fetching a specific school by ID
export const useColegio = (id: number | null) => {
  const [colegio, setColegio] = useState<Colegio | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchColegio = async (colegioId: number) => {
    try {
      setLoading(true);
      setError(null);
      const data = await colegioService.getColegioById(colegioId);
      setColegio(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error fetching colegio');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id !== null) {
      fetchColegio(id);
    }
  }, [id]);

  return {
    colegio,
    loading,
    error,
    refetch: () => id !== null && fetchColegio(id),
  };
};

// Custom hook for creating a school
export const useCreateColegio = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const createColegio = async (colegioData: Omit<Colegio, 'id'>) => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(false);
      
      // Validate data before sending
      if (!colegioService.validateColegioData(colegioData)) {
        throw new Error('Invalid colegio data');
      }

      await colegioService.createColegio(colegioData);
      setSuccess(true);
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error creating colegio');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const resetState = () => {
    setError(null);
    setSuccess(false);
    setLoading(false);
  };

  return {
    createColegio,
    loading,
    error,
    success,
    resetState,
  };
};

// Custom hook for updating a school
export const useUpdateColegio = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const updateColegio = async (id: number, colegioData: Partial<Omit<Colegio, 'id'>>) => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(false);
      
      // Validate data before sending
      if (!colegioService.validateColegioData(colegioData)) {
        throw new Error('Invalid colegio data');
      }

      await colegioService.updateColegio(id, colegioData);
      setSuccess(true);
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error updating colegio');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const resetState = () => {
    setError(null);
    setSuccess(false);
    setLoading(false);
  };

  return {
    updateColegio,
    loading,
    error,
    success,
    resetState,
  };
};

// Custom hook for deleting a school
export const useDeleteColegio = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const deleteColegio = async (id: number) => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(false);
      
      await colegioService.deleteColegio(id);
      setSuccess(true);
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error deleting colegio');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const resetState = () => {
    setError(null);
    setSuccess(false);
    setLoading(false);
  };

  return {
    deleteColegio,
    loading,
    error,
    success,
    resetState,
  };
};
