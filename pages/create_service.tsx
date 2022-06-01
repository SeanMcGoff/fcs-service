import { useEffect, useState } from 'react'
import type { GetServerSideProps, NextPage, InferGetServerSidePropsType } from 'next'
import prisma from '../lib/prisma';
import { Service } from '@prisma/client';
import Navbar from '../components/Navbar';
import { useUser } from '@auth0/nextjs-auth0';
import useSWR from 'swr'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CreateServiceForm from '../components/CreateServiceForm';
import router from 'next/router';
import toastOptions from '../lib/globals';


const CreateService: NextPage = (props) => {

  // User
  const { user, error: userError, isLoading: userLoading } = useUser();

  // Service Data State
  const fetcher = (url: string) => fetch(url).then(r => r.json())
  const { data: serviceNames, error: serviceError, isValidating} = useSWR('/api/servicenames', fetcher)
  if (userLoading || isValidating) return <div className="text-center">Loading...</div>;
  if (serviceError || userError) return <div className="text-center">{userError ? userError.message : serviceError.message}</div>;

  const CreateService = async (data: Object) => {
      // Send the data to the server in JSON format.
      const JSONdata = JSON.stringify(data)
      // API endpoint where we send form data.
      const endpoint = '/api/create'
  
      // Form the request for sending data to the server.
      const options = {
        // The method is POST because we are sending data.
        method: 'POST',
        // Tell the server we're sending JSON.
        headers: {
          'Content-Type': 'application/json',
        },
        // Body of the request is the JSON data we created above.
        body: JSONdata,
      }
      const response = await fetch(endpoint, options)
      if (response.ok) {
        router.push('/?tor=Service Created!', undefined, { shallow: true })
      } else {
        toast.error(`Error Creating Service: ${response.body}`, toastOptions)
      }
  }
  
  return (
    <>
    <ToastContainer/>
      <div className="bg-gradient-to-b from-slate-200 h-screen w-screen">
        <Navbar loggedIn={user != undefined} creatingService={true}/>
        <div className="flex w-full">
          <div className="container mx-auto flex-grow">
            <CreateServiceForm onSubmit={CreateService} serviceNames={serviceNames}/>
          </div>
        </div>
      </div>
    </>
  )
}

export default CreateService
