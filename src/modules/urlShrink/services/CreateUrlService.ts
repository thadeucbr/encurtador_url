import UrlRepository from '../database/typeorm/repositories/urlRepository';
import Joi from 'joi';

const validateUrl = Joi.string().uri()

export default class CreateUrlService {
  private urlRepository = new UrlRepository();

  async execute(originalUrl: string) {
    const { error } = validateUrl.validate(originalUrl);

    if (error) return ''; 

    const urlWithouHttp = originalUrl.replace(/https:\/\/|http:\/\//, '').replace(/^www\./, '');
    const url = await this.urlRepository.create(urlWithouHttp);
    return url;
  }
}