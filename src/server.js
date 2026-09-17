const express = require("express");
const peliculas = require("./models/peliculas");

const app = express();

const PORT = 3000;

app.get("/", (req, res) => {
    res.json({
        mensaje: "¡Bienvenido a nuestra API de películas!"
    });
});

app.get("/peliculas", (req, res) => {
    res.json(peliculas);
});

app.listen(PORT, () => {
    console.log(`Servidor funcionando en http://localhost:${PORT}`);
});