import { useEffect, useState } from 'react'
import type { GetServerSideProps, NextPage, InferGetServerSidePropsType } from 'next'
import prisma from '../lib/prisma';
import { Service } from '@prisma/client';
import ServiceCard from '../components/ServiceCard';
import Navbar from '../components/Navbar';
import Searchbar from '../components/Searchbar';
import CardList from '../components/CardLIst';

interface HomeProps {
  services: Service[]
}

const Home: NextPage<HomeProps> = (props: InferGetServerSidePropsType<typeof getServerSideProps>) => {

  // Search State
  const [query, setQuery] = useState<string>("");
  const [ca, setCa] = useState<string>("ANY");

  // Pagination State
  const [page, setPage] = useState<number>(1);
  const [perPage] = useState<number>(5);

  const queryRes = props.services
    .filter((service: Service) => service.name.toLowerCase().includes(query.toLowerCase()))
    .filter((service: Service) => ca == "ANY" ? true : service.causeArea == ca)

  return (
    <>
      <div className="bg-gradient-to-b from-slate-200 h-screen w-screen">
        <Navbar />
        <div className="flex w-full">
          <div className="container mx-auto flex-grow">
            <div className="w-3/5 mx-auto">
              <Searchbar query={query} ca={ca} onQueryChange={setQuery} onCaChange={setCa} />
            </div>
            <CardList services={queryRes} query={query} ca={ca}
              page={page} perPage={perPage} setPage={setPage} />
          </div>
        </div>
      </div>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {

  const services = await prisma.service.findMany({
    where: {
      published: true
    }
  });
  return {
    props: { services }
  };

};

export default Home
