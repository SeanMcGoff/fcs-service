import { useEffect, useState } from 'react'
import type { GetServerSideProps, NextPage, InferGetServerSidePropsType } from 'next'
import prisma from '../../lib/prisma';
import { Service } from '@prisma/client';
import Navbar from '../../components/Navbar';
import { useUser } from '@auth0/nextjs-auth0';
import useSWR from 'swr'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import EditServiceForm from '../../components/EditServiceForm';
import toastOptions from '../../lib/globals';
import { useRouter } from 'next/router';


const EditService: NextPage = (props) => {
  const router = useRouter()
  const { serviceID } = router.query
  // User
  const { user, error: userError, isLoading: userLoading } = useUser();

  // Service Data State
  const fetcher = (url: RequestInfo | URL) => fetch(url).then(r => r.json())
  const { data: serviceData, error: serviceDataError, isValidating: validSData} = useSWR('/api/services', fetcher)
  const { data: serviceNames, error: serviceNamesError, isValidating: validSNames} = useSWR('/api/servicenames', fetcher)
  if (userLoading || validSData || validSNames) return <div className="text-center">Loading...</div>;
  if (serviceDataError || serviceNamesError || userError) {
    return <div className="text-center">{userError ? userError.message : serviceDataError ? 
      serviceDataError.message : serviceNamesError.message}</div>;
  }
  const oldService = serviceData.filter((s: Service) => s.id.toString() == serviceID)[0]
  console.log(oldService)
  const UpdateService = async (data: Object) => {
      // Send the data to the server in JSON format.
      const JSONdata = JSON.stringify(data)
      // API endpoint where we send form data.
      const endpoint = `/api/update/${serviceID}`
  
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
        router.push('/?tor=Service Updated!', undefined, { shallow: true })
      } else {
        toast.error(`Error Updating Service: ${response.body}`, toastOptions)
      }
  }
  
  return (
    <>
    <ToastContainer/>
      <div className="bg-gradient-to-b from-slate-200 h-screen w-screen">
        <Navbar loggedIn={user != undefined} creatingService={true}/>
        <div className="flex w-full">
          <div className="container mx-auto flex-grow">
            <EditServiceForm onSubmit={UpdateService} serviceNames={serviceNames} oldService={oldService}/>
          </div>
        </div>
      </div>
    </>
  )
}

export default EditService
