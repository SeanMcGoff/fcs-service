import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma';

export default async function (req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        // Get Service ID
        const { serviceID } = req.query
        try {
            // Try updating entry
            let nServiceID: number = parseInt(serviceID as string)
            if (isNaN(nServiceID)) {
                throw "Error: service ID must be a number"
            }
            await prisma.service.update({
                where: {
                  id: nServiceID,
                },
                data: {
                  published: true,
                },
            })
        }
        catch (err) {
            // for custom errors
            if (typeof err === 'string') {
                res.status(400).end(err)
            }
            //prisma errors
            let prismaErr = err as PrismaClientKnownRequestError
            if (prismaErr.code == "P2025") {
                /*P2025 is prisma's bad argument error code. Intentionally obfuscating this common
                error for security purposes.
                code reference here: 
                https://www.prisma.io/docs/reference/api-reference/error-reference#error-codes
                */
                res.status(400).end("Error: No entry found")
            }
            //just send the prisma error code if another one pops up
            res.status(400).end(`Prisma error code ${prismaErr.code}`)
        }
        // If no error, return 200 Status
        return res.status(200).end("OK")
    } else {
        // If not POST request, return 405 status
        return res.status(405).end("Error: Wrong Request Type")
    }
}