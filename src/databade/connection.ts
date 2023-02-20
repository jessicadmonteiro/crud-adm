import client from "./config"

const connectionDatabase = async (): Promise<void> => {
    await client.connect()
    console.log("Database connected!")
}

export default connectionDatabase