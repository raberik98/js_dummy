import useArea from "../../hooks/useArea.jsx"

export default function Areas({selectedLocation}) {
    const { loading, error, errorMsg, encounters } = useArea(selectedLocation)

       
        

    return (
        <div>
            
        </div>
    )
}