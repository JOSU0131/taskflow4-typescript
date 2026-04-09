# TASKFLOW - TypeScript
Arquitectura, tipos estrictos, genéricos y laboratorios prácticos

En esta fase profundizaremos en TypeScript: configuración estricta, tipos primitivos y avanzados, genéricos, uniones discriminadas y buenas prácticas.

TypeScript - React -  Vite

## ¿Qué es TypeScript en una frase?
JavaScript con un sistema que detecta errores **antes de ejecutar el código**, señalando exactamente el archivo y la línea donde está el problema.

¿Qué es TypeScript y cuál es su justificación arquitectónica?
    1. Es un superconjunto sintáctico estricto de JavaScript.
    2. Es un proceso de análisis estático de código previo a la ejecución

En términos de ingenieria:
    - Detección temprana de errores: El compilador de TypeScript actúa como una fase de validación que detecta inconsistencias lógicas durante el desarrollo, reduciendo drásticamente los errores en producción.
    - Contratos de software explícitos: El tipado te obliga a definir explícitamente las estructuras de datos, actuando como una documentación viva e inmutable.

    - Tipado estructural (duck typing): A diferencia de lenguajes como Java (tipado nominal), TypeScript evalúa los tipos por su estructura. Si un objeto tiene las propiedades requeridas, es compatible, independientemente de su origen.
    - Transpilación nula de tipos: El navegador o el entorno de Node.js no ejecutan TypeScript. El código se transpila a JavaScript puro. Las declaraciones de tipos desaparecen en el código resultante, lo que significa que TypeScript no añade sobrecarga de rendimiento en tiempo de ejecución.


## Parte 1: Implementación de Lógica Estadística Robusta

Estrategia: Se ha optado por un diseño de funciones puras con control de nulidad explícito.

Tipado: Se utiliza el tipo de unión number | null en lugar de permitir valores NaN o undefined, forzando el uso de guardas de tipo en la capa de presentación.

Verificación: Se confirma que la transpilación a ES2022 mantiene la integridad de la lógica mientras elimina la sobrecarga de tipos en tiempo de ejecución.