import { Router } from 'express';
import { LolAccountInfoService } from '../services/index';
import { authMiddleware } from '../middlewares/authMiddleware';
import { adminMiddleware } from '../middlewares/adminMiddleware';
import { RiotService } from '../services';
import { syncNewMemberInfo } from '../scripts/syncNewMemberInfo';
  
const router = Router();

// GET /lol-account-info
router.get('/', async (req, res) => {
  try {
    const data = await LolAccountInfoService.getAllLolAccountInfo();
    res.send(data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error querying database');
  }
});

// GET /lol-account-info/:id
router.get('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const data = await LolAccountInfoService.getLolAccountInfoById(id);
    res.send(data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error querying database');
  }
});

// POST /lol-account-info
router.post('/', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    //First we check if an account with these same riot data exists in our database
    //Catch block would catch the unique constraint error, but we put this early to avoid unnecessary calls to riot api
    const existingAccount = await LolAccountInfoService.getLolAccountInfoByRiotData(req.body.riot_game_name, req.body.riot_tag_line);
    if(existingAccount) {
      return res.status(400).send('Member with this riot game name and tag line already exists');
    }
    
    console.log(`Validating riot data for ${req.body.riot_game_name} ${req.body.riot_tag_line} ${req.body.riot_region}`);
    // We check if a riot account exists for the given riot game name and tag line
    const riotAccount = await RiotService.getRiotAccountV1(req.body.riot_game_name, req.body.riot_tag_line);
    if(!riotAccount) {
      return res.status(400).send('Invalid riot game name or tag line');
    }

    //We check if a member with this puuid already exists.
    //This is needed, because the riot api treats game names like "John Doe" and "JohnDoe" as the same name.
    //Therefore, different submitted names can have the same puuid.
    const existingMemberByPuuid = await LolAccountInfoService.getLolAccountInfoByRiotPuuid(riotAccount.puuid);
    if(existingMemberByPuuid) {
      return res.status(400).send('Member with this riot game name and tag line already exists');
    }

    // We get the basic summoner info for the given puuid and region
    // This validates the region.
    const basicInfo = await RiotService.getBasicSummonerInfo(riotAccount.puuid, req.body.riot_region);
    if(!basicInfo) {
      return res.status(400).send('Invalid region for the given riot game name and tag line');
    }

    //Now we can add the account to the database
    const data = await LolAccountInfoService.addLolAccountInfo(req.body);

    // Sync rest of the information before returning.
    await syncNewMemberInfo(data, riotAccount.puuid, basicInfo);

    res.send(data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error querying database');
  }
});

// DELETE /lol-account-info/:id

router.delete('/:id', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const data = await LolAccountInfoService.deleteLolAccountInfo(parseInt(req.params.id));
    res.send(data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error querying database');
  }
});

export default router;