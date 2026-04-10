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

## Módulo 1: Primitivos, Inferencia, Especiales y Funciones

1. Inferencia vs. Declaración (El contrato seguro)
No abuses de as. Deja que TS trabaje por ti o dile exactamente qué esperas.

TypeScript
    // 1. Inferencia (TS es listo)
    let puntuacion = 10; // TS sabe que es 'number'
    // puntuacion = "diez"; // ❌ Error automático

    // 2. Declaración (Tú eres el jefe)
    interface Metricas {
        lectura: number;
        sensorId: string;
    }

    // ❌ Error: Falta 'sensorId'. TS te protege.
    const nuevaLectura: Metricas = { lectura: 25.5 }; 

    // ⚠️ Peligro: 'as' silencia el error. ¡No lo hagas!
    const lecturaFalsa = { lectura: 25.5 } as Metricas;
    - - -

2. Tipos Especiales: unknown vs any
Usa siempre unknown si no sabes qué viene de fuera (por ejemplo, de una base de datos o una API externa).

    TypeScript
    function procesarDatoExterno(dato: unknown) {
        // console.log(dato.toUpperCase()); // ❌ Error: TS no sabe si es un string.
        
        if (typeof dato === "string") {
            console.log(dato.toUpperCase()); // ✅ Seguro: TS ya sabe que es string.
        }
    }

    // 'any' es como ir en coche sin cinturón:
    let comodin: any = "Hola";
    comodin.metodoInexistente(); // ❌ Explota en tiempo de ejecución, pero TS no te avisó.
    - - -

3. Arrays y Tuplas (Orden y Estructura)
Diferencia bien cuándo usar una lista infinita y cuándo una estructura fija.

    TypeScript
    // Array: Lista de la compra (puedes añadir los que quieras)
    let historial: number[] = [10, 20, 30];
    historial.push(40); // ✅ OK

    // Tupla: Coordenadas GPS (necesitas exactamente Longitud, Latitud y Altitud)
    let posicion: [number, number, number] = [40.41, -3.70, 600];
    // posicion = [40.41, -3.70]; // ❌ Error: Falta la altitud.
    4. as const (Congelación profunda)
    Ideal para configuraciones globales que nunca, bajo ninguna circunstancia, deben cambiar.

    TypeScript
    // Objeto normal: Las propiedades pueden cambiar
    const CONFIG_APP = {
        version: "1.0.0",
        modo: "produccion"
    };
    CONFIG_APP.modo = "desarrollo"; // ✅ TS lo permite

    // Objeto con 'as const': Se vuelve Readonly (sólo lectura)
    const CONSTANTES_SISTEMA = {
        API_URL: "https://api.universidad.com",
        REINTENTOS: 3
    } as const;

    // CONSTANTES_SISTEMA.REINTENTOS = 5; // ❌ Error: Es de solo lectura.
    - - -

5. void y never (El control del flujo)
Para documentar qué hace realmente una función.

    TypeScript
    // void: "Hago mi trabajo y me voy" (no devuelvo nada)
    function avisarCierre(): void {
        console.log("El sistema se cerrará en 5 minutos.");
    }

    // never: "De aquí no sale nadie vivo"
    function lanzarErrorCritico(msj: string): never {
        throw new Error(msj); // La función nunca termina su ejecución normalmente
    }
    - - -


## Modulo 2. Ejemplos
1. Ejemplo de Unión Discriminada (Evitando "Estados Imposibles")
Este es el ejemplo perfecto de por qué no usamos solo propiedades opcionales.

    TypeScript
    // ❌ MAL: ¿Si el estado es 'error', qué pasa con 'datos'? ¿Pueden estar ambos? Es ambiguo.
    interface ResultadoSucio {
        estado: "exito" | "error";
        datos?: string[];
        mensajeError?: string;
    }

    // ✅ BIEN: Unión Discriminada
    type ResultadoPro = 
        | { tipo: "EXITO"; datos: string[] } 
        | { tipo: "ERROR"; mensaje: string };

    function procesar(res: ResultadoPro) {
        if (res.tipo === "EXITO") {
            // TypeScript "estrecha" el tipo: aquí res.mensaje NO existe.
            console.log("Items:", res.datos.length);
        } else {
            // Aquí res.datos NO existe. Seguridad total.
            console.warn("Error:", res.mensaje);
        }
    }
    - - -

