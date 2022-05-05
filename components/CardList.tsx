import { Service } from '@prisma/client'
import React, { useEffect } from 'react'
import Pagination from './Pagination';
import ServiceCard from './ServiceCard';

interface CardListProps {
    services: Service[];
    query: string;
    ca: string;
    perPage: number;
    page: number;
    setPage: (p: number) => void;
}

export default function CardList(props: CardListProps) {

    // All Hail Brad Traversy

    const idxOfLastService = props.page * props.perPage;
    const idxOfFirstService = idxOfLastService - props.perPage;
    const currentServices = props.services.slice(idxOfFirstService, idxOfLastService);

    return (
        <>
            {/*Actual list of cards: two filters for query and ca, and a map for each ServiceCard component*/}
            {currentServices.map((service: Service) => <ServiceCard service={service} key={service.id} />)}
            {/*Pagination*/}
            <Pagination page={props.page} perPage={props.perPage}
                totalServices={props.services.length} paginate={props.setPage} />
        </>
    )
}
