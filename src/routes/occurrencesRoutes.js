import express from 'express'
import prisma from '../prismaClient.js'
import calculateScore from '../utilities/scoreCalculator.js'

const router = express.Router()

router.get('/', async (req, res) => {
    const occurrences = await prisma.occurrence.findMany()
    res.status(200).json(occurrences)
})

router.get('/:occurrence_id', async (req, res) => {
    const { occurrence_id } = req.params
    const occurrence = await prisma.occurrence.findUnique({
        where: {
            occurrence_id: occurrence_id
        }
    })
    res.status(200).json(occurrence)
})

router.get('/:user_id', async (req, res) => {
    const { user_id } = req.params
    const occurrences = await prisma.occurrence.findMany({
        where: {
            user_id: user_id
        }
    })
    console.log("Ocorrências encontradas:", occurrences);
    res.status(200).json(occurrences)
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
            occurrence_score: calculateScore(occurrence.main_reason, occurrence.victim_situation)
        }))

        const newOccurrences = await prisma.occurrence.createMany({
            data: occurrencesWithScore
        })

        res.status(201).json({ message: "Ocorrências criadas com sucesso!", count: newOccurrences.count })
    } catch (error) {
        res.status(500).json({ error: "Erro ao criar ocorrências." })
    }
})

router.put('/:occurrence_id', async (req, res) => {
    const occurrence = req.body
    const { occurrence_id } = req.params

    const updatedoccurrence = await prisma.occurrence.update({
        where: {
            occurrence_id: occurrence_id,
        },
        data: occurrence,
    })
    res.json(updatedoccurrence)
})

router.delete('/:occurrence_id', async (req, res) => {
    const { occurrence_id } = req.params
    await prisma.occurrence.delete({
        where: {
            occurrence_id: occurrence_id
        }
    })
    res.status(200).send({ message: "Ocorrência deletada." })
})

export default router