const {mongoose} = require("../mongodb-connect");
const {nanoid} = require("nanoid");

let materiasSchema = mongoose.Schema({
    id: {
        type: String,
        unique: true,
        required: true
    },
    nombre: {
        type: String,
        required: true
    },
    codigoClase: {
        type: String,
        unique: true,
        required: true
    },
    salon: {
        type: String,
        unique: true,
        required: true
    },
    horario:{
        dias: [{
            type: String,
            required: true
        }],
        horaInicial: {
            type: String,
            required: true
        },
        horaFinal: {
            type: String,
            required: true
        }
    },
    descripcion: {
        type: String,
        required: true
    },
    infoMateria: [{
        semestre: {
            type: String,
            required: true
        },
        carrera: {
            type: String,
            required: true
        }, 
    }], 
    modalidad: {
        type: String,
        required: true
    },
    periodo :{
        type: String,
        required: true
    },
    año: {
        type: Number,
        reqired: true,
        integer: true
    },
    profesor: {
        type: String,
        required: true
    },
    correoProfesor: {
        type: String,
        required: true
    },
    descripcionProfesor: {
        type: String,
        required: true
    },
    requerimientos: {
        type: Boolean,
        required: true
    },
    materiasRequeridas: [{
        type: String
    }],
    cupo: {
        type: Number,
        reqired: true,
        integer: true,
    }
});

materiasSchema.statics.getMaterias = async (filtro)=>{
    let project = {_id: 1, id:1, nombre:1 , codigoClase:1 , salon:1 , horario:1 , descripcion:1 , infoMateria:1 , modalidad:1 , periodo:1 , año:1 , profesor:1 , correoProfesor:1 , descripcionProfesor:1 , requerimientos:1 , materiasRequeridas:1}
    let props = Object.keys(filtro);

    props = props.map(prop => ({[prop]: filtro[prop]}))
    console.log(props);

    let search = {$and: props };
    if(props.length == 0){
        search = {};
    }

    return await Materia.find(search, project);
}

materiasSchema.statics.getMateria = async (id)=>{
    return await Materia.findOne({id});
}

materiasSchema.statics.getMateriaByClass = async (codigoClase)=>{
    return await Materia.findOne({codigoClase});
}

materiasSchema.statics.deleteMateria = async (codigoClase)=>{
    return await Materia.findOneAndDelete({codigoClase})
}

materiasSchema.statics.updateMateria = async (materia)=>{
    return await Materia.findOneAndUpdate({id: materia.id},{$set: materia}, {new: true}); 
}

materiasSchema.statics.saveMateria = async (materia)=>{
    materia.id = nanoid();
    materia.cupo = 0;
    let materiaToSave = Materia(materia);

    return await materiaToSave.save();
}



const Materia = mongoose.model("materias", materiasSchema);
module.exports = {Materia};