export default async function GetProducts() {

    const resp = await fetch("/api/store/v1/products")

    if (resp.status != 200) {
        throw new Error("Error requesting the products.")
    }

    return resp.json()
}
