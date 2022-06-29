import Url from '../typeorm/entities/Url';

export default interface IUrlRepository {
  create(url: string): Promise<Url>;
  find(shortUrl: string): Promise<Url>;
}