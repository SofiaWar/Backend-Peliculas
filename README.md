# API de Películas

Backend de práctica desarrollado con Node.js, JavaScript, Express y MongoDB. Expone una API REST que trabaja con documentos de películas, incluyendo título, año, género, director y puntuación.

## Requisitos

- Node.js 18 o superior.
- Una instancia local o remota de MongoDB.
- npm.

## Instalación

```bash
npm install
```

Copia `.env.example` como `.env` y completa `MONGODB_URI` con la cadena de conexión de MongoDB. `PORT` es opcional y por defecto vale `3000`.

## Ejecución

```bash
npm run seed
npm start
```

El seed crea o actualiza las cinco películas de prueba en `peliculasDB.peliculas` sin borrar otros documentos. El servidor queda disponible en `http://localhost:3000` o en el puerto definido en `.env`.

Para comprobar la sintaxis de los archivos JavaScript:

```bash
npm test
```

## Endpoints

Todas las respuestas se devuelven en formato JSON.

| Método | Ruta | Descripción |
| --- | --- | --- |
| GET | `/` | Mensaje de bienvenida. |
| GET | `/peliculas` | Lista todas las películas. |
| GET | `/peliculas/:id` | Busca una película por su ID. |
| POST | `/peliculas` | Crea una película con los datos enviados en JSON. |
| PUT | `/peliculas/:id` | Modifica una película existente. |
| DELETE | `/peliculas/:id` | Elimina una película por ID. |

Ejemplo de cuerpo para crear una película:

```json
{
	"id": 6,
	"titulo": "Ejemplo",
	"anio": 2024,
	"genero": "Drama",
	"director": "Directora de ejemplo",
	"puntuacion": 8.1
}
```

## Estructura

```text
Backend-Peliculas/
├── src/
│   ├── config/
│   ├── controllers/
│   ├── middlewares/
│   ├── models/peliculas.js
│   ├── routes/
│   ├── seed.js
│   └── server.js
├── .env.example
├── ARCHITECTURE.md
├── ERRORES.md
├── package.json
└── README.md
```

Consulta [ARCHITECTURE.md](ARCHITECTURE.md) para el diseño del proyecto y [ERRORES.md](ERRORES.md) para el inventario de errores y sus efectos. El inventario está escrito en texto plano de forma intencional para que pueda cifrarse posteriormente por el equipo.

## Repositorio

https://github.com/SofiaWar/Backend-Peliculas