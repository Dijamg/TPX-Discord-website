import { Router } from 'express';
import { CloudinaryService, TournamentService } from '../services/index';
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
    // If the tournament has an image url and it is a cloudinary url, delete the image. Protected images are not deleted.
    if(data && data.img_url && data.img_url.includes('cloudinary') && !data.img_url.includes('protected')) {
      await CloudinaryService.deleteImage(data.img_url);
      console.log(`Deleted image ${data.img_url}`);
    }
    res.send(data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error querying database');
  }
});

export default router;