import {useQuery} from '@tanstack/react-query'
import api from '../api'
export const useFetchTotalClicks = (token, onError) =>{
    return useQuery("url-totalClick", 
        async()=>{
            return await api.get(
                "/api/urls/totalclick?startDate=2025-07-12&endDate=2025-07-14",
                 {
                    headers:{
                        "Content-Type":"application/json",
                        Accept:"application/json",
                        Authorization:"Bearer " + token,
                    },
                }
            );
    }
    , {
        select:(data)=>{

        },
        onError,
        staleTime: 5000
        })
}