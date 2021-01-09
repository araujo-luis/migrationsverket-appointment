import { Router } from 'express';
import * as MigrationController from '../controllers/MigrationController';

const MigrationRoute = Router();

MigrationRoute.get('/:agency/:date/:appoitmentType/:numberOfPeople', MigrationController.findSlots);

export default MigrationRoute;