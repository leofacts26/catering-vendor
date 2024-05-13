import React, { useEffect, useState } from 'react'
import usePlacesService from "react-google-autocomplete/lib/usePlacesAutocompleteService";


const initialState = {
    street_name: '',
    area: '',
    pincode: '',
    latitude: '',
    longitude: '',
    address: '',
    city: '',
    state: '',
    country: '',
    formatted_address: '',
    map_location_link: '',
    place_id: '',
    city_id: ''
}


const useLocation = () => {
    const [locationValues, setLocationValues] = useState(initialState)
    const [locationPlaceId, setLocationPlaceId] = useState(null)
    const [manualLocation, setManualLocation] = useState("")
    



    return [locationValues, locationPlaceId, manualLocation, setLocationValues, setLocationPlaceId, setManualLocation];

}

export default useLocation