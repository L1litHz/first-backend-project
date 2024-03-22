const mongoose = require('mongoose')
require('dotenv').config()


//async é uma execução que da prioridade a ação anterior
async function conectaBandoDeDados() {
   try {
    console.log('Conexão com o Bando de Dados iniciou')

    //serve para que outros usuarios não aprem de serem atendidos
    await mongoose.connect(process.env.MONGO_URL)
    console.log('Conexão com o Banco de Dados feita com sucesso!')

   } catch(erro) {
    console.log(erro)
   }

}

module.exports = conectaBandoDeDados 
