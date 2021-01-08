
import { Router } from 'express';
import MigrationRoute from './MigrationRoute';

const router = Router();

router.use('/migration', MigrationRoute);

export default router;