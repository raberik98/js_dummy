import { useState, useEffect } from "react";
import GetLocations from "../api/locations.api.js"


export default function useLocations() {
    // const [locations, setLocations] = useState([])
    // const [isLocationsLoading, setIsLocationsLoading] = useState(true)
    // const [ error, setError ] = useState(false)

    const [locationsState, setLocationsState] = useState({
        locations: [],
        loading: true,
        error: false,
        errorMsg: ""
    })

    useEffect(() => {
        GetLocations().then((data) => 
            setLocationsState({...locationsState, locations: data.results, loading: false })
        ).catch(err => setLocationsState({...locationsState, loading: true, error: true, errorMsg: err}))
    },[])

    return {...locationsState, setLocationsState}
}