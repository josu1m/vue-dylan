import apiClient from '../apiClient';

export interface Prueba {
    id?: number;
    name: string;
    content: string;
}

export const getPruebas = async (): Promise<Prueba[]> => {
    const response = await apiClient.get<Prueba[]>('/pruebas');
    return response.data;
};

export const getPruebaById = async (id: number): Promise<Prueba> => {
    const response = await apiClient.get<Prueba>(`/pruebas/${id}`);
    return response.data;
};

export const addPrueba = async (prueba: Omit<Prueba, 'id'>): Promise<Prueba> => {
    const response = await apiClient.post<Prueba>('/pruebas', prueba);
    return response.data;
};

export const updatePrueba = async (id: number, prueba: Partial<Prueba>): Promise<Prueba> => {
    const response = await apiClient.put<Prueba>(`/pruebas/${id}`, prueba);
    return response.data;
};

export const deletePrueba = async (id: number): Promise<void> => {
    await apiClient.delete(`/pruebas/${id}`);
};