
module.exports = {
  
  //654739200000
  age: function (timestamp) {
    const today = new Date() // dd/mm/yy de hoje
    const birthDate = new Date(timestamp) // data aniversario da pessoa

    //2019 - 1990 = 30
    let age = today.getUTCFullYear() - birthDate.getFullYear()
    // Mês
    const month = today.getUTCMonth() - birthDate.getMonth()

    today.getUTCDate() // dia atual
    birthDate.getUTCDate() // dia do aniversario

    if (month < 0 || month == 0 && today.getUTCDate() <= birthDate.geUTCtDate()) {
      age = age - 1
    }

    return age
  },


  date: function(timestamp){
    
    const date = new Date(timestamp) 

    //YYY
    const year = date.getUTCFullYear()

    //mm
    const month = `0${date.getUTCMonth() + 1}`.slice(-2) // 0 à 11 , com + 1 == 0 à  12

    //DD
    const day = `0${date.getUTCDate()}`.slice(-2) 

    // return yyy-mm-dd

    return {
      day,month,year,
      iso: `${year}-${month}-${day}`,
      birthDay: `${day}/${month}/${year}`
    }

  }


}

  