import { Router } from 'express';
import { LolBasicInfoService } from '../services/index';

const router = Router();

// GET /lol-basic-info
router.get('/', async (req, res) => {
  try {
    const data = await LolBasicInfoService.getAllLolBasicInfo();
    res.send(data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error querying database');
  }
});

// GET /lol-basic-info/:id
router.get('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const data = await LolBasicInfoService.getLolBasicInfoById(id);
    res.send(data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error querying database');
  }
});

export default router;