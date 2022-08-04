import '@shared/database/typeorm';
import 'dotenv/config';
import routes from './routes';
import FindUrlService from '@modules/urlShrink/services/FindUrlService';
import path from 'path';
import https from 'https';
import fs from 'fs';

import express, { Request, Response } from 'express';
import NodeCache from 'node-cache';

const app = express();
const cache = new NodeCache({ stdTTL: 600 });

app.use(express.json());

const fileDir = path.join(__dirname, '../public')

app.use(express.static(fileDir))
app.get('/cont', (req, res) => {
  let cont; 

  try {    
    cont = JSON.parse(fs.readFileSync('./cont.json').toString());
    cont += 1;
  } catch(err) {
    cont = 1;
  }

  fs.writeFileSync('./cont.json', JSON.stringify(cont));
  res.end();
});

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
  return response.status(301).redirect(`http://${redirectLink}`);
});

app.use(routes);

const PORT = process.env.SERVER_PORT || 3333;

if(PORT === 80 || PORT === '80') {
  app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
  });
}
else {
  var privateKey = fs.readFileSync(path.join(__dirname, '..', '..', 'data', 'privkey.pem'));
  var certificate = fs.readFileSync(path.join(__dirname, '..', '..', 'data', 'fullchain.pem'));
  
  https.createServer({
      key: privateKey,
      cert: certificate
  }, app).listen(PORT);
}
