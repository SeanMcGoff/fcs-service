import { useEffect, useState } from 'react'
import type { GetServerSideProps, NextPage, InferGetServerSidePropsType } from 'next'
import prisma from '../lib/prisma';
import { Service } from '@prisma/client';
import Navbar from '../components/Navbar';
import Searchbar from '../components/Searchbar';
import CardList from '../components/CardList';
import { useUser } from '@auth0/nextjs-auth0';
import useSWR from 'swr'
import { toast, ToastContainer, ToastOptions } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router';
import toastOptions from '../lib/globals';


const Home: NextPage = (props) => {

  // User
  const { user, error: userError, isLoading: userLoading } = useUser();

  // Search State
  const [query, setQuery] = useState<string>("");
  const [ca, setCa] = useState<string>("ANY");

  // Pagination State
  const [page, setPage] = useState<number>(1);
  const [perPage] = useState<number>(5);

  // Show Toast-On-Refresh (abbr. as tor in query params)
  const router = useRouter()
  const [torShown, setTorShown] = useState<boolean>(false);
  const { tor } = router.query;


  // Service Data State
  const fetcher = (url: string) => fetch(url).then(r => r.json())
  const { data: serviceData, error: serviceError, isValidating} = useSWR('/api/services', fetcher)

  // Toast on Refresh code
  useEffect(() => {
    if (tor != undefined && !torShown && !(userLoading || isValidating)) {
      toast.success(tor, toastOptions)
      setTorShown(true)
      router.push("/", undefined, {shallow: false})
    }
  }, [tor, torShown, userLoading, isValidating, router])

  //User and Service Loading
  if (userLoading || isValidating) return <div className="text-center">Loading...</div>;
  if (serviceError || userError) return <div className="text-center">{userError ? userError.message : serviceError.message}</div>;

  //Service Query
  const queryRes: Service[] = serviceData
    .filter((service: Service) => service.published || user != undefined)
    .filter((service: Service) => service.name.toLowerCase().includes(query.toLowerCase()))
    .filter((service: Service) => ca == "ANY" ? true : service.causeArea == ca)
  
  return (
    <>
    <ToastContainer/>
      <div className="bg-gradient-to-b from-slate-200 h-screen w-screen">
        <Navbar loggedIn={user != undefined} creatingService={false}/>
        <div className="flex w-full">
          <div className="container mx-auto flex-grow">
            <div className="lg:w-3/5 md:w-fit mx-auto">
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
