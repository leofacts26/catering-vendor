import React, { useEffect, useState } from 'react'
import { api, BASE_URL } from '../api/apiConfig'
// import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios';
import toast from 'react-hot-toast';
import { datavalidationerror, successToast } from '../utils';

const useBusinessProfile = (url, accessToken) => {
    const [data, setData] = useState(null)

    
    const fetchBusinessProfile = async () => {
        try {
            const response = await api.get(url, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                }
            })
            setData(response?.data?.data[0] ? response?.data?.data[0] : response?.data?.data)
        } catch (error) {
            console.log(error);
            toast.error(datavalidationerror(error))
        }
    }

    const updateBusinessProfile = async (updateData) => {
        try {
            const response = await api.post(`${BASE_URL}/update-vendor-business-profile-detailed`, updateData, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                }
            })
            toast.success(successToast(response));
        } catch (error) {
            console.log(error);
            toast.error(datavalidationerror(error))
        }
    }


    useEffect(() => {
        if (accessToken) {
            fetchBusinessProfile();
        }
    }, [accessToken, url]);


    return [data, updateBusinessProfile]
}

export default useBusinessProfile