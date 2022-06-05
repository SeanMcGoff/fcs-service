import { withApiAuthRequired } from '@auth0/nextjs-auth0';
import type { NextApiRequest, NextApiResponse } from 'next'
import converter from 'json-2-csv'
import prisma from '../../lib/prisma';

const csv = async function (req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') {
        // If not POST request, return 405 status
        res.status(405).end("Error: Wrong Request Type")
    }
    const services = await prisma.service.findMany({});
    converter.json2csv(services, (err, csv) => {
        if (err) {
            res.status(500).end(err)
        }
    
        res.setHeader('Content-Type', 'application/csv');
        res.setHeader('Content-Disposition', 'attachment; filename=fcs_services.csv');
        res.status(200).end(csv)
    });
    res.status(200)
}

export default withApiAuthRequired(csv)