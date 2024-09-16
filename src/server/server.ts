import express from 'express';
import cors from "cors"
import path from 'path';
import registerRouter from "./http/routers/auth/authRouter"
import { bootTables } from '../game/game';

const app = express();
const port = 3000;

// configs
app.use(cors())
app.set('views', path.resolve("src", "ui", "views"))
app.set('view engine', 'ejs');

// inicar as mesas
bootTables()

//api routers
app.use("/api/auth", registerRouter)

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
