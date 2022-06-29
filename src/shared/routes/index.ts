import { Router } from 'express';
import urlRoutes from './url';

const routes = Router();

routes.use('/', urlRoutes);

export default routes;