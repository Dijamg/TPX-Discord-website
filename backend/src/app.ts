import express, { Express, Request, Response } from "express";
import cors from 'cors';
import { syncRiotPuuid } from "./scripts/syncRiotPuuid";
import { syncBasicLolInfo } from "./scripts/syncBasicLolInfo";
import { LolBasicInfoService, MemberService } from "./services/index";

const app = express();
app.use(cors());
app.use(express.json());


app.get('/members', async (req, res) => {
  try {
    console.log("getAllMembers111");
    res.send(await MemberService.getAllMembers());
} catch (error) {
  console.log(error);
    res.status(500).send("Error querying database");
}
});

app.get('/members/:id', async (req, res) => {
  try {
    res.send(await MemberService.getMemberById(parseInt(req.params.id)));
} catch (error) {
    res.status(500).send("Error querying database");
}
});

app.get('/lol-basic-info', async (req, res) => {
  try {
    res.send(await LolBasicInfoService.getAllLolBasicInfo());
  } catch (error) {
    console.log(error);
    res.status(500).send("Error querying database");
  }
});

app.get('/lol-basic-info/:id', async (req, res) => {
  try {
    res.send(await LolBasicInfoService.getLolBasicInfoById(parseInt(req.params.id)));
  } catch (error) {
    console.log(error);
    res.status(500).send("Error querying database");
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).send('OK');
});



const PORT = process.env.NODE_DOCKER_PORT ?? 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 

// Run syncs sequentially
const runSyncs = async () => {
  try {
    console.log('Starting syncRiotPuuid...');
    await syncRiotPuuid();
    console.log('syncRiotPuuid completed, starting syncBasicLolInfo...');
    await syncBasicLolInfo();
    console.log('All syncs completed');
  } catch (error) {
    console.error('Error during syncs:', error);
  }
};

runSyncs();