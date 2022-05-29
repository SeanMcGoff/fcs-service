import { useEffect, useState } from 'react'
import type { GetServerSideProps, NextPage, InferGetServerSidePropsType } from 'next'
import prisma from '../lib/prisma';
import { Service } from '@prisma/client';
import Navbar from '../components/Navbar';
import Searchbar from '../components/Searchbar';
import CardList from '../components/CardList';
import { useUser } from '@auth0/nextjs-auth0';
import useSWR from 'swr'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Home: NextPage = () => {

  // User
  const { user, error: userError, isLoading: userLoading } = useUser();

  // Service Data State
  const fetcher = (url: RequestInfo | URL) => fetch(url).then(r => r.json())
  const { data: serviceData, error: serviceError, isValidating} = useSWR('/api/services', fetcher)

  

  // Search State
  const [query, setQuery] = useState<string>("");
  const [ca, setCa] = useState<string>("ANY");

  // Pagination State
  const [page, setPage] = useState<number>(1);
  const [perPage] = useState<number>(5);


  if (userLoading || isValidating) return <div className="text-center">Loading...</div>;
  if (serviceError || userError) return <div className="text-center">{userError ? userError.message : serviceError.message}</div>;

  //Service Query
  const queryRes = serviceData
    .filter((service: Service) => service.published || user != undefined)
    .filter((service: Service) => service.name.toLowerCase().includes(query.toLowerCase()))
    .filter((service: Service) => ca == "ANY" ? true : service.causeArea == ca)
  
  //loading User / service Data
  
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

export default Home
