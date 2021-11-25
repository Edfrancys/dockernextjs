import { PrismaClient } from '@prisma/client'

let prisma: any

if (!prisma) {
    prisma = new PrismaClient()
} else {
    console.log('Conection Prisma On Exist');
}

export default prisma