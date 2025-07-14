import React, {useState, useEffect} from 'react'
import './index.css'
import Frontpage from '../Components/Frontpage'
import MemberService from '../Services/Member'
import BasicLolInfoService from '../Services/BasicLolInfo'
import { AllProps, BasicLolInfo, CurrentSeasonLolInfo, LolMatchHistory, MasteryInfo, Member, Tournament, UpcomingClashTournament } from '../types'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MemberInfoPage from '../Components/MemberInfoPage'
import CurrentSeasonLolInfoService from '../Services/CurrentSeasonLolInfo'
import MasteryInfoService from '../Services/MasteryInfo'
import TournamentService from '../Services/tournament'
import MatchHistoryService from '../Services/MatchHistory'

const App = () => {
  const [members, setMembers] = useState<Member[]>([])
  const [basicLolInfo, setBasicLolInfo] = useState<BasicLolInfo[]>([])
  const [currentSeasonLolInfo, setCurrentSeasonLolInfo] = useState<CurrentSeasonLolInfo[]>([])
  const [masteryInfo, setMasteryInfo] = useState<MasteryInfo[]>([]) 
  const [upcomingClashTournaments, setUpcomingClashTournaments] = useState<UpcomingClashTournament[]>([])
  const [tournaments, setTournaments] = useState<Tournament[]>([])
  const [lolMatchHistory, setLolMatchHistory] = useState<LolMatchHistory[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          membersData,
          basicInfoData,
          currentSeasonInfoData,
          masteryInfoData,
          tournamentsData,
          upcomingClashTournamentsData,
          lolMatchHistoryData
        ] = await Promise.all([
          MemberService.getAll(),
          BasicLolInfoService.getAll(),
          CurrentSeasonLolInfoService.getAll(),
          MasteryInfoService.getAll(),
          TournamentService.getAllTournaments(),
          TournamentService.getAllUpcomingClashTournaments(),
          MatchHistoryService.getAll()
        ]);
  
        setMembers(membersData);
        setBasicLolInfo(basicInfoData);
        setCurrentSeasonLolInfo(currentSeasonInfoData);
        setMasteryInfo(masteryInfoData);
        setTournaments(tournamentsData);
        setUpcomingClashTournaments(upcomingClashTournamentsData);
        setLolMatchHistory(lolMatchHistoryData);
      } catch (error) {
        console.error("Error fetching initial data:", error);
      }
    };
  
    fetchData();
  }, []);

const props: AllProps = {
  members,
  basicLolInfo,
  currentSeasonLolInfo,
  masteryInfo,
  upcomingClashTournaments,
  tournaments,
  lolMatchHistory
}

  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Frontpage allProps={props}/>} />
          <Route path="/members/:id" element={<MemberInfoPage allProps={props} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
