const express = require('express');
const routes = express.Router(); //responsavel pelas rotas
const instructors = require('./controllers/instructors') // funções externas
const members = require('./controllers/members') // funções externas


routes.get('/', function(req, res){
    return res.redirect('/instructors')
})

routes.get('/instructors', instructors.index)
routes.get('/instructors/create',instructors.create)
routes.get('/instructors/:id', instructors.show) // exibindo dados
routes.get('/instructors/:id/edit', instructors.edit) // função editar
routes.post('/instructors', instructors.post ) // salvando dados enviado do formulario create
routes.put("/instructors", instructors.put) // atualizando enfiado do formulario edit
routes.delete('/instructors', instructors.delete)// delete enviado do formulario



/* members */
routes.get('/members', members.index)
routes.get('/members/create', members.create )
routes.get('/members/:id', members.show) // exibindo dados
routes.get('/members/:id/edit', members.edit) // função editar
routes.post('/members', members.post) // salvando dados enviado do formulario create
routes.put("/members", members.put) // atualizando enfiado do formulario edit
routes.delete('/members', members.delete)// delete enviado do formulario

module.exports = routes