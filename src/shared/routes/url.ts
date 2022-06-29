import UrlController from '@modules/urlShrink/controllers/UrlController';
import { Router } from 'express';

const urlRoutes = Router();
const urlController = new UrlController();

urlRoutes.route('/').post(urlController.create)

urlRoutes.route('/:url').get(urlController.redirect)

export default urlRoutes;