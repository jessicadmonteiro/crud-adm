import app from "./app"
import {connectionDatabase} from "./databade"

app.listen(3000, async () => {
    await connectionDatabase()
    console.log("Server is running!")
})