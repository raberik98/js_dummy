export default async function GetAreaData(url) {
    const resp = await fetch(url)

    if (resp.status != 200) {
        throw new Error("Non 200 status code from the server.")
    }

    const area = await resp.json()

    if (area.areas.length > 0) {
        const areaDataResp = await fetch(area.areas[0].url)

        if (areaDataResp.status != 200) {
            throw new Error("Non 200 status code from the server.")
        }

        const areaData = await areaDataResp.json()

        return areaData.pokemon_encounters
    } else {
        return null
    }
}