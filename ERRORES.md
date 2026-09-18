# Errores y efectos

Este listado está documentado en texto plano, sin cifrado, porque el equipo lo cifrará posteriormente. Los errores se dejan visibles en el código para cumplir la actividad práctica de análisis de un backend con errores.

## Errores intencionales

1. **Colección incorrecta en POST**: `POST /peliculas` usa la base `peliculas` y la colección `pelicula`, mientras el resto y el seed usan `peliculasDB.peliculas`. Efecto: los registros creados no aparecen en los listados ni se consultan desde las demás operaciones.
2. **Tipo incorrecto en GET por ID**: `GET /peliculas/:id` valida el parámetro como número, pero consulta MongoDB con el valor original, que es texto. Efecto: no encuentra los documentos cuyos IDs son numéricos.
3. **IDs repetidos en el modelo local**: `src/models/peliculas.js` contiene dos películas con `id: 2`. Efecto: el identificador deja de ser único y una búsqueda por ID resulta ambigua.
4. **Año con tipo inconsistente**: el año de `Coraline` está guardado como texto en el modelo local. Efecto: ordenar, comparar o validar años produce resultados inconsistentes.
5. **Director ausente en el modelo local**: los documentos del modelo no incluyen `director`. Efecto: el modelo no representa todos los datos exigidos para una película.
6. **Validación incompleta del POST**: solo se comprueba la existencia de `id`, `titulo`, `anio` y `genero`. Efecto: se pueden insertar directores ausentes o valores con tipos inválidos.
7. **Validación incompleta del PUT**: se aplica directamente `req.body` mediante `$set`. Efecto: se pueden modificar o añadir campos sin comprobar estructura ni tipos.
8. **Sin ruta 404 personalizada**: no existe middleware para rutas inexistentes. Efecto: Express responde con HTML por defecto, rompiendo la promesa de que toda respuesta de la API sea JSON.
9. **Conexión a MongoDB al cargar el servidor**: `new MongoClient(MONGODB_URI)` se ejecuta antes de validar que exista la variable. Efecto: una configuración incompleta puede impedir el arranque con un error poco orientativo.
10. **Actualización potencial del identificador**: el cuerpo completo del PUT se aplica con `$set`, incluyendo un posible `id`. Efecto: una película puede cambiar de identificador y generar duplicados.

## Comprobación

La sintaxis JavaScript y una prueba HTTP del endpoint raíz se comprueban con `npm test`. Las pruebas de operaciones MongoDB requieren una instancia configurada en `.env`.
