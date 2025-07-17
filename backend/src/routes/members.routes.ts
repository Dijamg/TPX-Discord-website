import { Router } from 'express';
import { MemberService, CloudinaryService } from '../services/index';
import { authMiddleware } from "../middlewares/authMiddleware";
import { adminMiddleware } from "../middlewares/adminMiddleware";

const router = Router();

const deleteImageIfExists = async (req: any) => {
  if(req.body.img_url && req.body.img_url.includes('cloudinary') && !req.body.img_url.includes('protected')) {
    await CloudinaryService.deleteImage(req.body.img_url);
    console.log(`Deleted image ${req.body.img_url}`);
  }
}

router.post('/', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    // Check if the name is already taken. Prolly remove this later.
    const existingMember = await MemberService.getMemberByName(req.body.name);
    if(existingMember) {
      // Remove image from cloudinary if it exists
      await deleteImageIfExists(req);
      return res.status(400).send('Name already taken');
    }

    const member = await MemberService.addMember(req.body);
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