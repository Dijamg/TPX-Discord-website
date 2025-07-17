import express from "express";
import cors from 'cors';
import { initScheduler } from "./scripts/scheduler";
import lolBasicInfoRoutes from "./routes/lolBasicInfo.routes";
import lolCurrentSeasonInfoRoutes from "./routes/lolCurrentSeasonInfo.routes";
import lolMasteryInfoRoutes from "./routes/lolMasteryInfo.routes";
import upcomingClashTournamentsRoutes from "./routes/upcomingClashTournaments.routes";
import tournamentsRoutes from "./routes/tournaments.routes";
import lolMatchHistoryRoutes from "./routes/lolMatchHistory.routes";
import membersRoutes from "./routes/members.routes";
import { AccountService } from "./services";
import authRoutes from "./routes/auth.routes";
import { authMiddleware } from "./middlewares/authMiddleware";
import { adminMiddleware } from "./middlewares/adminMiddleware";
import lolAccountInfoRoutes from "./routes/lolAccountInfo.routes";


const app = express();
app.use(cors());
app.use(express.json());

app.use('/lol-basic-info', lolBasicInfoRoutes);
app.use('/lol-current-season-info', lolCurrentSeasonInfoRoutes);
app.use('/lol-mastery-info', lolMasteryInfoRoutes);
app.use('/upcoming-clash-tournaments', upcomingClashTournamentsRoutes);
app.use('/tournaments', tournamentsRoutes);
app.use('/lol-match-history', lolMatchHistoryRoutes);
app.use('/members', membersRoutes);
app.use('/auth', authRoutes);
app.use('/lol-account-info', lolAccountInfoRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

// for testing 
app.get('/accounts', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const accounts = await AccountService.getAll();
    res.status(200).json(accounts);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

const PORT = process.env.NODE_DOCKER_PORT ?? 8080;

initScheduler().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}).catch((error) => {
  console.error('Error initializing scheduler:', error);
  process.exit(1);
});