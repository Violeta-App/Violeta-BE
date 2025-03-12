import express from 'express'
import prisma from '../prismaClient.js'
import calculateScore from '../utilities/scoreCalculator.js'

const router = express.Router()

router.get('/', async (req, res) => {
    const ocurrences = await prisma.ocurrence.findMany()
    res.status(200).json(ocurrences)
})

router.get('/:ocurrence_id', async (req, res) => {
    const { ocurrence_id } = req.params
    const ocurrence = await prisma.ocurrence.findUnique({
        where: {
            ocurrence_id: ocurrence_id
        }
    })
    res.status(200).json(ocurrence)
})

router.post('/', async (req, res) => {
    try {
        const occurrences = req.body;
        
        if (!Array.isArray(occurrences) || occurrences.length === 0) {
            return res.status(400).json({ error: "O array de ocorrências é obrigatório e não pode estar vazio." })
        }

        const occurrencesWithScore = occurrences.map(occurrence => ({
            ...occurrence,
            victim_name: occurrence.anonymous ? "" : occurrence.victim_name,
            ocurrence_score: calculateScore(occurrence.main_reason, occurrence.victim_situation)
        }))

        const newOccurrences = await prisma.ocurrence.createMany({
            data: occurrencesWithScore
        })

        res.status(201).json({ message: "Ocorrências criadas com sucesso!", count: newOccurrences.count })
    } catch (error) {
        res.status(500).json({ error: "Erro ao criar ocorrências." })
    }
})

router.put('/:ocurrence_id', async (req, res) => {
    const ocurrence = req.body
    const { ocurrence_id } = req.params

    const updatedOcurrence = await prisma.ocurrence.update({
        where: {
            ocurrence_id: ocurrence_id,
        },
        data: ocurrence,
    })
    res.json(updatedOcurrence)
})

router.delete('/:ocurrence_id', async (req, res) => {
    const { ocurrence_id } = req.params
    await prisma.ocurrence.delete({
        where: {
            ocurrence_id: ocurrence_id
        }
    })
    res.status(200).send({ message: "Ocorrência deletada." })
})

export default router