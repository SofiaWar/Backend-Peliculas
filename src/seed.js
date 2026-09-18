const { MongoClient } = require("mongodb");
require("dotenv").config();

const client = new MongoClient(process.env.MONGODB_URI);

const peliculas = [
    {
        id: 1,
        titulo: "Harry Potter y la piedra filosofal",
        anio: 2001,
        genero: "Fantasía",
        director: "Chris Columbus",
        puntuacion: 7.6,
    },
    {
        id: 2,
        titulo: "El señor de los anillos: La comunidad del anillo",
        anio: 2001,
        genero: "Fantasía",
        director: "Peter Jackson",
        puntuacion: 8.8
    },
    {
        id: 3,
        titulo: "Coraline",
        anio: 2009,
        genero: "Animación",
        director: "Henry Selick",
        puntuacion: 7.7
    },
    {
        id: 4,
        titulo: "El conjuro",
        anio: 2013,
        genero: "Terror",
        director: "James Wan",
        puntuacion: 7.5
    },
    {
        id: 5,
        titulo: "Alicia en el país de las maravillas",
        anio: 2010,
        genero: "Fantasía",
        director: "Tim Burton",
        puntuacion: 6.4
    }
];

async function seed() {
    try {
        await client.connect();

        const db = client.db("peliculasDB");
        const coleccion = db.collection("peliculas");

        await coleccion.bulkWrite(
            peliculas.map((pelicula) => ({
                updateOne: {
                    filter: { id: pelicula.id },
                    update: { $set: pelicula },
                    upsert: true
                }
            }))
        );

        console.log("Películas cargadas correctamente.");
    } catch (error) {
        console.error("Error al cargar las películas:", error.message);
    } finally {
        await client.close();
    }
}

seed();