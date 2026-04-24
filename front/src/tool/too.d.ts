interface AppStorage {
    getItem: <T>(k: string) => T | undefined
    setItem: <T>(k: string, v: T) => void
    removeItem: <T>(k: string) => void
}