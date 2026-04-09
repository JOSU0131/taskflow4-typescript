import { calcularMedia, calcularMediana, filtrarAtipicos } from './math-utils.js';

// Datos de prueba
const mediciones = [10, 12, 15, 100, 11, 14, 9];
const LIMITE_ATIPICO = 50;

console.log("📊 REPORTE DE LABORATORIO 1");
console.log("----------------------------");

const limpias = filtrarAtipicos(mediciones, LIMITE_ATIPICO);
console.log(`✅ Datos filtrados: ${limpias}`);

const media = calcularMedia(limpias);
const mediana = calcularMediana(limpias);

// Gracias al tipado, TS nos obliga a pensar en el caso de que sea null
console.log(`📈 Media: ${media !== null ? media.toFixed(2) : "No calculable"}`);
console.log(`⚖️ Mediana: ${mediana ?? "N/A"}`);

// Prueba de robustez con array vacío
const vacio: number[] = [];
console.log(`Empty Case: ${calcularMedia(vacio) === null ? "Correctamente manejado como null" : "Error"}`);