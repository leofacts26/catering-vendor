import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { api, BASE_URL } from "../api/apiConfig";

const useGetVendor = () => {
    const { accessToken } = useSelector((state) => state.user);
    const [vendorBusinessProfile, setVendorBusinessProfile] = useState(null)
    const [vendorSettings, setVendorSettings] = useState(null)

    const fetchVendorData = async () => {
        try {
            const response = await api.get(`${BASE_URL}/get-vendor-details`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                }
            })
            setVendorBusinessProfile(response?.data?.data)
        } catch (error) {
            console.log(error);
        }
    }


    const fetchVendorSettingsData = async () => {
        try {
            const response = await api.get(`${BASE_URL}/get-vendor-enc-info`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                }
            })
            setVendorSettings(response?.data?.data)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchVendorData()
    }, [])

    useEffect(() => {
        fetchVendorSettingsData()
    }, [])


    return { vendorBusinessProfile, vendorSettings, fetchVendorSettingsData }
}

export default useGetVendor