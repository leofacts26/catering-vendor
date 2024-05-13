import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { api, BASE_URL } from '../api/apiConfig';

const useFetchOccasions = () => {
    const [loading, setLoading] = useState(false)
    const [occasionsList, setOccasionsList] = useState([])
    const { accessToken } = useSelector((state) => state?.user);

    const fetchOccations = async () => {
        setLoading(true)
        try {
            const response = await api(`${BASE_URL}/get-vendor-occasions`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });
            setOccasionsList(response?.data?.data)
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchOccations()
    }, [])

    return { occasionsList, loading, setOccasionsList, fetchOccations }
}

export default useFetchOccasions