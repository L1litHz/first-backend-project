const express = require("express")   //aqui inicia o express
const router = express.Router()  //aqui configura a primeira parte da rota
const cors = require('cors') //trazendo pacote cors para consumir API no front end
const conectaBandoDeDados = require('./dataBase')  //ligando ao arquiv Banco de dados
conectaBandoDeDados() //chamando a função que conect o bando

const Mulher = require('./mulherModel')
const app = express()  //inicia o app
app.use(express.json())
app.use(cors())



const porta = 3333  // porta criada

//GET
async function mostraMulheres(request, response) {
  try{

      const mulheresVindasDoBancoDeDados = await Mulher.find()
      response.json(mulheresVindasDoBancoDeDados)
    } catch (erro) {
      console.log(erro)
    }
}

//POST
async function criaMulher(request, response) {

  const novaMulher = new Mulher({

      nome: request.body.nome,

      imagem: request.body.imagem,

      minibio: request.body.minibio,

  })

  try {

    const mulherCriada = await novaMulher.save()

    response.status(201).json(mulherCriada)

} catch (erro) {

    console.log(erro)

}

}

//\PATCH
async function corrigeMulher(request, response) {

  try {

      const mulherEncontrada = await Mulher.findById(request.params.id)



      if (request.body.nome) {

          mulherEncontrada.nome = request.body.nome

      }

      if (request.body.minibio) {

          mulherEncontrada.minibio = request.body.minibio

      }

 
      if (request.body.imagem) {

          mulherEncontrada = request.body.imagem

      }

        const mulherAtualizadaNoBancoDeDados = await mulherEncontrada.save()

      response.json(mulherAtualizadaNoBancoDeDados)

  } catch (erro) {

      console.log(erro)
  }
}

//DELETE
async function deletaMulher(request, response) {

  try {

      await Mulher.findByIdAndDelete(request.params.id)

      response.json({messagem: 'Mulher deletada com sucesso!'})

  } catch(erro) {

      console.log(erro)

  }

}

app.use(router.get('/mulheres', mostraMulheres)) //configurei rorta GET /mulheres
app.use(router.post('/mulheres', criaMulher)) //rota para POST / mulheres
app.use(router.patch('/mulheres/:id', corrigeMulher)) // rota PATCH/mulheres/:id configurada
app.use(router.delete('/mulheres/:id', deletaMulher)) //configuração rota DELETE/MULHERES


//PORTA
function mostraPorta() {

    console.log("Servidor criado e rodando na porta ", porta )
}

app.listen(porta, mostraPorta) //servidor ouvindo porta