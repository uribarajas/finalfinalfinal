const {mongoose} = require("../mongodb-connect");
const { getHash } = require("../utils/crypt");

//decirle a jorge que se meta a la base de datos
let usersSchema = mongoose.Schema({
    usuario: {
        type: String,
        unique: true,
        required: true
    },
    nombre: {
        type: String,
        required: true
    },
    apellidos:{
        type:String,
        required: true,
    },
    contrasena: {
        type:String,
        required: true
    },
    carrera: {
        type:String,
        required: true,
    },
    semestre: {
        type:Number,
        required: true,
    },
    materias: [{
        type: String
    }],
    horarioFuturo: [{
        type: String
    }]
    //Agregar materias Acreditadas, 
    //el campo de materias se puede cambiar por "horarios"
    /*
    horarios: [{
        nombreHorario: {
            type: String,
            required: true
        },
        materias: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Materia"
        }]
    }]

    */
    //y si queremos agregar mas añadir un campo para definir si es un profesor, lo que nos permitira añadir materias solo del profesor, usuario que sea mejor expediente, y falta correo
})


// aqui sigo

//get usuario especifico -----> este buscar por el id del usuario o por el expediente
usersSchema.statics.getUser = async (usuario)=>{
    return await User.findOne({usuario});
}

//get usuarios
usersSchema.statics.getUsers = async (filtro)=>{
    let project = {usuario:1, nombre:1, apellidos:1, contrasena:1, carrera:1, semestre:1, materias:1, horarioFuturo:1}
    let props = Object.keys(filtro);

    props = props.map(prop => ({[prop]: filtro[prop]}))
    console.log(props);

    let search = {$and: props };
    if(props.length == 0){
        search = {};
    }

    return await User.find(search, project);
}

//para borrar un usuario especifico
usersSchema.statics.deleteUser = async (usuario)=>{
    return await User.findOneAndDelete({usuario})
}

//subir a la base de datos
usersSchema.statics.saveUser = async (user)=>{
    //Generar id con nano id, al mismo tiempo que encriptar la contraseña con b crypt
    user.contrasena = await getHash(user.contrasena);
    let userToSave = User(user);
    return await userToSave.save();
}


const User = mongoose.model("User", usersSchema);










module.exports = {User};