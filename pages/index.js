import Head from 'next/head'
import Image from 'next/image'
import Sidebar from '../components/Sidebar'
import styles from '../styles/Home.module.css'

const Home = () => {
  return (
    <div className='bg-black h-screen overflow-hidden'>
     <main>
      <Sidebar />
     </main>
      <div></div>
    </div>
  )
}

export default Home;