# API de Películas

Backend desarrollado con Node.js, JavaScript, Express y MongoDB.

## Tecnologías utilizadas

- Node.js
- JavaScript
- Express
- MongoDB
- MongoDB Driver
- dotenv

## Descripción

Esta aplicación es una API REST que permite consultar información
sobre películas almacenadas en una base de datos MongoDB.

La API utiliza JSON tanto para las solicitudes como para las respuestas.

## Estructura del proyecto

```text
Backend-Peliculas/
│
├── src/
│   ├── models/
│   │   └── peliculas.js
│   │
│   ├── seed.js
│   └── server.js
│
├── .env
├── .env.example
├── .gitignore
├── package.json
├── package-lock.json
└── README.md