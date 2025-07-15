import React, {useState, useEffect} from 'react'
import './index.css'
import Frontpage from './Components/Frontpage'
import MemberService from './Services/member'
import BasicLolInfoService from './Services/basicLolInfo'
import { AllProps, BasicLolInfo, CurrentSeasonLolInfo, LolMatchHistory, MasteryInfo, Member, Tournament, UpcomingClashTournament } from './types'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MemberInfoPage from './Components/MemberInfoPage'
import CurrentSeasonLolInfoService from './Services/currentSeasonLolInfo'
import MasteryInfoService from './Services/masteryInfo'
import TournamentService from './Services/tournament'
import MatchHistoryService from './Services/matchHistory'
import LoginPage from './Components/LoginPage'
import RegisterPage from './Components/RegisterPage'
import { AuthContext } from './context/authContext'

const App = () => {
  const [members, setMembers] = useState<Member[]>([])
  const [basicLolInfo, setBasicLolInfo] = useState<BasicLolInfo[]>([])
  const [currentSeasonLolInfo, setCurrentSeasonLolInfo] = useState<CurrentSeasonLolInfo[]>([])
  const [masteryInfo, setMasteryInfo] = useState<MasteryInfo[]>([]) 
  const [upcomingClashTournaments, setUpcomingClashTournaments] = useState<UpcomingClashTournament[]>([])
  const [tournaments, setTournaments] = useState<Tournament[]>([])
  const [lolMatchHistory, setLolMatchHistory] = useState<LolMatchHistory[]>([])
  const [token, setToken] = useState<string | null>(null);

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
      <AuthContext.Provider value={{ token, setToken }}>
        <Router>
          <Routes>
            <Route path="/" element={<Frontpage allProps={props}/>} />
            <Route path="/members/:id" element={<MemberInfoPage allProps={props} />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Routes>
        </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
