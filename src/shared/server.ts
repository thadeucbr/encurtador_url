import express, { Request, Response } from 'express';

const app = express();

app.use('/', (_req: Request, res: Response) =>
  res.status(302).redirect('http://google.com.br')
);

app.listen(3000, 'localhost', () => {
  console.log(`Starting Proxy at ${'localhost'}:${3000}`);
});
