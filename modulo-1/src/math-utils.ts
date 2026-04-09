/**
 * Calcula la media aritmética.
 * @param datos Array de números
 * @returns La media o null si el array está vacío
 */
export function calcularMedia(datos: number[]): number | null {
    if (datos.length === 0) return null;
    const suma = datos.reduce((acc, val) => acc + val, 0);
    return suma / datos.length;
}

/**
 * Calcula la mediana.
 */
export function calcularMediana(datos: number[]): number | null {
    if (datos.length === 0) return null;
    
    // Creamos una copia para no mutar el array original (buena práctica)
    const sorted = [...datos].sort((a, b) => a - b);
    const mitad = Math.floor(sorted.length / 2);

    if (sorted.length % 2 !== 0) {
        return sorted[mitad];
    }
    
    return (sorted[mitad - 1] + sorted[mitad]) / 2;
}

/**
 * Filtra valores que se salen de un rango.
 */
export function filtrarAtipicos(datos: number[], limite: number): number[] {
    return datos.filter(dato => Math.abs(dato) <= limite);
}