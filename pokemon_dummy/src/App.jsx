import { useState } from 'react'

import Locations from './pages/Locations/Locations'
import Areas from './pages/Areas/Areas'

function App() {
  const [page, setPage] = useState("locations")
  const [selectedLocation, setSelectedLocation] = useState("")

  console.log(selectedLocation);
  
  return (
    <>
      {
        page == "locations" && selectedLocation == "" ? <Locations setSelectedLocation={setSelectedLocation} setPage={setPage}/> :
        page == "areas" && selectedLocation != "" ? <Areas selectedLocation={selectedLocation}/> : null
      }
    </>
  )
}

export default App
