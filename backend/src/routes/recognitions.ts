import { Router } from 'express';
import { getrecognitions,getrecognitionsByTeamId } from '../controllers/example';

export const recognitionsRouter = Router();


recognitionsRouter.get('/recognitions', getrecognitions);

recognitionsRouter.get('/recognitions/:team_id', getrecognitionsByTeamId);

