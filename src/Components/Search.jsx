import React, { useState, useEffect} from 'react';
import { feedQuery, searchQuery } from '../utils/data';
import { client } from '../client';
import { MasonSkeleton, MasonryLayout } from '../Components';


const Search = ({ searchTerm }) => {
const [loading, setLoading] = useState(false);
const [pins, setPins] = useState(null);

useEffect(() => {
  setLoading(true);
  if(searchTerm) {
    const query = searchQuery(searchTerm.toLowerCase());

    client.fetch(query)
      .then((data) => {
        setPins(data);
        setLoading(false);
      })

  } else {
    client.fetch(feedQuery)
      .then((data) => {
        setPins(data);
        setLoading(false);
      })
  }
}, [searchTerm])



  return (
    <div>
      {loading && <MasonSkeleton />}
      {pins?.length !== 0 && <MasonryLayout pins={pins} />}
      {pins?.length === 0 && searchTerm !== '' && !loading && (
       <div className='flex flex-col justify-center items-center h-screen'>
       <h2 className='text-2xl text-gray-200 capitalize font-extrabold text-center'>
           Sorry, there's no pins available
       </h2>
       <h4 className='text-md text-gray-300 '>
           Checkout another time
       </h4>
   </div>
      )}
    </div>
  )
}

export default Search