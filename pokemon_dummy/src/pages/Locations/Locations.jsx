import useLocations from "../../hooks/useLocations"

export default function Locations({setSelectedLocation, setPage}) {
    const { locations, setLocationsState, loading, error, errorMsg } = useLocations()

    
    
    return (
        <>
            {
                error ? <div>Error occured: {errorMsg}</div> :
                loading ? <div>Loading...</div> :
                locations.map((locationData => <div key={locationData.url}>
                    <h5>{locationData.name}</h5>
                    <span onClick={() => {setSelectedLocation(locationData.url); setPage("areas")}}>Enter {locationData.name}...</span>
                </div>))
            }
        </>
    )
}