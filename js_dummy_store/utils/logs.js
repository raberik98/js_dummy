export function LogInfo(message, metadata) {
    console.log(`[INFO] ---  ${metadata.ip}/${metadata.url} --- ${message}`)
}

export function LogError(message, metadata) {
    console.error(`[ERROR] ---  ${metadata.ip}/${metadata.url} --- ${message}`)
}

export function LogWarning(message, metadata) {
    console.error(`[WARNING] ---  ${metadata.ip}/${metadata.url} --- ${message}`)
}
