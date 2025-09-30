import config from "../config/config.js"

const { STORE_SERVICE_URL } = config

export default async function CheckForRequestedItem(id) {
    return fetch(`${STORE_SERVICE_URL}/${id}`).then(resp => resp.json())
}