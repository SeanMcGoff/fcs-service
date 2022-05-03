import type { GetServerSideProps, NextPage, InferGetServerSidePropsType } from 'next'
import prisma from '../lib/prisma';
import { Service } from '@prisma/client';
import ServiceCard from '../components/ServiceCard';
import Navbar from '../components/Navbar';

interface HomeProps {
  services: Service[]
}

const Home: NextPage<HomeProps> = (props: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <>
      <Navbar />
      <div className="container mx-auto">
        {props.services.map(((service: Service) => <ServiceCard service={service} key={service.id} />))}
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
