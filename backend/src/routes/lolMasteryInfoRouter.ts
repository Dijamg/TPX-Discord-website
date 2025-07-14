import { Router } from 'express';
import { LolMasteryInfoService } from '../services/index';

const router = Router();

// GET /lol-mastery-info
router.get('/', async (req, res) => {
  try {
    const data = await LolMasteryInfoService.getAllLolMasteryInfo();
    res.send(data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error querying database');
  }
});

// GET /lol-mastery-info/:id
router.get('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const data = await LolMasteryInfoService.getLolMasteryInfoById(id);
    res.send(data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error querying database');
  }
});

// GET /lol-mastery-info/by-puuid/:puuid
router.get('/by-puuid/:puuid', async (req, res) => {
  try {
    const puuid = req.params.puuid;
    const data = await LolMasteryInfoService.getLolMasteryInfoByPuuid(puuid);
    res.send(data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error querying database');
  }
});

export default router;