const express = require("express")
const path = require("path")
const app = express()
const port = 3000

app.use(express.static(path.join(__dirname,'public', 'index')))

app.get("/", function(req, res){
    res.sendFile(path.join(__dirname, 'public', 'index', 'index.html'))
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

