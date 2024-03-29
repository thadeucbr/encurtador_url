import { Request, Response } from 'express';
import CreateUrlService from '../services/CreateUrlService';
import FindUrlService from '../services/FindUrlService';
import NodeCache from 'node-cache';

export default class UrlController {
  async create(request: Request, response: Response) {
    try {    
      const service = new CreateUrlService();
      const { url } = request.body;
      const newUrl: any = await service.execute(url);
      response.status(201).json({ newUrl: `https://short.wtf/${newUrl.shortUrl}` })
    } catch(err) {
      console.log(err);
      response.status(500).json({ message: 'Deu ruimzão meu brother'});      
    }
  }

  // async redirect(request: Request, response: Response) {
  //   const { url } = request.params;
    
  //   const cache = new NodeCache({ stdTTL: 600 });
    
  //   const service = new FindUrlService();
  //   const originalUrl = await service.execute(url);
  //   cache.set(url, originalUrl, 600)
    
  //   if(!originalUrl) return response.status(301).redirect('https://siliconvalleygazette.com/wp-content/uploads/2021/12/what-is-the-404-not-found-error-2.png')
    
  //   return response.status(301).redirect(originalUrl.originalUrl);
  // }
}