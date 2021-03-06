import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../lib/prisma';

const serviceNames =  async function (req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') {
        // If not POST request, return 405 status
        res.status(405).end("Error: Wrong Request Type")
    }
    const services = await prisma.service.findMany({
        select: {
            name: true
        }
    });
    let namelist: string[] = []
    services.forEach((s) => {
        namelist.push(s.name)
    })
    res.status(200).json(JSON.stringify(namelist))
}

export default serviceNames