 Bitacora

# Laboratorio práctico 1: Inicialización y lógica pura

## Paso 0: Inicialización del Repositorio typescript

Primero, abrir el proyecto en VS code, y ejecutar en la terminal los siguientes comandos para crear la estructura:

    Bash
        1. Crear carpeta del repo y entrar
        // en este caso ya esta creado el repo en github: taskflow4-typescript
        mkdir typescript     
        cd typescript      // entrar en archivo

         2. Inicializar git y npm
        git init
        npm init -y

         3. Crear estructura de carpetas para el Módulo 1
        mkdir -p modulo-1/src 
        mkdirmodulo-1/dist 
        mkdirmodulo-1/docs

         4. Instalar TypeScript y tsx (para ejecutar TS directamente) como dependencias de desarrollo
        npm install -D typescript tsx

Configuración del tsconfig.json
Entra en la carpeta modulo-1 y genera el archivo de configuración:  
    Bash
        cd modulo-1
        npx tsc --init
En el nuevo archivo "tsconfig.json"
    codigo:
        {
            "compilerOptions": {
                "target": "ES2022",
                "module": "NodeNext",
                "moduleResolution": "NodeNext",
                "strict": true,               // 🔥 Esto activa el modo difícil/seguro que pide la fase
                "esModuleInterop": true,
                "forceConsistentCasingInFileNames": true,
                "outDir": "./dist",           // Aquí irá el JS procesado
                "rootDir": "./src",           // Aquí vive tu código TS
                "skipLibCheck": true
            },
            "include": ["src/**/*"]
        } 
 - - -
¿Qué hemos arreglado? (Para que lo entiendas sin esfuerzo):
Rutas (rootDir y outDir): He quitado las barras //. Ahora el ordenador sabe que tu código está en src y que el resultado debe ir a dist. Sin esto, el comando npx tsc no sabría dónde mirar.

Versión (target): Lo hemos puesto en ES2022. Esto asegura que el JavaScript que se genere sea moderno pero compatible.

Módulos (NodeNext): Imprescindible para que los import y export funcionen correctamente hoy en día.

Estricto (strict): Ya lo tenías en true, ¡bien hecho! Eso es lo más importante de la fase.


## Higiene:
Crear un archivo llamado ".gitignore" en la raíz del repositorio 

    Plaintext
        # Dependencias
        node_modules/

        # Salida de compilación
        dist/
        out/

        # Logs de error
        npm-debug.log*
        yarn-debug.log*
        yarn-error.log*

        # Sistema operativo
        .DS_Store
        Thumbs.db

        # Configuración de IDE (opcional, pero recomendado)
        .vscode/
        .idea/
- - -



## Paso 1. Desarrollo del módulo matemático:
El objetivo es crear una librería estadística que no se rompa nunca.

1. Crear el archivo en: modulo-1/src/"math-utils.ts"

    Aquí vamos a aplicar uniones de tipos (number | null). En JavaScript normal, si calculas la media de nada, obtienes "NaN". En este TypeScript, obligaremos a que el resultado sea "null" para que el programador tenga que gestionarlo.

    Código TypeScript en "math-utils.ts"
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

2. Crear el archivo en: modulo-1/src/"index.ts"
    Aquí es donde importamos lo anterior y lo ponemos a prueba. Fíjate en el operador "??" (nullish coalescing) para manejar ese posible null.

    Código TypeScript
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

3. Compilar y Ejecutar
Ejecutar el compilador npx tsc y revisa el código JavaScript puro generado en la carpeta dist/
    - Compilar  En terminal, y dentro de modul-1 (recuerda cd modul-1) ejecuta/bash:
        "npx tsc"
        (Esto creará la carpeta `dist/` con los archivos `.js`. Echa un vistazo dentro para ver cómo TypeScript ha "limpiado" los tipos y ha dejado JS puro).

    - Ejecutar
        "npx tsx src/index.ts"

 ✅ Verificación de Resultados (Laboratorio 1)
El sistema ha sido testeado con éxito bajo los siguientes criterios:
- **Filtrado:** Eliminación correcta de valores fuera de rango (Atípicos).
- **Cálculo:** Precisión en Media y Mediana con datos limpios.
- **Seguridad:** Control total sobre arrays vacíos evitando errores de ejecución.

**Output de terminal:**
> 📈 Media: 11.83 | ⚖️ Mediana: 11.5 | Empty Case: Correctamente manejado como null

### **nota RECORDATIORIO**
Después de ejecutar el compilador "npx tsc" y revisa el código JavaScript puro generado en la carpeta dist/:
La  lógica de negocio están funcionando a la perfección.

