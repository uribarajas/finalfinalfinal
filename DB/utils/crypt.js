const bcrypt = require("bcrypt")

function getHash(password){
    return new Promise((resolve, reject)=>{
        bcrypt.hash(password, 8, (err, hash)=>{
            if(hash){
                resolve(hash)
            }

            if(err){
                reject(err)
            }
        })
    })
}

module.exports = {getHash}