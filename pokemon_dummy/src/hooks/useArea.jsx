import { useState, useEffect } from "react";
import GetAreaData from "../api/areas.api.js"

export default function useArea(url) {
    const [areaState, setAreaState] = useState({
        loading: true,
        error: false,
        errorMsg: "",
        encounters: []
    })

    useEffect(() => {
        GetAreaData(url).then(data => {
            setAreaState({
                ...areaState,
                loading: false,
                encounters: data
            })
        }).catch(err => {
            setAreaState({ ...areaState, error: true, errorMsg: err })
        })
    }, [])

    return areaState
}