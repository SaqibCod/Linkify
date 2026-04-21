import {useQuery} from '@tanstack/react-query'
import api from '../api/api'

export const useFetchMyUrls = (token) => {
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
    // Calculate date range: last 30 days
    const endDate = new Date();
    const startDate = new Date(endDate.getTime() - (30 * 24 * 60 * 60 * 1000));
    
    const formatDate = (date) => date.toISOString().split('T')[0];
    
    return useQuery({
        queryKey:["url-total-click", token],
        queryFn: async()=>{
            return await api.get(
                `/api/urls/totalclick?startDate=${formatDate(startDate)}&endDate=${formatDate(endDate)}`,
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
                clickDate: key,
                clickCount: data.data[key]
            }))
            return convertToArray;
        },
        enabled: !!token,
        staleTime: 50000
        });
};