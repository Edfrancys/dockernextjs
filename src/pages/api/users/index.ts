import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'
import { exit } from 'process'
import prisma from '../../../lib/prismaClient'

const Users: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {

    const allUsers = await prisma.users.findMany({
        include: {
            enderecos: true
        }
    })

    const reqData = req.body

    if (req.method === "GET") {
        return res.status(200).json({
            success: {
                message: "Success"
            },
            result: allUsers
        })
    } else if (req.method === "POST") {

        const verifyUser = await prisma.users.findFirst({
            where: {
                email: reqData.email
            }
        })

        if (verifyUser) {
            return res.status(400).json({
                success: {
                    message: "Este email já esta cadastro"
                },
                result: verifyUser.email
            })
        } else {
            const addUsers = await prisma.users.create({
                data: reqData
            })

            if (addUsers) {
                return res.status(200).json({
                    success: {
                        message: "User adicionado"
                    },
                    result: addUsers
                })
            }
        }

    } else {
        return res.status(400)
            .json({
                message: "Error: ops, não permitido"
            })
    }




}

export default Users
