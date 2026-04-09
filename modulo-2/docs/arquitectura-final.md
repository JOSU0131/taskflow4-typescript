# Documentación de Arquitectura - Sistema Universitario

## 1. Modelo de Datos: Interface vs Type
En este proyecto, hemos combinado ambas estructuras por razones estratégicas:
* **Interfaces (`Estudiante`, `Asignatura`):** Elegidas para definir la estructura de los objetos principales. Las interfaces son ideales para definir contratos de datos que podrían ser extendidos en el futuro y ofrecen mejores mensajes de error en el IDE.
* **Types (`EstadoMatricula`):** Utilizado para la **Unión Discriminada**. Los tipos son superiores a las interfaces cuando necesitamos definir un conjunto cerrado de estados (ACTIVA | SUSPENDIDA | FINALIZADA), lo que permite al compilador realizar un análisis exhaustivo.

## 2. Abstracción con Genéricos
Se ha implementado una interfaz `RespuestaAPI<T>` y una función `obtenerRecurso<T>`. 
* **Por qué:** Esta abstracción permite que la lógica de red (códigos de estado, manejo de errores, latencia) sea independiente de los datos. 
* **Beneficio:** Evitamos duplicar código para cada entidad. Si mañana añadimos "Profesores", el cliente de API funcionará automáticamente manteniendo el tipado estricto.

## 3. Seguridad y Mantenibilidad
* **Inmutabilidad:** El uso de `readonly` asegura que los identificadores no cambien durante el flujo de la aplicación.
* **Narrowing:** La estructura de control en `index.ts` garantiza que el sistema nunca intente acceder a una "nota media" si el estudiante aún está en estado "ACTIVA".