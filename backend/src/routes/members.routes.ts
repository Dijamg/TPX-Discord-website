import { Router } from 'express';
import { MemberService } from '../services/index';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const members = await MemberService.getAllMembers();
    res.send(members);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error querying database');
  }
});

router.get('/:id', async (req, res) => {
  try {
    const member = await MemberService.getMemberById(parseInt(req.params.id));
    res.send(member);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error querying database');
  }
});

export default router;