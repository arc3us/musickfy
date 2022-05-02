import Head from 'next/head'
import Image from 'next/image'
import Sidebar from '../components/Sidebar'
import styles from '../styles/Home.module.css'
import Center from '../components/Center'

const Home = () => {
  return (
    <div className='bg-black h-screen overflow-hidden'>
     <main className='flex'>
      <Sidebar />
      <Center />
     </main>
      <div></div>
    </div>
  )
}

export default Home;