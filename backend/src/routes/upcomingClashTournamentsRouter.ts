import { Router } from 'express';
import { TournamentService } from '../services/index';

const router = Router();

// GET /upcoming-clash-tournaments
router.get('/', async (req, res) => {
  try {
    const data = await TournamentService.getAllUpcomingClashTournaments();
    res.send(data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error querying database');
  }
});

export default router;