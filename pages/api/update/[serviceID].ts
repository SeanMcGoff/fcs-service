import { withApiAuthRequired } from '@auth0/nextjs-auth0';
import { CauseArea } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma';

const apiRoute: NextApiHandler<any> = async (req: NextApiRequest, res: NextApiResponse) => {
    // Filter Out non-POST reqs
    if (req.method !== 'POST') {
        res.status(405).send({ message: "Error: Wrong Request Type"})
        return
    }
    let updateData = req.body
    const { serviceID } = req.query
    try {
        // For type safety
        if ("maxStudents" in updateData) {updateData.maxStudents = parseInt(updateData.maxStudents)}
        if ("availableStudentSlots" in updateData) {updateData.availableStudentSlots = parseInt(updateData.availableStudentSlots)}
        // Try updating entry
        let nServiceID: number = parseInt(serviceID as string)
        if (isNaN(nServiceID)) {
            throw "Error: service ID must be a number"
        }
        await prisma.service.update({
            where: {
                id: nServiceID
            },
            data: updateData
        })
    }
    catch (err) {
        // for custom errors
        if (typeof err === 'string') {
            return res.status(400).end(err)
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
        //just send the prisma error code if one pops up
        return res.status(400).end(`Prisma error code ${prismaErr.code}`)
    }
    // If no error, return 200 Status
    return res.status(200).end("OK")
}

export default withApiAuthRequired(apiRoute)