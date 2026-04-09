 Bitacora

# Laboratorio práctico 1: Inicialización y lógica pura

## Paso 1: Inicialización del Repositorio typescript

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



## Paso 2. Desarrollo del módulo matemático:
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

## **NOTA RECORDATIORIO**
Después de ejecutar el compilador "npx tsc" y revisa el código JavaScript puro generado en la carpeta dist/:
La  lógica de negocio están funcionando a la perfección.

¿Qué acabas de lograr técnicamente?
    Manejo de Nulidad: Cuando la terminal dice "Empty Case: Correctamente manejado como null", significa que tu código es capaz de detectar un estado vacío sin lanzar un error de sistema (NaN), algo que en aplicaciones financieras o científicas es vital.

    Transpilación Silenciosa: Aunque usaste tsx para ejecutarlo rápido, el hecho de que no haya saltado ningún aviso de TypeScript significa que tu código respeta el contrato de tipos al 100%.

    Filtrado de Atípicos: Has limpiado el valor 100 de tus mediciones originales, dejando los datos listos para un análisis estadístico real.