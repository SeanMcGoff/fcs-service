import { Service } from '@prisma/client'
import React, { useEffect } from 'react'
import NullCard from './NullCard';
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

    const idxOfLastService: number = props.page * props.perPage;
    const idxOfFirstService: number = idxOfLastService - props.perPage;
    const currentServices = props.services.slice(idxOfFirstService, idxOfLastService);
    const nullCards: number = 5 - currentServices.length;


    useEffect(() => {
        console.log(nullCards)
    })

    return (
        <>
            {currentServices.map((service: Service) => <ServiceCard service={service} key={service.id} />)}
            {[...Array(nullCards)].map((_, i) => <NullCard key={i} />)}
            {/*Pagination*/}
            <Pagination page={props.page} perPage={props.perPage}
                totalServices={props.services.length} paginate={props.setPage} />
        </>
    )
}
