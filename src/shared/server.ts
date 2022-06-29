import express, { Request, Response } from 'express';
import '@shared/database/typeorm';
const app = express();

app.use('/', (_req: Request, res: Response) =>
  res.status(302).redirect('http://google.com.br')
);

app.listen(3000, () => {
  console.log(`Starting Proxy at 3000`);
});
