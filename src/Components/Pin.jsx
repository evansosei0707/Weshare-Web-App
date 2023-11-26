import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { MdDownloadForOffline } from 'react-icons/md';
import { AiTwotoneDelete } from 'react-icons/ai';
import { BsFillArrowUpRightCircleFill } from 'react-icons/bs';
import { useUserContext } from '../Context/user_context';

import { urlFor, client } from '../client'


const Pin = ({ pin: { postedBy, image, _id, destination, save }}) => {
    const { myUser } = useUserContext();
    const [postHovered, setPostHovered] = useState(false)
    const navigate = useNavigate();
    const idUser = myUser?.sub.split('|')[1];

    const alreadySaved = !!(save?.filter((item) => item.postedBy?._id === idUser ))?.length;
  

    const savePin = (id) => {
        client.patch(id)
                .setIfMissing({ 'save' : []})
                .insert( 'after', 'save[-1]', [{
                    _key : uuidv4(),
                    userId: idUser,
                    postedBy: {
                        _type: 'postedBy',
                        _ref: idUser,
                    }
                }]).commit()
                    .then(() => {
                        window.location.reload();
                    })
    }

    const deletePin = (id) => {
        client.delete(id)
            .then(() => {
                window.location.reload();
            })
    }


  return (
    <div className='m-2'>
        <div 
          onMouseEnter={() => setPostHovered(true)}
          onMouseLeave={() => setPostHovered(false)}
          onClick={() => navigate(`/pin-detail/${_id}`)}
          className='relative cursor-zoom-in w-auto hover:shadow-lg rounded-lg overflow-hidden transition-all duration-500 ease-in-out'>
            <img className='rounded-lg w-full ' alt='user' src={urlFor(image).width(250).url()}/>
            { postHovered && (
                <div className='absolute top-0 w-full h-full flex flex-col justify-between p-2 z-50'>
                    <div className='flex items-center justify-between' >
                        <div className='flex gap-2'>
                            <a 
                                href={`${image?.asset?.url}?dl=`}
                                onClick={(e) => e.stopPropagation()} 
                                className='bg-white w-9 h-9 rounded-full flex items-center justify-center text-dark text-xl cursor-pointer opacity-75 hover:opacity-100 hover:shadow-md outline-none'
                            >
                                <MdDownloadForOffline />
                            </a>
                        </div>
                        {alreadySaved ? (
                            <button
                            className='bg-red-500 rounded-3xl px-5 py-1 text-white font-bold hover:shadow-md opacity-70 hover:opacity-100 '
                            >
                               {save?.length} Saved
                            </button>
                        ) : (
                            <button 
                                type='button'
                                className='bg-red-500 rounded-3xl px-5 py-1 text-white font-bold hover:shadow-md opacity-70 hover:opacity-100 '
                                onClick={(e) => {
                                    e.stopPropagation();
                                    savePin(_id)
                                }}
                                >
                                Save
                            </button>
                        )}
                    </div>
                    <div className='flex justify-between items-center gap-2 w-full'>
                        {destination && (
                            <a 
                                href={destination}
                                target='_blank'
                                rel='noreferrer'
                                className='flex items-center gap-2 bg-white rounded-3xl px-2 py-1 text-dark font-md hover:shadow-md opacity-70 hover:opacity-100 '
                                onClick={(e) => e.stopPropagation()}
                            >
                                <BsFillArrowUpRightCircleFill />
                                {destination.length > 15 ? `${destination.slice(0,15)}...` : destination}
                            </a>
                        )}
                        {postedBy?._id === idUser && (
                            <button
                                type='button'
                                className='bg-white rounded-full px-2 py-1 text-dark font-bold hover:shadow-md opacity-70 hover:opacity-100 '
                                onClick={(e) =>{
                                 e.stopPropagation()
                                 deletePin(_id)
                                }}
                            >
                                <AiTwotoneDelete />
                            </button>
                        )}
                    </div>
                </div>
            )}
          </div>
          <Link 
            to={`user-profile/${postedBy?._id}`}
            className='flex items-center gap-2 mt-2'
        >
            <img 
                className='w-8 h-8 rounded-full object-contain'
                src={postedBy?.image}
                alt='user-profile'
            />
            <p className='font-semibold capitalize ml-2'>
                {postedBy?.userName}
            </p>
        </Link>
    </div>
  )
}

export default Pin