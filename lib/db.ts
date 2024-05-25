import { PrismaClient } from '@prisma/client';

export default function db() {
    var prisma: PrismaClient | undefined;
    return prisma || new PrismaClient();
}