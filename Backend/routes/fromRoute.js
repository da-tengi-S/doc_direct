import express from 'express';
import { issueformSubmit } from '../controllers/issueFormController.js';

const formRouter = express.Router();

// Form submission route
formRouter.post('/', issueformSubmit);

export default formRouter;