2. Ejemplo de Genéricos con Restricciones (extends)
A veces no quieres que el genérico <T> sea "cualquier cosa", sino algo que al menos tenga una propiedad específica.

    TypeScript
    interface ConId {
        id: string | number;
    }

    // <T extends ConId> significa: "Acepto cualquier tipo, siempre que tenga un .id"
    function imprimirIdentificador<T extends ConId>(objeto: T): void {
        console.log(`El ID del recurso es: ${objeto.id}`);
    }

    imprimirIdentificador({ id: 101, nombre: "Josu" }); // ✅ Funciona
    // imprimirIdentificador({ nombre: "Dani" });       // ❌ Error: Falta la propiedad 'id'
    3. Ejemplo de Intersección (&)
    Útil para "componer" objetos como si fueran piezas de Lego.

    TypeScript
    type Persona = { nombre: string };
    type Empleado = { salario: number };

    // El tipo Programador DEBE tener ambas cosas
    type Programador = Persona & Empleado & { lenguaje: string };

    const dev: Programador = {
        nombre: "Daniel",
        salario: 50000,
        lenguaje: "TypeScript"
    };
    - - -

## Ejemplo de Verificación: El Poder del Narrowing (Módulo 2)

Hito: Validación del sistema de tipos mediante provocación de errores de lógica.

La Prueba: Se intentó acceder a la propiedad notaMedia dentro de un bloque condicional donde el estado de la matrícula era estrictamente "ACTIVA".

    En archivo: src/index.ts

    Al escribir debajo de "estado.notaMedia"
    cualquie codigo, en la prueba un if:
        TypeScript
        if (estado.tipo === "ACTIVA") {
            console.log(estado.notaMedia); // ❌ ¡TypeScript debería subrayar esto en rojo inmediatamente!
        }

    "TypeScript : "Oye, Josu, me has dicho que en el estado ACTIVA solo existen las asignaturas. Intentar leer una nota media aquí es un error de lógica, porque el alumno aún no ha terminado".

    El Resultado: TypeScript detectó inmediatamente la incoherencia y subrayó el código en rojo antes de la ejecución.

Análisis Técnico: * Gracias a la Unión Discriminada, TypeScript realiza un "estrechamiento" (narrowing) del tipo.

Al evaluar if (estado.tipo === "ACTIVA"), el compilador descarta las interfaces MatriculaSuspendida y MatriculaFinalizada.

Como la propiedad notaMedia solo existe en MatriculaFinalizada, el sistema impide el acceso, protegiéndonos de un posible undefined en tiempo de ejecución.


## Mapa de Situación: ¿Qué hemos construido?

Hasta ahora tienes un monorepositorio (una carpeta con varios proyectos dentro). Esto es una práctica profesional para mantener módulos independientes pero relacionados.

🔵 Módulo 1: La Fortaleza (Tipado Base y Seguridad)
Aquí aprendiste a "blindar" el código. El objetivo fue que los datos primitivos no nos den sorpresas.

Inferencia vs. Declaración: Aprendiste que TS es listo y sabe qué tipo es cada cosa, pero que tú, como arquitecto, debes declarar las interfaces para que nadie (ni tú mismo en el futuro) rompa el contrato.

El fin del any: Entendiste que usar any es como no usar TypeScript. Usamos unknown cuando no sabemos qué viene, obligándonos a usar Type Guards (los if (typeof...)) para filtrar el dato antes de usarlo.

Control de Nulidad: Configuramos el proyecto en modo estricto. Si una función puede devolver null (como cuando calculas la media de un array vacío), TS te obliga a gestionarlo. No más NaN imprevistos.

🟢 Módulo 2: La Arquitectura (Modelado y Genéricos)
Aquí subimos el nivel. Ya no hablamos de números sueltos, sino de entidades complejas (Estudiantes, Matrículas, APIs).

Interfaces e Inmutabilidad: Usamos interface para definir objetos y readonly para que los IDs no se puedan cambiar por error. El software se vuelve predecible.

Uniones Discriminadas (El concepto clave): Este es el "corazón" de TS avanzado. En lugar de tener un objeto con muchas propiedades opcionales, creamos estados específicos (ACTIVA, SUSPENDIDA, FINALIZADA) con una etiqueta común (tipo).

Logro: El compilador sabe que si la matrícula es ACTIVA, tiene asignaturas, y si es FINALIZADA, tiene una nota media. No te deja mezclar peras con manzanas.

Programación Genérica (<T>): Creamos una "maquinaria" que sirve para todo. Tu cliente de API no sabe si está bajando alumnos o cuadros de arte; simplemente sabe que lo que baje tendrá la forma T. Es el máximo nivel de reutilización.