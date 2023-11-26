import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import { useUserContext } from '../Context/user_context';
import shareVideo from '../assets/share.mp4';
import logo from '../assets/weshareLogo.png';

import { client } from '../client';

const Login = () => {
const { loginWithRedirect, myUser, isAuthenticated } = useUserContext();

const id = myUser?.sub.split('|')[1];


const docs = {
  _id: `${id}`,
  _type: 'user',
  userName: myUser?.name,
  image: myUser?.picture
}




    const createUserDocument =  () => {
      
      if(!isAuthenticated) {
      loginWithRedirect();
      }
      
      if (myUser) {
        try {
          const response =  client.createIfNotExists(docs);
          console.log('User document created:', response);
        } catch (error) {
          console.error('Error creating user document:', error);
        }
      
      }
    }

   

  


  return (
    <main className='flex justify-start items-center flex-col h-screen '>
        <div className='relative w-full h-full'>
            <video 
            src={shareVideo}
            type='video/mp4'
            loop
            controls={false}
            muted
            autoPlay
            className='w-full h-full object-cover'
            />
            <div className='flex absolute items-center flex-col md:flex-row justify-center top-0 right-0 left-0 bottom-0 bg-blackOverlay'>
              <div className='p-5 '>
                <img src={logo} width='130px' alt='logo' />
              </div>
              <div className='shadow-2xl'>
                <button className='bg-white flex justify-center items-center p-3 rounded-lg'  onClick={() => createUserDocument()}>
                  <FcGoogle fontSize={22} className='mr-3' /> Sign in with Google
                </button>
              </div>
            </div>
        </div>
    </main>
  )
}

export default Login  