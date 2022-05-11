module.exports = {
    //dbUser: "Admin",
    //dbPassword: "9HnWgodgCnixyqGu",
    //dbName:"ProyectoHorarios",
    dbUser: "usuario",
    dbPassword:"ABcd1234",
    dbName:"myFirstDatabase",
    getUrl: function (){
        //return `mongodb+srv://${this.dbUser}:${this.dbPassword}@cluster1.mxevb.mongodb.net/${this.dbName}?retryWrites=true&w=majority`
        //return `mongodb+srv://${this.dbUser}:${this.dbPassword}@cluster0.2twa3.mongodb.net/${this.dbName}?retryWrites=true&w=majority`
        return `mongodb+srv://${this.dbUser}:${this.dbPassword}@cluster1.mxevb.mongodb.net/${this.dbName}?retryWrites=true&w=majority`
    }
}