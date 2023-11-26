import React, { useState, useRef, useEffect} from 'react'
import { useUserContext } from '../Context/user_context';
import { HiMenu } from 'react-icons/hi';
import { AiFillCloseCircle } from 'react-icons/ai';
import { Link, Route, Routes, useNavigate } from 'react-router-dom';
import {Sidebar, Pins, UserProfile } from '../Components';
import { userQuery } from '../utils/data';
import logo from '../assets/logo.png';
import { client } from '../client';



const Home = () => {
  const [toggleSidebar, setToggleSidebar] = useState(false);
  const [user, setUser] = useState(null);
  const scrollRef = useRef(null);
  const { myUser } = useUserContext()


  useEffect(() => {
    const query = userQuery(myUser?.sub.split('|')[1]); 

      client.fetch(query)
      .then((data) => {
        setUser(data[0]);
      })
    
  }, [myUser, setUser])

  useEffect(() => {
    scrollRef.current.scrollTo(0,0)
  },[]);

  return (
    <div className='flex flex-col md:flex-row  bg-gray-50 h-screen transition-height duration-75 ease-out '>
      <div className='hidden md:flex h-screen flex-initial'>
        <Sidebar user={user && user} />
      </div>
      <div className='flex md:hidden flex-row'>
        <div className='p-2 w-full flex justify-between items-center shadow-md'>
          <HiMenu fontSize={40} className='cursor-pointer' onClick={() => setToggleSidebar(true)} />
          <Link to='/'>
            <img src={logo} alt='logo' className='w-28' />
          </Link>
          <Link to={`/user-profile/${user?._id}`}>
            <img src={user?.image} alt='logo' className='w-12 rounded-full m-4' />
          </Link>
        </div>
        {toggleSidebar && (
          <div className='fixed w-4/5 bg-white h-screen overflow-y-auto shadow-md z-10 animate-slide-in'>
            <div className='absolute w-full flex justify-end items-center p-2'>
              <AiFillCloseCircle fontSize={30} className='cursor-pointer' onClick={() => setToggleSidebar(false)} />
            </div>
            <Sidebar  user={user && user} closeToggle={setToggleSidebar} />
          </div>

        )}
      </div>
      <div className='pb-2 flex-1 h-screen overflow-y-scroll' ref={scrollRef} >
        <Routes>
          <Route path='/user-profile/:userId' element={<UserProfile />} />
          <Route path='/*' element={<Pins user={user && user} />} />
        </Routes>
      </div>
    </div> 
  )
}

export default Home;