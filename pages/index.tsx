import type { GetServerSideProps, NextPage } from 'next'
import prisma from '../lib/prisma';
import { Service } from '@prisma/client';
import ServiceCard from '../components/ServiceCard';
import Navbar from '../components/Navbar';

interface HomeProps {
  services: Service[]
}

const Home: NextPage<HomeProps> = (props: HomeProps) => {
  return (
    <>
      <Navbar />
      <div className="container mx-auto">
        {props.services.map((service => <ServiceCard service={service} />))}
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
