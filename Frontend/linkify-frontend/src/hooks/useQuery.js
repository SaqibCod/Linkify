import {useQuery} from '@tanstack/react-query'
import api from '../api/api'

export const useFetchMyUrls = (token) =>{
    return useQuery({
        queryKey:["my-urls", token],
        queryFn: async()=>{
            return await api.get(
                "/api/urls/myurls",
                 {
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
          
    },  
        select:(data)=>{
            const sortedData = data.data
            .sort((a,b)=> new Date(b.createdDate) - new Date(a.createdDate))
            return sortedData;
        },
        enabled: !!token,
        staleTime: 50000
        });
};

export const useFetchTotalClicks = (token) =>{
    return useQuery({
        queryKey:["url-total-click", token],
        queryFn: async()=>{
            return await api.get(
                "/api/urls/totalclick?startDate=2025-07-12&endDate=2025-07-14",
                 {
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
          
    },  
        select:(data)=>{
            const convertToArray = Object.keys(data.data).map(key=>({
                clickData: key,
                count: data.data[key]
            }))
            return convertToArray;
        },
        enabled: !!token,
        staleTime: 50000
        });
};