import { useEffect, useState } from 'react'
import type { GetServerSideProps, NextPage, InferGetServerSidePropsType } from 'next'
import prisma from '../lib/prisma';
import { Service } from '@prisma/client';
import Navbar from '../components/Navbar';
import { useUser } from '@auth0/nextjs-auth0';
import useSWR from 'swr'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CreateServiceForm from '../components/CreateServiceForm';


const CreateService: NextPage = (props) => {

  // User
  const { user, error: userError, isLoading: userLoading } = useUser();

  // Service Data State
  const fetcher = (url: RequestInfo | URL) => fetch(url).then(r => r.json())
  const { data: serviceData, error: serviceError, isValidating} = useSWR('/api/services', fetcher)

  


  if (userLoading || isValidating) return <div className="text-center">Loading...</div>;
  if (serviceError || userError) return <div className="text-center">{userError ? userError.message : serviceError.message}</div>;

  
  return (
    <>
    <ToastContainer/>
      <div className="bg-gradient-to-b from-slate-200 h-screen w-screen">
        <Navbar loggedIn={user != undefined} creatingService={true}/>
        <div className="flex w-full">
          <div className="container mx-auto flex-grow">
            <CreateServiceForm/>
          </div>
        </div>
      </div>
    </>
  )
}

export default CreateService
