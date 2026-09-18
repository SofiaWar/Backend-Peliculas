const assert = require("node:assert/strict");
const http = require("node:http");
const test = require("node:test");

process.env.MONGODB_URI = "mongodb://127.0.0.1:27017/pruebas";

const app = require("../src/server");

test("GET / devuelve una respuesta JSON de bienvenida", async () => {
    const servidor = app.listen(0);
    const { port } = servidor.address();

    try {
        const respuesta = await new Promise((resolve, reject) => {
            http.get(`http://127.0.0.1:${port}/`, (res) => {
                let cuerpo = "";

                res.setEncoding("utf8");
                res.on("data", (fragmento) => {
                    cuerpo += fragmento;
                });
                res.on("end", () => {
                    resolve({
                        statusCode: res.statusCode,
                        contentType: res.headers["content-type"],
                        cuerpo
                    });
                });
            }).on("error", reject);
        });

        assert.equal(respuesta.statusCode, 200);
        assert.match(respuesta.contentType, /application\/json/);
        assert.equal(JSON.parse(respuesta.cuerpo).peliculasModeloDisponible, true);
    } finally {
        await new Promise((resolve, reject) => {
            servidor.close((error) => error ? reject(error) : resolve());
        });
    }
});
