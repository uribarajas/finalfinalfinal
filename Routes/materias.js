const router = require("express").Router();
const { Materia } = require("../db/dataBase/materiasDB");


router.get("/", async (req, res)=>{
    console.log(req.query);

    let {nombre, codigoClase, profesor, modalidad} = req.query;

    let  query = {};
    if(nombre){
        query.nombre = new RegExp(nombre, 'i');
    }
    if(codigoClase){
        query.codigoClase = new RegExp(codigoClase, 'i');
    }
    if(profesor){
        query.profesor = new RegExp(profesor, 'i');
    }
    if(modalidad){
        query.modalidad = new RegExp(modalidad, 'i');
    }

    let materias = await Materia.getMaterias(query);
    
    res.send(materias);
    
});
/*
router.get('/:id', async (req,res)=>{
    console.log(req.params.id);
    let materia = await Materia.getMateria(req.params.id); //  users.find(usr => usr.id == req.params.id)
    if(materia){
        res.send(materia)
    }else{
        res.status(404).send({error: " no encontrado"})
    }
})*/

router.get('/:codigoClase', async (req,res)=>{
    console.log(req.params.codigoClase);
    let materia = await Materia.getMateriaByClass(req.params.codigoClase); //  users.find(usr => usr.id == req.params.id)
    if(materia){
        res.send(materia)
    }else{
        res.status(404).send({error: " no encontrado"})
    }
})

router.post('/', async (req, res)=>{

    
        console.log(req.body);
        let newMateria = {};
    
        //faltan mas campos
        let {nombre, codigoClase, salon, horario, descripcion, infoMateria, modalidad, periodo, año, profesor, correoProfesor, descripcionProfesor, requerimientos, materiasRequeridas} = req.body;
        
        let isRepetido = await Materia.getMateriaByClass(codigoClase);

        if(! isRepetido){
            if(nombre && codigoClase && salon && horario && descripcion && infoMateria && modalidad && periodo && año && profesor && correoProfesor && descripcionProfesor && requerimientos && materiasRequeridas){
                newMateria.nombre = nombre;
                newMateria.codigoClase = codigoClase;
                newMateria.salon = salon;
                newMateria.horario = horario;
                newMateria.descripcion = descripcion;
                newMateria.infoMateria = infoMateria;
                newMateria.modalidad = modalidad;
                newMateria.periodo = periodo;
                newMateria.año = año;
                newMateria.profesor = profesor;
                newMateria.correoProfesor = correoProfesor;
                newMateria.descripcionProfesor = descripcionProfesor;
                newMateria.requerimientos = requerimientos;
                newMateria.materiasRequeridas = materiasRequeridas;
        
                console.log(newMateria);
                let doc =  await Materia.saveMateria(newMateria);
        
                res.status(201).send(doc);
            }else{
                res.status(400).send("Faltan datos");
            }
        }else{
            res.status(401).send({error: "La materia ya existe"})
        }
});

router.delete('/:codigoClase', async (req,res)=>{

        let doc = await Materia.deleteMateria(req.params.codigoClase)
        if(doc){
            res.send(doc)
            return;
        }else{
            res.status(404).send({error: "no se encontró usuario"})
        }

})

//falta put

router.put('/:id', async (req,res)=>{
    let materia = await Materia.getMateria(req.params.id);
    console.log(materia);

    let {nombre, codigoClase, salon, horario, descripcion, infoMateria, modalidad, periodo, año, profesor, correoProfesor, descripcionProfesor, requerimientos, materiasRequeridas, cupo} = req.body;
    
    if(materia){
        materia.nombre = nombre ? nombre : materia.nombre;
        materia.codigoClase = codigoClase ? codigoClase : materia.codigoClase;
        materia.salon = salon ? salon : materia.salon;
        materia.horario = horario ? horario : materia.horario;
        materia.descripcion = descripcion ? descripcion : materia.nombre;
        materia.infoMateria = infoMateria ? infoMateria : materia.infoMateria;
        materia.modalidad = modalidad ? modalidad : materia.modalidad;
        materia.periodo = periodo ? periodo : materia.periodo;
        materia.año = año ? año : materia.año;
        materia.profesor = profesor ? profesor : materia.profesor;
        materia.correoProfesor = correoProfesor ? correoProfesor : materia.correoProfesor;
        materia.descripcionProfesor = descripcionProfesor ? descripcionProfesor : materia.descripcionProfesor;
        materia.requerimientos = requerimientos ? requerimientos : materia.requerimientos;
        materia.materiasRequeridas = materiasRequeridas ? materiasRequeridas : materia.materiasRequeridas;
        materia.cupo = cupo ? cupo : materia.cupo;
        
        let doc = await Materia.updateMateria(materia);

        if(doc){
            res.send(doc)
            return;
        }else{
            res.status(404).send({error: "no se pudo realizar el update"});
        }
    }else{
        res.status(404).send({error: "Informacion incompleta"});
    }
})

module.exports = router;
