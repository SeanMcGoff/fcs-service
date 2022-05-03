import { Service } from '@prisma/client'
import React from 'react'

interface ServiceCardProps {
    service: Service;
}

export default function ServiceCard(props: ServiceCardProps) {
    return (
        <a href="#" className="block p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 my-2 mx-auto">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">{props.service.name}</h5>
            <p className="font-normal text-gray-700">{props.service.address}</p>
        </a>
    )
}
