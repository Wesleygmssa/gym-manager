const fs = require('fs') // = > função para inserir os dados
const data = require("../data.json")// => dados salvos no banco
const {age , date} = require('../utils') // desestruturando objeto , funcões de data


//post
exports.post = function (req, res) {
    //req.query
    //req.body

    const keys = Object.keys(req.body)// pegando as chaves do objeto e transformando em array

    for (key of keys) {// validação antes de enviar para banco de dados
        if (req.body[key] == '') {
            return res.send('Please, fill all fields!')
        }
    }
    
 

    birth = Date.parse(req.body.birth)

    let id = 1 ; 
    const lastMember = data.members[data.members.length - 1]
    if (lastMember){
        id = lastMember.id + 1
    }


    data.members.push({
        ...req.body,
        id,
        birth
    })
       

   
   
    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
        if(err) return res.send("Write file error!")

        return res.redirect("members")
    } )

    

    // return res.send(req.body)
}

//show
exports.show = function (req, res) {
    //req.params
   const { id } = req.params

   const foundmember = data.members.find(function(member){
       return member.id == id
   })
    
    const member = {
        ...foundmember,
        birth: date(foundmember.birth).birthDay //=> calculando idade
    }


    if (!foundmember) return res.send('member not found!')
 
    return res.render('members/show', { member})
}

//edit

exports.edit = function (req , res) {
    //req.params
    const { id } = req.params
    
    const foundmember = data.members.find(function (member) {
        return member.id == id
    })
    if (!foundmember) return res.send('member not found!')
     
     // member.birth =  09345532454545454
     //date(member.birth)
     //return yyy-mm-dd


     const member = {
         ...foundmember,
         birth: date(foundmember.birth).iso // 2020-02-01
     }
   
  

    return res.render('members/edit', { member })
}

//put
exports.put = function (req , res) {

    const { id } = req.body
    let index = 0
   
    const foundmember = data.members.find(function (member, foundIndex) {
      if(member.id == id){
          index = foundIndex
          return true
      }
    })
 

    if (!foundmember) return res.send('member not found!')

    const member ={
        ...foundmember, //dados antigos
        ...req.body,        //dados atualizado
        birth: Date.parse(req.body.birth), // formato timestamp
        id: Number(req.body.id)
    }

    data.members[index] = member // identificado a posição e atualizando

    fs.writeFile('data.json', JSON.stringify(data, null, 2), function(err){
        if(err) return res.send(" write error!")

        return res.redirect(`/member/${id}`,{ member})
    })
}

//delet
exports.delete = function( req , res){
    const {id} = req.body
    
    const filterredmembers = data.members.filter(function(member){
        return member.id != id
    })

    data.members = filterredmembers

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){

       if(err) return res.send("write file error")

       return res.redirect('/members')

})

}

// index
exports.index =  function (req, res) {
    return res.render('members/index',{members: data.members})
}

//create
exports.create = function (req, res) {
    return res.render('members/create')
}