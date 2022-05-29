import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../lib/prisma';

export default async function (req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        const services = await prisma.service.findMany({});
        return res.status(200).json(JSON.stringify(services))
    } else {
        // If not POST request, return 405 status
        return res.status(405).end("Error: Wrong Request Type")
    }
}