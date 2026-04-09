import React from 'react'
import ShortUrlItem from './ShortUrlItem'
const ShortUrlsList = ({ myShortUrls }) => {
  return (
    <div className='my-6 space-y-4'>
         {
            myShortUrls.map((data)=>(
                <ShortUrlItem key={data.id} {...data}
                    />
            ))
        }
    </div>
  )
}

export default ShortUrlsList