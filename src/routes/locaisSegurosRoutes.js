import express from 'express'
import prisma from '../prismaClient.js'

const router = express.Router()

router.get('/', async (req, res) => {
    try{
        const locaisSeguros = await prisma.localSeguro.findMany({})
        res.status(200).json(locaisSeguros)
    }catch (error){
        res.status(500).json({message: error.message})
    }
})

router.get('/:id', async (req, res) => {
    const { id } = req.params
    const localSeguro = await prisma.localSeguro.findUnique({
        where: {
            id: id
        }
    })
    res.status(200).json(localSeguro)
})

router.post('/', async (req, res) => {
    try {
        const locaisSeguros = req.body

        const newlocaisSeguros = await prisma.localSeguro.createMany({
            data: locaisSeguros
        })

        res.status(201).json({ message: "Local seguro criado com sucesso!"})
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

router.put('/:id', async (req, res) => {
    const localSeguro = req.body
    const { id } = req.params

    const updatedlocalSeguro = await prisma.localSeguro.update({
        where: {
            id: id,
        },
        data: localSeguro,
    })
    res.status(200).json(updatedlocalSeguro)
})

router.delete('/:id', async (req, res) => {
    const { id } = req.params
    await prisma.localSeguro.delete({
        where: {
            id: id
        }
    })
    res.status(200).send({ message: "Local seguro deletado." })
})

export default router