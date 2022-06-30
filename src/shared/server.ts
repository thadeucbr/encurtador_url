import '@shared/database/typeorm';
import 'dotenv/config';
import routes from './routes';
import FindUrlService from '@modules/urlShrink/services/FindUrlService';

import express, { Request, Response } from 'express';
import NodeCache from 'node-cache';

const app = express();
const cache = new NodeCache({ stdTTL: 600 });

app.use(express.json());

app.get('/:url', async (request: Request, response: Response) => {
  const { url } = request.params;

  let redirectLink: string = cache.get(url);

  if (redirectLink === undefined) {
    const service = new FindUrlService();
    const originalUrl = await service.execute(url);
    
    if (!originalUrl)
      return response
        .status(301)
        .redirect(
          'https://siliconvalleygazette.com/wp-content/uploads/2021/12/what-is-the-404-not-found-error-2.png'
        );

    cache.set(url, originalUrl.originalUrl, 600);
    
    redirectLink = originalUrl.originalUrl;
  }
  return response.status(301).redirect(redirectLink);
});

app.get('/loaderio-955c1c7cdcb6b4b8f3af5864076a584e', (_req, res) => res.sendFile('loaderio-0fb60c7a83935c589e418b406009d885.txt'))
app.use(routes);

const PORT = process.env.SERVER_PORT || 3333;

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
