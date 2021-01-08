import { Router } from 'express';
import * as MigrationController from '../controllers/MigrationController';

const MigrationRoute = Router();

MigrationRoute.get('/', MigrationController.findSlots);

export default MigrationRoute;