import express from "express";
import cors from 'cors';
import { initScheduler } from "./scripts/scheduler";
import lolBasicInfoRouter from "./routes/lolBasicInfoRouter";
import lolCurrentSeasonInfoRouter from "./routes/lolCurrentSeasonInfoRouter";
import lolMasteryInfoRouter from "./routes/lolMasteryInfoRouter";
import upcomingClashTournamentsRouter from "./routes/upcomingClashTournamentsRouter";
import tournamentsRouter from "./routes/tournamentsRouter";
import lolMatchHistoryRouter from "./routes/lolMatchHistoryRouter";
import membersRouter from "./routes/membersRouter";


const app = express();
app.use(cors());
app.use(express.json());

app.use('/lol-basic-info', lolBasicInfoRouter);
app.use('/lol-current-season-info', lolCurrentSeasonInfoRouter);
app.use('/lol-mastery-info', lolMasteryInfoRouter);
app.use('/upcoming-clash-tournaments', upcomingClashTournamentsRouter);
app.use('/tournaments', tournamentsRouter);
app.use('/lol-match-history', lolMatchHistoryRouter);
app.use('/members', membersRouter);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

const PORT = process.env.NODE_DOCKER_PORT ?? 8080;

initScheduler().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});