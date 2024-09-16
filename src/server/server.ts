import express, { Request, Response } from 'express';
import { EnterRomm } from '../game/game';
import cors from "cors"
import path from 'path';
import { db } from './config/database';

const app = express();
const port = 3000;

app.use(cors())


// Configurar a pasta de views
app.set('views', path.resolve("src", "ui", "views"))

// Configurar EJS como template engine
app.set('view engine', 'ejs');

app.get('/', async (req: Request, res: Response) => {
  const user = await db.user.create({
    data: {
      email: "kjsdfads",
      passwordHash: "asdfasdfasdpofasdfjp",
      username: "gabriel"
    }
  })
  
  db.user.findUnique({
    where: {
      id: 1
    }
  })
  res.render("index.ejs");


});

app.get('/entrar/:name/:tableId', (req: Request, res: Response) => {
  const result = EnterRomm({
    name: req.params.name,
    tableId: req.params.tableId
  })
  res.status(200).json(result);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
