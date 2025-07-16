import { Router } from 'express';
import { MemberService } from '../services/index';
import { authMiddleware } from "../middlewares/authMiddleware";
import { adminMiddleware } from "../middlewares/adminMiddleware";
import { syncNewMemberInfo } from '../scripts/syncNewMemberInfo';
import { RiotService } from '../services';
import { BasicSummonerInfo } from '../types';

const router = Router();

router.post('/', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    let riotPuuid: string | null = null;
    let basicInfo: BasicSummonerInfo | null = null;
    // first ensure that if member has riot data, they are valid
    // Name and tagline can be validated by finding a puuid with them
    // Region can be validated by checking if SummonerV4 returns a valid response with the region and the puuid
    if(req.body.riot_game_name && req.body.riot_tag_line && req.body.riot_region) {
      console.log(`Validating riot data for ${req.body.riot_game_name} ${req.body.riot_tag_line} ${req.body.riot_region}`);
      riotPuuid = await RiotService.getRiotUuid(req.body.riot_game_name, req.body.riot_tag_line);
      if(!riotPuuid) {
        return res.status(400).send('Invalid riot game name or tag line');
      }
      basicInfo = await RiotService.getBasicSummonerInfo(riotPuuid, req.body.riot_region);
      if(!basicInfo) {
        return res.status(400).send('Invalid region for the given riot game name and tag line');
      }
    }
    const member = await MemberService.addMember(req.body);
    // Sync rest of the information before returning, if needed
    if(riotPuuid && basicInfo) {
      await syncNewMemberInfo(member, riotPuuid, basicInfo);
    }
    res.send(member);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error querying database');
  }
});

router.delete('/:id/delete', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const member = await MemberService.deleteMember(parseInt(req.params.id));
    res.send(member);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error querying database');
  }
});

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