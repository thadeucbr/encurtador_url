import express from 'express';
import '@shared/database/typeorm';
import routes from './routes';
const app = express();

app.use(express.json());

app.use(routes);

app.listen(3333, () => {
  console.log(`Starting Proxy at 3333`);
});
