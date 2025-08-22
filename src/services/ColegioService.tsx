// Types for the API response
export interface Colegio {
  id: number;
  nombre: string;
  direccion: string;
  email: string;
  logo: string;
  logo_url: string;
  horario?: string | null;
  telefono: string;
  pais: string;
  region?: string | null;
}

export interface ColegioApiResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Colegio[];
}

// API Configuration
const API_BASE_URL = 'https://escuelatorreblanca.cl/api/colegio/';

class ColegioService {
  /**
   * Get all schools from the API
   * @returns Promise with the complete API response
   */
  async getAllColegios(): Promise<ColegioApiResponse> {
    try {
      const response = await fetch(API_BASE_URL, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Error fetching colegios: ${response.status} ${response.statusText}`);
      }

      const data: ColegioApiResponse = await response.json();
      return data;
    } catch (error) {
      console.error('Error in getAllColegios:', error);
      throw error;
    }
  }

  /**
   * Get the first school from the API (useful for the home page)
   * @returns Promise with the first school data
   */
  async getPrimaryColegio(): Promise<Colegio | null> {
    try {
      const response = await this.getAllColegios();
      return response.results.length > 0 ? response.results[0] : null;
    } catch (error) {
      console.error('Error in getPrimaryColegio:', error);
      throw error;
    }
  }

  /**
   * Get a specific school by ID
   * @param id - School ID
   * @returns Promise with the school data
   */
  async getColegioById(id: number): Promise<Colegio> {
    try {
      const response = await fetch(`${API_BASE_URL}${id}/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Error fetching colegio by ID: ${response.status} ${response.statusText}`);
      }

      const data: Colegio = await response.json();
      return data;
    } catch (error) {
      console.error(`Error in getColegioById for ID ${id}:`, error);
      throw error;
    }
  }

  /**
   * Create a new school (if the API supports POST)
   * @param colegioData - School data to create
   * @returns Promise with the created school data
   */
  async createColegio(colegioData: Omit<Colegio, 'id'>): Promise<Colegio> {
    try {
      const response = await fetch(API_BASE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(colegioData),
      });

      if (!response.ok) {
        throw new Error(`Error creating colegio: ${response.status} ${response.statusText}`);
      }

      const data: Colegio = await response.json();
      return data;
    } catch (error) {
      console.error('Error in createColegio:', error);
      throw error;
    }
  }

  /**
   * Update an existing school (if the API supports PUT)
   * @param id - School ID
   * @param colegioData - Updated school data
   * @returns Promise with the updated school data
   */
  async updateColegio(id: number, colegioData: Partial<Omit<Colegio, 'id'>>): Promise<Colegio> {
    try {
      const response = await fetch(`${API_BASE_URL}${id}/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(colegioData),
      });

      if (!response.ok) {
        throw new Error(`Error updating colegio: ${response.status} ${response.statusText}`);
      }

      const data: Colegio = await response.json();
      return data;
    } catch (error) {
      console.error(`Error in updateColegio for ID ${id}:`, error);
      throw error;
    }
  }

  /**
   * Delete a school (if the API supports DELETE)
   * @param id - School ID
   * @returns Promise that resolves when deletion is complete
   */
  async deleteColegio(id: number): Promise<void> {
    try {
      const response = await fetch(`${API_BASE_URL}${id}/`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Error deleting colegio: ${response.status} ${response.statusText}`);
      }
    } catch (error) {
      console.error(`Error in deleteColegio for ID ${id}:`, error);
      throw error;
    }
  }

  /**
   * Search schools by name
   * @param searchTerm - Search term for school name
   * @returns Promise with filtered schools
   */
  async searchColegiosByName(searchTerm: string): Promise<Colegio[]> {
    try {
      const response = await this.getAllColegios();
      return response.results.filter(colegio => 
        colegio.nombre.toLowerCase().includes(searchTerm.toLowerCase())
      );
    } catch (error) {
      console.error('Error in searchColegiosByName:', error);
      throw error;
    }
  }

  /**
   * Get schools by region
   * @param region - Region name
   * @returns Promise with filtered schools
   */
  async getColegiosByRegion(region: string): Promise<Colegio[]> {
    try {
      const response = await this.getAllColegios();
      return response.results.filter(colegio => 
        colegio.region?.toLowerCase() === region.toLowerCase()
      );
    } catch (error) {
      console.error('Error in getColegiosByRegion:', error);
      throw error;
    }
  }

  /**
   * Get schools by country
   * @param pais - Country name
   * @returns Promise with filtered schools
   */
  async getColegiosByPais(pais: string): Promise<Colegio[]> {
    try {
      const response = await this.getAllColegios();
      return response.results.filter(colegio => 
        colegio.pais.toLowerCase() === pais.toLowerCase()
      );
    } catch (error) {
      console.error('Error in getColegiosByPais:', error);
      throw error;
    }
  }

  /**
   * Validate school data before sending to API
   * @param colegioData - School data to validate
   * @returns Boolean indicating if data is valid
   */
  validateColegioData(colegioData: Partial<Colegio>): boolean {
    // Basic validation rules
    if (!colegioData.nombre || colegioData.nombre.trim().length === 0) {
      console.error('Validation error: nombre is required');
      return false;
    }

    if (!colegioData.email || !this.isValidEmail(colegioData.email)) {
      console.error('Validation error: valid email is required');
      return false;
    }

    if (!colegioData.telefono || colegioData.telefono.trim().length === 0) {
      console.error('Validation error: telefono is required');
      return false;
    }

    return true;
  }

  /**
   * Validate email format
   * @param email - Email to validate
   * @returns Boolean indicating if email is valid
   */
  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}

// Export singleton instance
export const colegioService = new ColegioService();
export default colegioService;