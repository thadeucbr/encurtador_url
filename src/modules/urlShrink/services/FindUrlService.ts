import UrlRepository from '../database/typeorm/repositories/urlRepository';

export default class FindUrlService {
  private urlRepository = new UrlRepository();

  async execute(shortUrl: string) {
    const url = await this.urlRepository.find(shortUrl);
    return url;
  }
}