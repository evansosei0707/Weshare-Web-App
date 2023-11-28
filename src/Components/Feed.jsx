import React, { useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'

import { searchQuery, feedQuery } from '../utils/data'
import { client } from '../client'
import { MasonSkeleton, MasonryLayout } from '../Components';


const Feed = () => {
    const [loading, setLoading] = useState(false);
    const { categoryId } = useParams();
    const [pins, setPins] = useState(null)

    useEffect(() => {
        setLoading(true);

        if (categoryId) {
            const query = searchQuery(categoryId)

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
    }, [categoryId])

    if (loading) return <MasonSkeleton />
  return (
    <div>
        {pins?.length > 0 ? ( 
            <MasonryLayout pins={pins} />
        ): (
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

export default Feed