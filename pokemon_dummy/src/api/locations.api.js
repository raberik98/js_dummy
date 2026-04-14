export default async function GetLocations() {
    const resp = await fetch("https://pokeapi.co/api/v2/location")

    if (resp.status != 200) {
        throw new Error("Non 200 status code from the server.")
    }

    return resp.json()
}