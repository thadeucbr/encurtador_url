import UrlRepository from '../database/typeorm/repositories/urlRepository';

export default class CreateUrlService {
  private urlRepository = new UrlRepository();

  async execute(originalUrl: string) {
    const url = await this.urlRepository.create(originalUrl);
    return url;
  }
}