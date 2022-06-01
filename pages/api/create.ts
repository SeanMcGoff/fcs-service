import { withApiAuthRequired } from '@auth0/nextjs-auth0';
import { CauseArea } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../lib/prisma';


const apiRoute: NextApiHandler<any> = async (req: NextApiRequest, res: NextApiResponse) => {
    // Filter Out non-POST reqs
    if (req.method !== 'POST') {
        res.status(405).send({ message: "Error: Wrong Request Type"})
        return
    }
    const body = req.body
    try {
        await prisma.service.create({
            data: {
                name: body.name as string,
                causeArea: body.causeArea as CauseArea,
                work: body.work as string,
                address: body.address as string,
                email: body.email as string,
                phone: body.phone as string,
                maxStudents: parseInt(body.maxStudents) as number,
                availableStudentSlots: parseInt(body.availableStudentSlots) as number,
                published: body.published as boolean,
                reminded: body.reminded as boolean,
                notes: body.notes as string
            }
        })
    }
    catch (err) {
        // for custom errors
        if (typeof err === 'string') {
            return res.status(400).end(err)
        }
        //prisma errors
        let prismaErr = err as PrismaClientKnownRequestError
        //just send the prisma error code if one pops up
        return res.status(400).end(`Prisma error code ${prismaErr.code}`)
    }
    // If no error, return 200 Status
    return res.status(200).end("OK")
}

export default withApiAuthRequired(apiRoute)