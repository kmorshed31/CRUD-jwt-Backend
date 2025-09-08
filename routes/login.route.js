import express from 'express'
import { loginHandler } from '../controllers/login.controller.js';

const router = express.Router();

router.post('/', loginHandler);

export default router;
