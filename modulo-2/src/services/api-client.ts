import { RespuestaAPI } from '../domain/types/universidad.js';

/**
 * Simula una llamada asíncrona a una API.
 * El genérico <T> permite que el llamador decida qué tipo de datos espera.
 */
export async function obtenerRecurso<T>(endpoint: string, simuladorError: boolean = false): Promise<RespuestaAPI<T>> {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (simuladorError) {
                reject({
                    codigoEstado: 500,
                    exito: false,
                    datos: null as any,
                    errores: ["Error de conexión con el servidor universitario"]
                });
            } else {
                // Aquí simulamos que la API devuelve "algo" de tipo T
                // En un caso real, aquí iría un fetch().json()
                console.log(`📡 Petición finalizada a: ${endpoint}`);
                resolve({
                    codigoEstado: 200,
                    exito: true,
                    datos: {} as T // En el index le pasaremos datos reales
                });
            }
        }, 1000);
    });
}