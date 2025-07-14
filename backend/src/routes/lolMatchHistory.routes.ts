import { Router } from 'express';
import { LolMatchHistoryService } from '../services/index';

const router = Router();

// GET /lol-match-history
router.get('/', async (req, res) => {
  try {
    const data = await LolMatchHistoryService.getAllLolMatchHistory();
    res.send(data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error querying database');
  }
});

// GET /lol-match-history/by-puuid/:puuid
router.get('/by-puuid/:puuid', async (req, res) => {
  try {
    const puuid = req.params.puuid;
    const data = await LolMatchHistoryService.getLolMatchHistoryByPuuid(puuid);
    res.send(data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error querying database');
  }
});


// GET /lol-match-history/:id
router.get('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const data = await LolMatchHistoryService.getLolMatchHistoryById(id);
    res.send(data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error querying database');
  }
});

export default router;