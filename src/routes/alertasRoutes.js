import express from 'express'
import prisma from '../prismaClient.js'

const router = express.Router()

router.get('/', async (req, res) => {
    try{
        const alertas = await prisma.alerta.findMany({})
        res.status(200).json(alertas)
    }catch (error){
        res.status(500).json({message: error.message})
    }
})

router.get('/:alerta_id', async (req, res) => {
    const { alerta_id } = req.params
    const alerta = await prisma.alerta.findUnique({
        where: {
            alerta_id: alerta_id
        }
    })
    res.status(200).json(alerta)
})

router.post('/', async (req, res) => {
    try {
        const alertas = req.body

        const newAlertas = await prisma.alerta.createMany({
            data: alertas
        })

        res.status(201).json({ message: "Alerta criado com sucesso!"})
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

router.put('/:alerta_id', async (req, res) => {
    const alerta = req.body
    const { alerta_id } = req.params

    const updatedAlerta = await prisma.alerta.update({
        where: {
            alerta_id: alerta_id,
        },
        data: alerta,
    })
    res.status(200).json(updatedAlerta)
})

router.delete('/:alerta_id', async (req, res) => {
    const { alerta_id } = req.params
    await prisma.alerta.delete({
        where: {
            alerta_id: alerta_id
        }
    })
    res.status(200).send({ message: "Alerta deletado." })
})

export default router