import UrlRepository from '../database/typeorm/repositories/urlRepository';

export default class CreateUrlService {
  private urlRepository = new UrlRepository();

  async execute(originalUrl: string) {
    const urlWithouHttp = originalUrl.replace(/https:\/\/|http:\/\//, '').replace(/^www\./, '');
    const url = await this.urlRepository.create(urlWithouHttp);
    return url;
  }
}