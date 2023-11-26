import React, { useState, useEffect } from 'react'
import { MdDownloadForOffline } from 'react-icons/md'
import { Link, useParams } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'

import { client, urlFor } from '../client'
import MasonryLayout from './MasonryLayout'
import { pinDetailMorePinQuery, pinDetailQuery } from '../utils/data'
import Spinner from './Spinner';


const PinDetail = ({ user }) => {
  const [pins, setPins] = useState(null);
  const [pinDetail, setPinDetail] = useState(null);
  const [comment, setComment] = useState('');
  const [addingComment, setAddingComment] = useState(false);

  const { pinId } = useParams();

  function addComment() {
    if(comment) {
      setAddingComment(true);
    }

    client
      .patch(pinId)
        .setIfMissing({ comments : []})
        .insert('after', 'comments[-1]', [{
          comment,
          _key: uuidv4(),
          postedBy: {
            _type: 'postedBy',
            _ref: user._id
          }
        }])
        .commit()
          .then(() => {
            fetchPinDetails()
            setComment('');
            setAddingComment(false);
          })
  }

  function fetchPinDetails()  {
    let query = pinDetailQuery(pinId);

    if(query) {
      client.fetch(query)
        .then((data) => {
          setPinDetail(data[0]);

          if(data[0]) {
            query = pinDetailMorePinQuery(data[0])

              client.fetch(query)
                .then((res) => {
                  setPins(res);
                });
          }
        })
    }
  }

  useEffect(() => {
    fetchPinDetails();
  }, [pinId]);

    if(!pinDetail) return <Spinner message="Loading pin..." />

    
  return (
    <>
      <div className='flex xl:flex-row flex-col m-auto bg-white' style={{  borderRadius: '32px'}} >
        <div className='flex justify-center w-full items-center h-max rounded-t-3xl rounded-b-lg overflow-hidden  flex-initial'>
          <img
            src={pinDetail?.image && urlFor(pinDetail.image).url()}
            className='w-full h-full object-contain'
            alt='user-post'
          />
        </div>
          <div className='w-full p-5 flex-1 xl:min-w-620'>
          <Link 
              to={`/user-profile/${pinDetail?.postedBy?._id}`}
              className='flex gap-2 items-center justify-start bg-gray-100 max-w-max p-3 rounded-full mb-4'
          >
              <img 
                  className='w-8 h-8 rounded-full object-contain'
                  src={pinDetail?.postedBy?.image}
                  alt='user-profile'
              />
              <p className='font-semibold capitalize ml-2'>
                  {pinDetail?.postedBy?.userName}
              </p>
          </Link>
            <div className='flex items-center justify-between'>
              <div className='flex gap-2 items-center'>
                <a 
                    href={`${pinDetail?.image?.asset?.url}?dl=`}
                    className=' w-15 h-15 rounded-full flex items-center justify-center text-dark text-xl cursor-pointer p-3 opacity-75 transition-all shadow-sm hover:opacity-100 hover:shadow-lg outline-none duration-100'
                >
                    <MdDownloadForOffline fontSize={30} />
                </a>
              </div>
              <a href={pinDetail.destination} target='_blank' rel='noreferrer' className=' italic font-medium  hover:text-blue-800 hover:bg-gray-50 rounded-full p-1' >
                {pinDetail.destination}
              </a>
            </div>
            <div>
              <h1 className='text-4xl font-bold break-words mt-3'>
                {pinDetail.title}
              </h1>
              <p className='mt-3'>{pinDetail.about}</p>
            </div>
          
          <h1 className='mt-5 text-2xl text-gray-500'> Comments :</h1>
          <div className='max-h-370 xl:max-h-[100px] flex flex-col px-2 overflow-y-auto border-2 rounded-lg pb-3'>
            {pinDetail?.comments?.map((comment, i) => (
              <Link to={`/user-profile/${pinDetail?.postedBy?._id}`}>
                <div className='flex gap-2 items-center mt-5 bg-white rounded-lg mb-1' key={i} >
                  <img
                    src={comment.postedBy.image}
                    alt='user-profile'
                    className='w-10 h-10 rounded-full cursor-pointer'
                  />
                  <p className='font-bold'>{comment.postedBy.userName}</p>
                </div>
                <div className='ml-10 font-medium bg-gray-100 max-w-fit lg:max-w-[330px] flex flex-wrap  p-3 rounded-xl'>
                  {comment.comment}
                </div>
              </Link>

            ))}
          </div>
          <div className='flex flex-wrap mt-6 gap-3'>
          <Link 
              to={`/user-profile/${user?._id}`}
              className='flex gap-2 items-center justify-start bg-gray-100 max-w-max p-3 rounded-full mb-4'
          >
            {user ? (
              <img 
                  className='w-8 h-8 cursor-pointer rounded-full object-contain'
                  src={user?.image}
                  alt='user-profile'
              />
            ) : (
              <span className='w-8 h-8 bg-gray-200 rounded-full'></span>
            )}
          </Link>
            <input 
              className='flex-1 border-gray-100 outline-none border-2 p-2 rounded-2xl focus:border-gray-200'
              type='text'
              placeholder='Add a comment'
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <button
              type='button'
              className='bg-red-500 block lg:inline-block w-full lg:w-auto text-white rounded-xl px-6 py-2 font-semibold text-base outline-none'
              onClick={addComment}
            >
              {addingComment ? 'Posting the comment...' : 'Post'}
            </button>
          </div>
          </div>
      </div>
    
      <h2 className='text-center font-bold text-2xl mt-8 mb-4'>
        More like this
      </h2>
      {
        pins?.length > 0 ? (
          <div>
            <MasonryLayout  pins={pins} />
          </div>
        ): (
          <Spinner message='Loading more Pins...' />
        )
      }
    </>
  )
}

export default PinDetail 