import { useEffect, useState } from 'react'
import type { GetServerSideProps, NextPage, InferGetServerSidePropsType } from 'next'
import prisma from '../lib/prisma';
import { Service } from '@prisma/client';
import Navbar from '../components/Navbar';
import Searchbar from '../components/Searchbar';
import CardList from '../components/CardList';
import { useUser } from '@auth0/nextjs-auth0';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface HomeProps {
  services: Service[]
}

const Home: NextPage<HomeProps> = (props: InferGetServerSidePropsType<typeof getServerSideProps>) => {

  // User
  const { user, error, isLoading } = useUser();


  // Search State
  const [query, setQuery] = useState<string>("");
  const [ca, setCa] = useState<string>("ANY");

  // Pagination State
  const [page, setPage] = useState<number>(1);
  const [perPage] = useState<number>(5);

  //Service Query
  const queryRes = props.services
    .filter((service: Service) => service.published || user != undefined)
    .filter((service: Service) => service.name.toLowerCase().includes(query.toLowerCase()))
    .filter((service: Service) => ca == "ANY" ? true : service.causeArea == ca)
  
  //loading User
  if (isLoading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="text-center">{error.message}</div>;
  
  return (
    <>
    <ToastContainer/>
      <div className="bg-gradient-to-b from-slate-200 h-screen w-screen">
        <Navbar loggedIn={user != undefined}/>
        <div className="flex w-full">
          <div className="container mx-auto flex-grow">
            <div className="w-3/5 mx-auto">
              <Searchbar query={query} ca={ca} onQueryChange={setQuery} onCaChange={setCa} />
            </div>
            <CardList services={queryRes} query={query} ca={ca}
              page={page} perPage={perPage} setPage={setPage} editable={user != undefined}/>
          </div>
        </div>
      </div>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  //TODO: Make this a client-side request instead
  const services = await prisma.service.findMany({});
  return {
    props: { services }
  };

};

export default Home
