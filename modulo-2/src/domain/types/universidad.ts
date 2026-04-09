export interface Asignatura {
    readonly id: number;
    nombre: string;
    creditos: number;
}

export interface Estudiante {
    readonly id: string;
    nombre: string;
    email: string;
}

// Interfaces para la Unión Discriminada
interface MatriculaActiva {
    tipo: "ACTIVA";
    asignaturas: Asignatura[];
}

interface MatriculaSuspendida {
    tipo: "SUSPENDIDA";
    motivo: string;
}

interface MatriculaFinalizada {
    tipo: "FINALIZADA";
    notaMedia: number;
}

// El tipo Unión Discriminada: el campo 'tipo' sirve para que TS sepa exactamente qué datos hay
export type EstadoMatricula = MatriculaActiva | MatriculaSuspendida | MatriculaFinalizada;

// Interfaz Genérica para respuestas de red (Pide la teoría)
export interface RespuestaAPI<T> {
    codigoEstado: number;
    exito: boolean;
    datos: T;
    errores?: string[];
}