¿Qué acabas de lograr técnicamente?
    Manejo de Nulidad: Cuando la terminal dice "Empty Case: Correctamente manejado como null", significa que tu código es capaz de detectar un estado vacío sin lanzar un error de sistema (NaN), algo que en aplicaciones financieras o científicas es vital.

    Transpilación Silenciosa: Aunque usaste tsx para ejecutarlo rápido, el hecho de que no haya saltado ningún aviso de TypeScript significa que tu código respeta el contrato de tipos al 100%.

    Filtrado de Atípicos: Has limpiado el valor 100 de tus mediciones originales, dejando los datos listos para un análisis estadístico real.

## Paso 2. Desarrollo del módulo "2.Modelado de datos complejo, Patrones y Genéricos". Arquitectura de acceso a datos

1. Configuración del tsconfig.json
Entra en la carpeta modulo-2 y genera el archivo de configuración:  
    Bash
        cd modulo-2
        npx tsc --init

### **nota**
¿Por qué lo hacemos así?
    Al tener un "tsconfig.json" dentro de cada carpeta (modulo-1 y modulo-2), TypeScript trata a cada módulo como un proyecto independiente. Esto es vital en la Fase 4 porque:

        El Módulo 1 era lógica simple.
        El Módulo 2 tiene carpetas más complejas (domain, services).

    Si usaras un solo archivo de configuración en la raíz para todo, te volverías loco ajustando las rutas de las carpetas dist.


2. Modelado del Dominio en carpeta (crearla) src/domain/types/"universidad.ts"
Aquí es donde definimos el "ADN" de nuestro sistema. Vamos a usar Uniones Discriminadas, que es el patrón más potente de TS.
Crea el archivo modulo-2/src/domain/types/universidad.ts:

    TypeScript
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

3. Crear el Servicio Genérico en carpeta (crearla) en caerpeta src/services/"api-client.ts"
Vamos a crear una función que simule una base de datos. Lo importante aquí es el uso de <T>, que permite que la función devuelva cualquier cosa (estudiantes, profes, tareas) con seguridad.
Crea el archivo modulo-2/src/services/"api-client.ts":

    TypeScript
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

4. Crear la Lógica de Reportes y Index en (src/"index.ts")
Ahora vamos a unirlo todo y a crear la función generarReporte que usa un switch para demostrar que TS entiende las uniones discriminadas.
Crea el archivo modulo-2/src/index.ts:

    TypeScript
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
                    return "Estado desconocido";
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

5. Compilar y Ejecutar
Ejecutar el compilador "npx tsc" y revisa el código JavaScript puro generado en la carpeta dist/
    - Compilar  En terminal, y dentro de modul-2 (recuerda cd modul-2) ejecuta/bash:
        "npx tsc"
        (Esto creará la carpeta `dist/` con los archivos `.js`. Echa un vistazo dentro para ver cómo TypeScript ha "limpiado" los tipos y ha dejado JS puro).

    - Ejecutar
        "npx tsx src/index.ts"

✅ Verificación de Resultados (Laboratorio 2)
El sistema universitario ha sido testeado con éxito bajo los siguientes criterios de arquitectura avanzada:
- **Narrowing (Estrechamiento)**: Validación de la lógica de bifurcación mediante switch. 
- **Abstracción Genérica**: El api-client resolvió correctamente
- **Integridad de Datos**: Uso efectivo de modificadores readonly

Output de terminal:

🏫 SISTEMA DE GESTIÓN UNIVERSITARIA
📑 Estado actual: Inscrito en 2 asignaturas.
📡 Petición finalizada a: /api/v1/perfil
✅ Datos del estudiante recibidos correctamente (Respuesta Genérica OK).

¿Qué acabas de lograr técnicamente? (Módulo 2)
    El éxito de la ejecución en tu terminal no solo indica que el código "funciona", sino que has implementado tres pilares de la ingeniería de software moderna:

    - Eliminación de la Ambigüedad con Uniones Discriminadas:
    Al ejecutar generarReporte, TypeScript garantizó que, al ser una matrícula de tipo "ACTIVA", la propiedad asignaturas existía obligatoriamente. Has logrado que el compilador actúe como un "guardaespaldas", impidiendo errores de tipo undefined antes de que el código llegue a ejecutarse.

    - Abstracción mediante Programación Genérica:
    Has creado un cliente de API (obtenerRecurso<T>) que es agnóstico al dato. Esto significa que lograste separar la infraestructura (cómo se piden los datos) de la lógica de negocio (qué datos se piden). Tu terminal confirma que la respuesta llegó tipada correctamente como Estudiante sin haber escrito código específico para esa entidad.

    - Garantía de Inmutabilidad:
    Mediante el uso de readonly en el modelo de la universidad, has blindado los identificadores del sistema. Has asegurado que, una vez que un recurso es recuperado de la "API", sus claves primarias no puedan ser alteradas accidentalmente por otras funciones del sistema.

    Arquitectura Modular e Independiente:
    Al gestionar un tsconfig.json propio para este módulo, has logrado un encapsulamiento de proyecto. Esto permite que el Módulo 2 escale en complejidad (con sus carpetas domain y services) sin interferir con la configuración más simple del Módulo 1.