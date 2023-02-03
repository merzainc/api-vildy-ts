import express, { Express } from 'express';
import dotenv from 'dotenv';
import genres from './routes/genres';

const app: Express = express();
dotenv.config();
const port = process.env.PORT || 3000;
const host = process.env.HOST;

/** Middleware Functions */
app.use(express.json());
app.use('/api/genres', genres);

app.get('/', (req, res) => {
  res.send('Welcome to vidly api.');
});

app.listen(port, () =>
  console.log(`⚡️[vidly]: Server is running at http://${host}:${port}`)
);
