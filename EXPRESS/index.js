const express = require("express")
const app = express()
const port = 3000

app.get("/", function(req, res){
    res.send('bem vindo ao meu server')
})

app.get("/canal", function(req, res){
    res.send('<h1>bem vindo ao meu canal</h1>')
})

app.get("/canal/:nome", function(req, res){
    var nome = req.params.nome
    res.send('<h1>bem vindo '+ nome +' </h1>')
})

app.listen(port, ()=>{
    console.log("server rodando")
})

