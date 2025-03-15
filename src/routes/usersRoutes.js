import express from 'express'
import prisma from '../prismaClient.js'

const router = express.Router()

router.get('/', async (req, res) => {
    const users = await prisma.user.findMany()
    res.status(200).json(users)
})

router.get('/:user_id', async (req, res) => {
    const { user_id } = req.params
    const user = await prisma.user.findUnique({
        where: {
            user_id: user_id
        }
    })
    res.status(200).json(user)
})

router.post('/', async (req, res) => {
    try {
        const users = req.body;
        
        if (!Array.isArray(users) || users.length === 0) {
            return res.status(400).json({ error: "O array de users é obrigatório e não pode estar vazio." })
        }

        const usersWithoutId = users.map(({ user_id, ...rest }) => rest);

        const newusers = await prisma.user.createMany({
            data: usersWithoutId
        })

        res.status(201).json({ message: "Usuárias criadas com sucesso!", count: newusers.count })
    } catch (error) {
        res.status(500).json({ error: "Erro ao criar usuárias." })
    }
})

router.put('/:user_id', async (req, res) => {
    const user = req.body
    const { user_id } = req.params

    const updateduser = await prisma.user.update({
        where: {
            user_id: user_id,
        },
        data: user,
    })
    res.json(updateduser)
})

router.delete('/:user_id', async (req, res) => {
    const { user_id } = req.params
    await prisma.user.delete({
        where: {
            user_id: user_id
        }
    })
    res.status(200).send({ message: "Usuária deletada." })
})

export default router