const express = require("express");
const { MongoClient } = require("mongodb");
const peliculasModelo = require("./models/peliculas");
require("dotenv").config();

const app = express();

const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI;

const client = new MongoClient(MONGODB_URI);

app.use(express.json());


// =========================
// RUTA PRINCIPAL
// =========================

app.get("/", (req, res) => {
    res.json({
        mensaje: "¡Bienvenido a nuestra API de películas!",
        peliculasModeloDisponible: peliculasModelo.length > 0
    });
});


// =========================
// OBTENER TODAS LAS PELÍCULAS
// =========================

app.get("/peliculas", async (req, res) => {
    try {
        const db = client.db("peliculasDB");
        const coleccion = db.collection("peliculas");

        const peliculas = await coleccion.find().toArray();

        res.json(peliculas);

    } catch (error) {
        console.error("Error:", error);

        res.status(500).json({
            error: "Error al obtener las películas"
        });
    }
});


// =========================
// OBTENER UNA PELÍCULA POR ID
// =========================

app.get("/peliculas/:id", async (req, res) => {
    try {
        const id = parseInt(req.params.id);

        if (isNaN(id)) {
            return res.status(400).json({
                error: "El ID debe ser un número"
            });
        }

        const db = client.db("peliculasDB");
        const coleccion = db.collection("peliculas");

        const pelicula = await coleccion.findOne({
        id: req.params.id
        });

        if (!pelicula) {
            return res.status(404).json({
                error: "Película no encontrada"
            });
        }

        res.json(pelicula);

    } catch (error) {
        console.error("Error:", error);

        res.status(500).json({
            error: "Error al buscar la película"
        });
    }
});


// =========================
// CREAR UNA PELÍCULA
// =========================

app.post("/peliculas", async (req, res) => {
    try {
        const db = client.db("peliculas");
        const coleccion = db.collection("pelicula");
        const nuevaPelicula = req.body;

        if (
            nuevaPelicula.id === undefined ||
            !nuevaPelicula.titulo ||
            nuevaPelicula.anio === undefined ||
            !nuevaPelicula.genero
        ) {
            return res.status(400).json({
                error: "Faltan datos obligatorios"
            });
        }

        const peliculaExistente = await coleccion.findOne({
            id: nuevaPelicula.id
        });

        if (peliculaExistente) {
            return res.status(409).json({
                error: "Ya existe una película con ese ID"
            });
        }

        await coleccion.insertOne(nuevaPelicula);

        res.status(201).json({
            mensaje: "Película creada correctamente",
            pelicula: nuevaPelicula
        });

    } catch (error) {
        console.error("Error:", error);

        res.status(500).json({
            error: "Error al crear la película"
        });
    }
});


// =========================
// MODIFICAR UNA PELÍCULA
// =========================

app.put("/peliculas/:id", async (req, res) => {
    try {
        const id = parseInt(req.params.id);

        if (isNaN(id)) {
            return res.status(400).json({
                error: "El ID debe ser un número"
            });
        }

        const db = client.db("peliculasDB");
        const coleccion = db.collection("peliculas");

        const resultado = await coleccion.updateOne(
            { id: id },
            { $set: req.body }
        );

        if (resultado.matchedCount === 0) {
            return res.status(404).json({
                error: "Película no encontrada"
            });
        }

        res.json({
            mensaje: "Película modificada correctamente"
        });

    } catch (error) {
        console.error("Error:", error);

        res.status(500).json({
            error: "Error al modificar la película"
        });
    }
});


// =========================
// ELIMINAR UNA PELÍCULA
// =========================

app.delete("/peliculas/:id", async (req, res) => {
    try {
        const id = parseInt(req.params.id);

        if (isNaN(id)) {
            return res.status(400).json({
                error: "El ID debe ser un número"
            });
        }

        const db = client.db("peliculasDB");
        const coleccion = db.collection("peliculas");

        const resultado = await coleccion.deleteOne({
            id: id
        });

        if (resultado.deletedCount === 0) {
            return res.status(404).json({
                error: "Película no encontrada"
            });
        }

        res.json({
            mensaje: "Película eliminada correctamente"
        });

    } catch (error) {
        console.error("Error:", error);

        res.status(500).json({
            error: "Error al eliminar la película"
        });
    }
});


// =========================
// INICIAR SERVIDOR
// =========================

async function iniciarServidor() {
    try {
        await client.connect();

        console.log("Conectado a MongoDB correctamente");

        app.listen(PORT, () => {
            console.log(
                `Servidor funcionando en http://localhost:${PORT}`
            );
        });

    } catch (error) {
        console.error(
            "Error al conectar a MongoDB:",
            error
        );
        process.exitCode = 1;
    }
}

process.on("uncaughtException", (error) => {
    console.error("Error no controlado:", error.message);
});

process.on("unhandledRejection", (error) => {
    console.error("Promesa rechazada:", error);
});

if (require.main === module) {
    iniciarServidor();
}

module.exports = app;