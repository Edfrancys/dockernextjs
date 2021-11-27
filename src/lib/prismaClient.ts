import { PrismaClient } from '@prisma/client';
import { env } from 'process';

interface CustomGlobalType {
    prisma: PrismaClient
}

declare const global: CustomGlobalType

const prisma = global.prisma || new PrismaClient()

if (process.env.NEXT_ENV === 'development')
    global.prisma = prisma

export default prisma;