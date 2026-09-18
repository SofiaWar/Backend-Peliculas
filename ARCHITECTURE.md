# Arquitectura

## Resumen

La aplicación es un backend monolítico pequeño. `src/server.js` crea la aplicación Express, configura el middleware JSON, abre la conexión a MongoDB y registra los endpoints de películas.

## Flujo de una petición

1. El cliente envía una petición HTTP con datos JSON cuando la operación lo requiere.
2. Express analiza el cuerpo mediante `express.json()`.
3. El handler de la ruta selecciona la base de datos y la colección de MongoDB.
4. MongoDB ejecuta la consulta o mutación.
5. El servidor devuelve JSON y un código HTTP acorde con el resultado.

## Componentes

- `src/server.js`: aplicación Express, conexión a MongoDB y endpoints CRUD.
- `src/seed.js`: carga datos de prueba en `peliculasDB.peliculas`.
- `src/models/peliculas.js`: arreglo local de ejemplo exportado como módulo.
- `.env.example`: plantilla de variables de entorno.
- `README.md`: instalación, ejecución y contrato básico de la API.
- `ERRORES.md`: los 10 errores intencionales restantes y sus efectos observables.

## Persistencia

La conexión se crea con el driver oficial `mongodb` usando `MONGODB_URI`. El seed usa la base `peliculasDB` y la colección `peliculas`. La aplicación contiene algunas inconsistencias documentadas en `ERRORES.md` como parte de la actividad práctica.

## Límites actuales

No hay autenticación, autorización, paginación, validación mediante esquema, capa de servicios ni pruebas de integración. Estas limitaciones son deliberadas o forman parte de los errores incluidos en la práctica.
