import { Router } from 'express';
import { MemberService, CloudinaryService } from '../services/index';
import { authMiddleware } from "../middlewares/authMiddleware";
import { adminMiddleware } from "../middlewares/adminMiddleware";
import { syncNewMemberInfo } from '../scripts/syncNewMemberInfo';
import { RiotService } from '../services';
import { BasicSummonerInfo } from '../types';

const router = Router();

const deleteImageIfExists = async (req: any) => {
  if(req.body.img_url && req.body.img_url.includes('cloudinary') && !req.body.img_url.includes('protected')) {
    await CloudinaryService.deleteImage(req.body.img_url);
    console.log(`Deleted image ${req.body.img_url}`);
  }
}

router.post('/', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    let riotPuuid: string | null = null;
    let basicInfo: BasicSummonerInfo | null = null;

    // Check if the name is already taken. Prolly remove this later.
    const existingMember = await MemberService.getMemberByName(req.body.name);
    if(existingMember) {
      // Remove image from cloudinary if it exists
      await deleteImageIfExists(req);
      return res.status(400).send('Name already taken');
    }

    // Ensure that if member has riot data, they are valid
    // Name and tagline can be validated by finding a puuid with them
    // Region can be validated by checking if SummonerV4 returns a valid response with the region and the puuid
    if(req.body.riot_game_name && req.body.riot_tag_line) {
      //First we check if a member with these same riot data exists
      //Catch block would catch the unique constraint error, but we put this early to avoid unnecessary calls to riot api
      const existingMember = await MemberService.getMemberByRiotData(req.body.riot_game_name, req.body.riot_tag_line);
      if(existingMember) {
        //Remove image from cloudinary if it exists
        await deleteImageIfExists(req);
        return res.status(400).send('Member with this riot game name and tag line already exists');
      }

      console.log(`Validating riot data for ${req.body.riot_game_name} ${req.body.riot_tag_line} ${req.body.riot_region}`);
      // We check if a riot account exists for the given riot game name and tag line
      const riotAccount = await RiotService.getRiotAccountV1(req.body.riot_game_name, req.body.riot_tag_line);
      //If no riot account is found, we return an error
      if(!riotAccount) {
        //Remove image from cloudinary if it exists
        await deleteImageIfExists(req);
        return res.status(400).send('Invalid riot game name or tag line');
      }

      //We check if a member with this puuid already exists.
      //This is needed, because the riot api treats game names like "John Doe" and "JohnDoe" as the same name.
      //Therefore, different submitted names can have the same puuid.
      const existingMemberByPuuid = await MemberService.getMemberByRiotPuuid(riotAccount.puuid);
      if(existingMemberByPuuid) {
        //Remove image from cloudinary if it exists
        await deleteImageIfExists(req);
        return res.status(400).send('Member with this riot game name and tag line already exists');
      }

      //Set the riot game name and tag line as displayed in riot api response
      req.body.riot_game_name = riotAccount.gameName;
      req.body.riot_tag_line = riotAccount.tagLine;
      riotPuuid = riotAccount.puuid;

      // We get the basic summoner info for the given puuid and region
      basicInfo = await RiotService.getBasicSummonerInfo(riotAccount.puuid, req.body.riot_region);
      if(!basicInfo) {
        //Remove image from cloudinary if it exists
        await deleteImageIfExists(req);
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
    await deleteImageIfExists(req);
    res.status(500).send('Error querying database');
  }
});

router.delete('/:id/delete', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const member = await MemberService.deleteMember(parseInt(req.params.id));
    // If the member has an image url and it is a cloudinary url, delete the image. Protected images are not deleted.
    if(member && member.img_url && member.img_url.includes('cloudinary') && !member.img_url.includes('protected')) {
      await CloudinaryService.deleteImage(member.img_url);
      console.log(`Deleted image ${member.img_url}`);
    }
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