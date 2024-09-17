import express from 'express';
import cors from "cors"
import path from 'path';
import sitRouter from "./http/routers/auth/sitTable"
import registerRouter from "./http/routers/auth/authRouter"

const app = express();
const port = 3000;

// configs
app.use(cors())
app.set('views', path.resolve("src", "ui", "views"))
app.set('view engine', 'ejs');

//api routers
// app.use("/api/auth", registerRouter)
app.use("/game", sitRouter)

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
