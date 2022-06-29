import { Request, Response } from 'express';
import CreateUrlService from '../services/CreateUrlService';
import FindUrlService from '../services/FindUrlService';

export default class UrlController {
  async create(request: Request, response: Response) {
    const service = new CreateUrlService();
    const { url } = request.body;
    const newUrl = await service.execute(url);
    response.status(201).json({ newUrl: `http://localhost:3333/${newUrl.shortUrl}` })
  }

  async redirect(request: Request, response: Response) {
    const { url } = request.params;
    const service = new FindUrlService();
    const originalUrl = await service.execute(url);
    if(!originalUrl) return response.status(301).redirect('https://siliconvalleygazette.com/wp-content/uploads/2021/12/what-is-the-404-not-found-error-2.png')
    return response.status(301).redirect(originalUrl.originalUrl);
  }
}