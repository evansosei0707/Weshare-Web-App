import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import {RiHomeFill } from 'react-icons/ri';
import { IoIosArrowForward } from 'react-icons/io';
import { categories } from '../utils/data';

import logo from '../assets/weshareLogo.png';
const Sidebar = ({ user, closeToggle }) => {
    const handleCloseSidebar = () => {
        if(closeToggle) closeToggle(false)
    }

    const isNotActiveStyle = 'flex items-center px-5 gap-3 text-gray-500 hover:text-black transition-all duration-200 ease-in-out ';
    const isActiveStyle = 'flex items-center px-5 gap-3 font-extrabold border-r-2 border-black  transition-all duration-200 ease-in-out ';


  return (
    <div className='flex flex-col justify-between bg-white h-full overflow-y-scroll min-w-210 hide-scrollbar'>
        <div className='flex flex-col'>
            <Link 
            to='/'
            className='flex px-5 gap-2 my-6 pt-1 w-190 items-center'>
                <img src={logo} alt='logo' className='w-full' onClick={handleCloseSidebar} />
            </Link>
            <div className='flex flex-col gap-5'>
                <NavLink
                    to='/'
                    onClick={handleCloseSidebar}
                    className={({ isActive }) => isActive ? isActiveStyle : isNotActiveStyle } >
                        <RiHomeFill /> Home
                </NavLink>
                <h3 className='mt-2 px-5 text-base 2xl:text-xl'>Discoveries</h3>
                {categories.map((category) => (
                    <NavLink 
                        to={`/category/${category.name}`}
                        className={({ isActive }) => isActive ? isActiveStyle : isNotActiveStyle}
                        onClick={handleCloseSidebar}
                        key={category.name}
                    >   
                        <img src={category.image} className='w-8 h-8 rounded-full shadow-sm' alt='categories' />
                        {category.name}
                    </NavLink>
                ))}
            </div>
        </div>
    </div>
  )
}

export default Sidebar; 