import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { IoMdAdd, IoMdSearch } from 'react-icons/io';
import { AiOutlineLogout } from 'react-icons/ai';
import { useUserContext } from '../Context/user_context';
import { IoIosLogIn } from "react-icons/io";


const Navbar = ({ searchTerm, setSearchTerm , user }) => {
    const navigate = useNavigate(); 
    const { logout } = useUserContext();


  return (
    <div className='flex gap-2 md:gap-5 w-full mt-5 pb-7'>
        <div className='flex justify-start items-center w-full px-2 rounded-md bg-white border-none outline-none focus-within:shadow-sm '>
            <IoMdSearch fontSize={21} className='ml-1' />
            <input
                type='text'
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder='Search'
                value={searchTerm}
                onFocus={() => navigate('/search')}
                className='p-x w-full bg-white outline-none'
            />
        </div>
        {
          !user && (
            <Link  
              to='/login'
              className='px-4 py-2 hover:border hover:bg-gray-100 rounded-xl transition-all duration-100'
            >
              <IoIosLogIn fontSize={30} />
            </Link>
          )
        }
        {
          user && (
          <button 
                  className='bg-white p-2 rounded-full cursor-pointer outline-none shadow-md'
                  onClick={() => {
                    localStorage.clear()
                    logout({ 
                      logoutParams: {
                        returnTo: window.location.origin
                      }
                    });
                    navigate('/login')
                  }}>
                    <AiOutlineLogout color="red" fontSize={21}/>
            </button>
          )
        }
        <div className='flex gap-3 '>
            <Link 
                to={`user-profile/${user?._id}`}
                 className='hidden md:block'
            >
                    {!user ? (
                            <span className='w-14 h-14 rounded-full bg-gray-400'></span>
                        ) : (
                            
                            <img src={user?.image} alt='user' className='w-14 h-12 rounded-full' />
                    )
                        }
            </Link>
            {user ? (
                <Link 
                    to={`create-pin`} className='bg-black text-white rounded-lg w-12 h-12 md:w-14 md:h-12 flex items-center justify-center ' >
                        <IoMdAdd fontSize={15}/>
                </Link>
            ) : (
                <Link to={`login`} className='bg-black text-white rounded-lg w-12 h-12 md:w-14 md:h-12 flex items-center justify-center ' >
                  <IoMdAdd fontSize={15}/>
                </Link>
            )}
        </div>

    </div>
  )
}

export default Navbar