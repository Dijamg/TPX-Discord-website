import { Router } from 'express';
import { TournamentService } from '../services/index';
import { authMiddleware } from "../middlewares/authMiddleware";
import { adminMiddleware } from "../middlewares/adminMiddleware";

const router = Router();

// GET /tournaments
router.get('/', async (req, res) => {
  try {
    const data = await TournamentService.getAllTournaments();
    res.send(data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error querying database');
  }
});

router.get('/:id', async (req, res) => {
  try {
    const data = await TournamentService.getTournamentById(parseInt(req.params.id));
    res.send(data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error querying database');
  }
});

router.post('/', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const data = await TournamentService.addTournament(req.body);
    res.send(data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error querying database');
  }
});

router.delete('/:id/delete', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const data = await TournamentService.deleteTournament(parseInt(req.params.id));
    res.send(data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error querying database');
  }
});

export default router;