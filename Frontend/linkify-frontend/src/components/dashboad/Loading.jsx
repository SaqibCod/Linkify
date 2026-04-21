import React from 'react'
import { ThreeDots } from 'react-loader-spinner'
function Loading() {
  return (
    <div className="flex justify-center items-center w-full min-h-screen">
        <div className="flex flex-col items-center justify-center gap-1">
      <ThreeDots
          visible={true}
          height="80"
          width="80"
          color="#205EC4"
          radius="9"
          ariaLabel="three-dots-loading"
          wrapperStyle={{}}
          wrapperClass=""
          />
</div>
</div>)
}

export default Loading