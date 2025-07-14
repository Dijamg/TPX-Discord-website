import { Router } from 'express';
import { LolCurrentSeasonInfoService } from '../services/index';

const router = Router();

// GET /lol-current-season-info
router.get('/', async (req, res) => {
  try {
    const data = await LolCurrentSeasonInfoService.getAllLolCurrentSeasonInfo();
    res.send(data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error querying database');
  }
});

// GET /lol-current-season-info/:id
router.get('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const data = await LolCurrentSeasonInfoService.getLolCurrentSeasonInfoById(id);
    res.send(data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error querying database');
  }
});

export default router;