import { EstadoMatricula, Estudiante } from './domain/types/universidad.js';
import { obtenerRecurso } from './services/api-client.js';

// 1. Función con Unión Discriminada y Narrowing
function generarReporte(estado: EstadoMatricula): string {
    switch (estado.tipo) {
        case "ACTIVA":
            return `Inscrito en ${estado.asignaturas.length} asignaturas.`;
        case "SUSPENDIDA":
            return `Matrícula pausada. Motivo: ${estado.motivo}`;
        case "FINALIZADA":
            return `Ciclo completado. Nota media: ${estado.notaMedia}`;
        
            default:
            // ESTO ES LO QUE PIDE EL LAB 3:
            const _comprobacion: never = estado;
            return _comprobacion;
    }
}

// 2. Ejecución principal
async function bootstrap() {
    console.log("🏫 SISTEMA DE GESTIÓN UNIVERSITARIA");
    
    // Ejemplo de uso de la función de reporte
    const miMatricula: EstadoMatricula = {
        tipo: "ACTIVA",
        asignaturas: [
            { id: 1, nombre: "TypeScript Avanzado", creditos: 6 },
            { id: 2, nombre: "Arquitectura de Software", creditos: 4 }
        ]
    };

    console.log(`Estado actual: ${generarReporte(miMatricula)}`);

    // Ejemplo de llamada genérica
    try {
        const respuesta = await obtenerRecurso<Estudiante>("/api/v1/perfil");
        if (respuesta.exito) {
            console.log("✅ Datos del estudiante recibidos correctamente.");
        }
    } catch (error) {
        console.error("❌ Fallo en la API");
    }
}

bootstrap();