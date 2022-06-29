import { getRepository } from 'typeorm';
import IUrlRepository from '../../repositoriesInterface/IUrlRepository';
import Url from '../entities/Url';
import crypto from 'crypto';

export default class UrlRepository implements IUrlRepository {
  private ormRepository = getRepository(Url);

  async create(url: string): Promise<Url> {
    try {
      const urlExists = await this.ormRepository.findOne({ where: { originalUrl: url }});
      
      if (urlExists) return urlExists;
  
      const shortUrl = crypto.randomBytes(3).toString('hex');
      const urlToSave = this.ormRepository.create({ shortUrl, originalUrl: url });
      await this.ormRepository.save(urlToSave);
      
      return urlToSave;
    } catch (error) {
      const newData = await this.create(url)
      return newData;
    }
  }
  async find(shortUrl: string): Promise<Url> {
    const originalUrl = await this.ormRepository.findOne({ where: { shortUrl }});
    return originalUrl;
  }
}