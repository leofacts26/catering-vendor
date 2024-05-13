import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { api, BASE_URL } from '../api/apiConfig';

const useFetchCuisines = () => {
    const [loading, setLoading] = useState(false)
    const [cuisinesList, setCuisinesList] = useState([])
    const { accessToken } = useSelector((state) => state?.user);

    const fetchCuisines = async () => {
        setLoading(true)
        try {
            const response = await api(`${BASE_URL}/get-vendor-cuisines`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });
            setCuisinesList(response?.data?.data)
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchCuisines()
    }, [])

    return { cuisinesList, loading, setCuisinesList, fetchCuisines }
}

export default useFetchCuisines