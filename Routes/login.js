const { User } = require("../db/DataBase/usuariosDB.js");
const jwt = require("jsonwebtoken");

const router = require("express").Router()
const bcrypt = require("bcryptjs")

router.post('/',async(req,res)=>{
   let {email, password} = req.body;
   let doc = await User.findOne({email})
   
   if(doc){
      if(bcrypt.compareSync(password, doc.password)){
          //Todo: generar token
        let token = jwt.sign({id: doc.id, email, usuario: doc.usuario},process.env.TOKEN_KEY, { expiresIn: 60*3 },)
        res.send({token})
      }else{
          res.status(400).send({error: "password incorrecto"})
      }
   }else{
       res.status(404).send({error: "usuario no existe"})
   }
})
module.exports = router;