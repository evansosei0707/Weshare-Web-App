import React from 'react'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'

const MasonSkeleton = () => {

  return (
    <section className='w-full h-screen '>
      <ul>
         
            {['', '', '','','','',''].map((item, index) => (
                      <li className="card" key={index}>
                        <SkeletonTheme baseColor='green'>
                          <Skeleton height={180} />
                        </SkeletonTheme>
                        <h4 className="card-title">
                        <Skeleton circle={true} height={50} width={50} />  
                          <Skeleton height={36} width={`80%`} />
                        </h4>
                        <p className="card-channel">
                          <Skeleton width={`60%`} />
                        </p>
                        <div className="card-metrics">
                          <Skeleton width={`90%`} />
                        </div>
                      </li>  
            ))
          }
      </ul>
    </section>

  )
}

export default MasonSkeleton