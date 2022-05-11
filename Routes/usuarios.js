//bien
const express = require("express");
const router = express.Router();

const { auth } = require("../middleware/auth.js");



//bien
const { User } = require("../db/dataBase/usuariosDB");


//002
//GET {{host}}/api/usuarios
//segun yo ya esta listo
router.get('/', auth, async (req,res)=>{
    console.log(req.query);
    req.usuario//aqui poner el token con un middleware
    let {semestre, nombreMateria, carrera} = req.query;

    let  query = {};
    //despues ver esto
    if(carrera)
        query.carrera = new RegExp(carrera, 'i');
    if(nombreMateria)
        query.nombreMateria = new RegExp(nombreMateria, 'i');
    if(semestre)
        query.semestre = new RegExp(semestre, 'i');



    // if(materias)
    //     query.materias = new RegExp(materias, 'i');
    //cambiarlo a busqueda de materias

    //checar esta linea
    let usuarioLogeado = await User.getUser(req.usuario);
    if (!usuarioLogeado){
        res.status(404).send({Error:"No se encontro ningun usuario"});
    }
    //esta va de la mano con lo que se mueva arriba
    res.send(usuarioLogeado);
})


// 003
// POST {{host}}/api/usuarios
//segun yo ya listo, falta revisar
router.post('/', async (req,res)=>{
    console.log(req.body);
    console.log("holaaaa");

    let newUser = {};
    let {usuario, nombre, apellidos, contrasena, carrera, semestre, materias, horarioFuturo} = req.body;
    
    let userdoc = await User.find({usuario})
    if(userdoc){
        res.status(400).send({Error:"Ya existe este usuario"});
        return;
    }

    if(usuario && nombre && apellidos && contrasena && carrera && semestre && materias)
    {
        newUser.usuario = usuario;
        newUser.nombre = nombre;
        newUser.apellidos = apellidos;
        newUser.contrasena = contrasena;
        newUser.carrera = carrera;
        newUser.semestre = semestre;
        newUser.materias = materias;
        newUser.horarioFuturo = horarioFuturo;
        console.log(newUser);
        let doc= await User.saveUser(newUser)
        res.status(201).send(doc);
    }
    else
    {
        res.status(400).send({Error:"Faltan datos por llenar"})
    }
})



router.get('/lista', (req,res)=>{
    res.send("en lista")
})


//004
//GET {{host}}/api/materias/720563
// aqui ando
router.get('/:usuario', async (req,res)=>{
    console.log(req.params.usuario);
    let user = await User.getUser(req.params.id); //  users.find(usr => usr.id == req.params.id)
    if(user){
        res.send(user)
    }else{
        res.status(404).send({error: " no encontrado"})
    }
})


//delete 001
//DELETE {{host}}/api/materias/720563
//segun yo listo hay que revisarlo
router.delete('/:usuario', async (req,res)=>{
    let doc = await User.deleteUser(req.params.usuario)

    if(doc){
        res.send(doc)
        return;
    }
    res.status(404).send({error: "no se encontró usuario"})
})



module.exports = router;