const express = require("express");
const materiaRoute = require("./routes/materias");
const app = express();
const port = 3000;
const usersRoute = require("./routes/usuarios")
app.use(express.json());
//donde estan los archivos estaticos (html, js, css)
app.use(express.static(__dirname + "/public"));

//leer atraves de req.body
app.use(express.json());

//añadir las rutas
app.use("/api/materias", materiaRoute);
app.use("/api/users", usersRoute);
// app.use("/api/usuarios", horarioRoute);

app.listen(port, ()=> console.log("Running"));