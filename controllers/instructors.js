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
    
    let { avatar_url, birth, name, services, gender } = req.body

    birth = Date.parse(birth)
    const created_at = Date.now()
    const id = Number(data.instructors.length + 1)

    data.instructors.push({
        id,
        avatar_url,
        name,
        birth,
        gender, 
        services,
        created_at
    })

   
   
    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
        if(err) return res.send("Write file error!")

        return res.redirect("instructors")
    } )

    

    // return res.send(req.body)
}

//show
exports.show = function (req, res) {
    //req.params
   const { id } = req.params

   const foundInstructor = data.instructors.find(function(instructor){
       return instructor.id == id
   })
    
    const instructor = {
        ...foundInstructor,
        age: age(foundInstructor.birth), //=> calculando idade
        services: foundInstructor.services.split(","), //=> transformando em array
        created_at: new Intl.DateTimeFormat("pt-BR").format(foundInstructor.created_at) //=> tranformando em dd/mm/yyy
    }


    if (!foundInstructor) return res.send('Instructor not found!')
 
    return res.render('instructors/show', { instructor})
}

//edit

exports.edit = function (req , res) {
    //req.params
    const { id } = req.params
    
    const foundInstructor = data.instructors.find(function (instructor) {
        return instructor.id == id
    })
    if (!foundInstructor) return res.send('Instructor not found!')
     
     // instructor.birth =  09345532454545454
     //date(instructor.birth)
     //return yyy-mm-dd


     const instructor = {
         ...foundInstructor,
         birth: date(foundInstructor.birth).iso // 2020-02-01
     }
   
  

    return res.render('instructors/edit', { instructor })
}


//put
exports.put = function (req , res) {

    const { id } = req.body
    let index = 0
   
    const foundInstructor = data.instructors.find(function (instructor, foundIndex) {
      if(instructor.id == id){
          index = foundIndex
          return true
      }
    })
 

    if (!foundInstructor) return res.send('Instructor not found!')

    const instructor ={
        ...foundInstructor, //dados antigos
        ...req.body,        //dados atualizado
        birth: Date.parse(req.body.birth), // formato timestamp
        id: Number(req.body.id)
    }

    data.instructors[index] = instructor // identificado a posição e atualizando

    fs.writeFile('data.json', JSON.stringify(data, null, 2), function(err){
        if(err) return res.send(" write error!")

        return res.redirect(`/instructor/${id}`,{ instructor})
    })
}

//delet
exports.delete = function( req , res){
    const {id} = req.body
    
    const filterredInstructors = data.instructors.filter(function(instructor){
        return instructor.id != id
    })

    data.instructors = filterredInstructors

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){

       if(err) return res.send("write file error")

       return res.redirect('/instructors')

})

}

// index
exports.index =  function (req, res) {
    return res.render('instructors/index',{instructors: data.instructors})
}


//create

exports.create = function (req, res) {
    return res.render('instructors/create')
}
   