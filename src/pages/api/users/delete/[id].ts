import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

const Users: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {

    const prisma = new PrismaClient()

    const allUsers = await prisma.users.findMany({
        include: {
            enderecos: true
        }
    })

    return res.json({
        api_version: "2.0",
        result: allUsers
    })


}

export default Users
