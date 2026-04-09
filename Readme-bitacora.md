# Bitacora

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


## Crear un archivo llamado ".gitignore" en la raíz del repositorio 

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



