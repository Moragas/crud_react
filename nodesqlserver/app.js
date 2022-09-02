//Configurações de servidor e banco de dados
const { json } = require('body-parser');
const { PrismaClient } = require('@prisma/client')
const cors = require('cors')
const express = require('express'); 
const app = express();   
const prisma = new PrismaClient()
app.use(cors());
app.use(json());          
const port = 3001;                  

//Método create
app.post("/", async (req, res) => {
    try {
        const response = await prisma.pessoa.create({
            data: req.body
        })
        return res.json({
            ok: true,
            response
        })
    } catch (error) {
        console.log(error)
        return res.status(401).json({
            message: "Error"
        })
    }
})

//Método read all
app.get('/', async (req, res) => {        
    try {
        const pessoas = await prisma.pessoa.findMany({
            orderBy: [
                {
                    Nome: 'asc'
                }
            ]
        })
        return res.status(200).json(pessoas)
    } catch (error) {
        console.log(error)
        return res.status(401).json({
            message: "Error"
        })
    }                                                   
});

//Método read por Id
app.get('/:IDPessoa', async (req, res) => {        
    try {
        const idPessoa = req.params.IDPessoa
        const pessoa = await prisma.pessoa.findUnique({where: {
                IDPessoa: Number(idPessoa),
            }
        })
        return res.status(200).json(pessoa)
    } catch (error) {
        console.log(error)
        return res.status(401).json({
            message: "Error"
        })
    }                                                   
});

//Método update
app.put("/:IDPessoa", async (req, res) => {
    try {
        const idPessoa = req.params.IDPessoa
        const response = await prisma.pessoa.update({
            data: req.body,
            where: {IDPessoa: Number(idPessoa)}
        })
        return res.status(200).json({
            ok: true,
            response
        })
    } catch (error) {
        console.log(error)
        return res.status(401).json({
            message: "Error"
        })
    }
})

//Método delete
app.delete("/:IDPessoa", async (req, res) => {
    try {
        const idPessoa = req.params.IDPessoa
        await prisma.pessoa.delete({where: {
            IDPessoa: Number(idPessoa)
        }})
        return res.status(200).json({
            message: "Deletado com sucesso!"
        })
    } catch (error) {
        console.log(error)
        return res.status(401).json({
            message: "Error"
        })
    }           
})

//Inicialização do servidor na porta escolhida
app.listen(port, () => {            
    console.log(`Servidor aberto na porta ${port}`); 
});