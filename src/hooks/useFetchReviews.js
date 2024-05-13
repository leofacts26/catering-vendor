import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { api, BASE_URL } from '../api/apiConfig';
import { Page_Limit } from '../constant';

const useFetchReviews = () => {
    const { accessToken } = useSelector((state) => state?.user);
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(false)
    const [totalPages, setTotalPages] = useState(null)
    const [page, setPage] = useState(1);
    const [selectedOption, setSelectedOption] = useState({
        "value": "newest_first",
        "label": "newest_first"
    });


    const handleSelectedChange = (selectedOption) => {
        setSelectedOption(selectedOption);
    };

    const handleChange = (event, value) => {
        setPage(value);
    };

    const getReviews = async () => {
        setLoading(true)
        try {
            const response = await api.get(`${BASE_URL}/get-vendor-reviews?current_page=${page}&limit=${Page_Limit}&order_by=${selectedOption.value}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                }
            });
            setTotalPages(response?.data?.total_pages)
            setReviews(response?.data?.data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getReviews()
    }, [page, selectedOption])

    return { loading, reviews, totalPages, selectedOption, handleSelectedChange, handleChange, page  }
}

export default useFetchReviews