import React from 'react'
import { useStoreContext } from '../../contextApi/ContextApi'
import { useForm } from 'react-hook-form';
import TextField from '../TextField';
import { Tooltip } from '@mui/material';
import { RxCross2 } from 'react-icons/rx';
import api from '../../api/api';
import toast from 'react-hot-toast';

const CreateNewShorten = ({setOpen, refetch}) => {
  const {token} = useStoreContext();
  const [loader, setLoader] = React.useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState:{errors}
      } = useForm({
        defaultValues:{
          url: ""
              },
         mode: 'onTouched'
       });
  
  const createNewShortUrlHandler = async (data) => {
      setLoader(true)
      try {
        const response = await api.post(
          'api/urls/shortner' , data,{
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
          }
        });

        const shortUrl = `${import.meta.env.VITE_REACT_SUBDOMAIN}/${response.data.shortUrl}`;
        console.log(shortUrl);
        navigator.clipboard.writeText(shortUrl).then(()=>{
          toast.success("Short URL copied to clipboard!",{
            position:"bottom-center",
            className:"mb-5",
            duration:3000,
          });
          reset();
          // await refetch();
          setOpen(false);
        });
       
      } catch (error) {
        toast.error("Failed to create short URL. Please try again.",{
          position:"bottom-center",
          className:"mb-5",
          duration:3000,
        });
      }
      finally{
        setLoader(false);
      }
  } 
   
  return (
    <div className=" flex justify-center items-center bg-white rounded-md">
    <form
        onSubmit={handleSubmit(createNewShortUrlHandler)}
        className="sm:w-[450px] w-[360px] relative shadow-custom pt-8 pb-5 sm:px-8 px-4 rounded-lg"
      >

        <h1 className="font-montserrat sm:mt-0 mt-3 text-center  font-bold sm:text-2xl text-[22px] text-slate-800 ">
                Create New Shorten Url
        </h1>

        <hr className="mt-2 sm:mb-5 mb-3 text-slate-950" />

        <div>
          <TextField
            label="Enter URL"
            required
            id="originalUrl"
            placeholder="https://example.com"
            type="url"
            message="Url is required"
            register={register}
            errors={errors}
          />
        </div>

        <button
          className="bg-customRed font-semibold text-white w-32  bg-custom-gradient  py-2  transition-colors  rounded-md my-3"
          type="text"
        >
          {loader? "Loading..." : "Create"}
        </button>

        {!loader && (
          <Tooltip title="Close">
            <button
              disabled={loader}
              onClick={()=>setOpen(false)}
              className='absolute right-2 top-2'
            >
              <RxCross2 className='text-slate-800 text-3xl' />
            </button>
          </Tooltip>
        )}

        </form>
    </div>

  )
}

export default CreateNewShorten