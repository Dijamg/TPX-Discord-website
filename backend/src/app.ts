import express, { Express, Request, Response } from "express";
import cors from 'cors';
import { MemberService } from "./services/index";

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


const PORT = process.env.NODE_DOCKER_PORT ?? 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 