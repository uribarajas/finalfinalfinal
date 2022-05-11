const jwt = require("jsonwebtoken");

function auth(req,res,next){
    let token = req.get('x-auth');
    if(token){
        console.log(token);
        jwt.verify(token,process.env.TOKEN_KEY,(err,payload)=>{
            if(err){
                if(err.name == "TokenExpiredError"){
                    res.status(401).send({error: "Token expiró, vuelve a loguearte"})
                }else{
                    res.status(401).send({error: "Token no válido"})
                }
               
                // console.log(err);
                // console.log(err.name);
                return;
            }

            console.log(payload.email);
            req.userId = payload.id;
            req.email = payload.email;
            req.usuario= payload.usuario;
            next();
        }) 
    }else{
        res.status(401).send({error: "no autenticado, falta token"})
        return;
    }
}

function validarUsuario(req,res,next){
    let authHeader = req.get('x-user')
    if(authHeader && authHeader=="myAdminToken"){
        req.esAdministrador = true;
    }else{
        req.esAdministrador= false;
    }
    next();
}

function requireAdmin(req,res,next){
    if(req.esAdministrador){
        next()
    }else{
        res.status(401).send({error: "requiere permiso de administrador"})
        return;
    }

}

module.exports = {auth, validarUsuario, requireAdmin}