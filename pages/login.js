import React from 'react'
import {getProviders, signIn} from 'next-auth/react'

function Login({ providers }) {
  return (
    <div className='flex flex-col items-center bg-black min-h-screen w-full justify-center'>
        <img className='w-52 mb-5' src=''/> 

    {Object.values(providers).map(provider => (
        <div key={provider.name}>
            <button onClick={() => signIn(provider.id, {callbackUrl: "/"})} className="bg-green-500 text-white p-5 rounded-lg">Login with {provider.name}</button>
            </div>
    ))}


    </div>
  )
}

export default Login;

export async function getServerSideProps(context) {
    const providers = await getProviders();

    return{
        props: {
            providers,
        },
    };
}
