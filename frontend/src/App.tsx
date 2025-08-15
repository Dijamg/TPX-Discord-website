import React, {useState, useEffect} from 'react'
import './index.css'
import Frontpage from './Components/Frontpage'
import MemberService from './Services/member'
import BasicLolInfoService from './Services/basicLolInfo'
import { AllProps, BasicLolInfo, CurrentSeasonLolInfo, LolAccountInfo, LolMatchHistory, MasteryInfo, Member, Tournament, UpcomingClashTournament } from './types'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MemberInfoPage from './Components/MemberInfoPage'
import CurrentSeasonLolInfoService from './Services/currentSeasonLolInfo'
import MasteryInfoService from './Services/masteryInfo'
import TournamentService from './Services/tournament'
import MatchHistoryService from './Services/matchHistory'
import LoginPage from './Components/LoginPage'
import RegisterPage from './Components/RegisterPage'
import AddMemberPage from './Components/AddMemberPage'
import PublicRoute from './Components/PublicRoute'
import AdminRoute from './Components/AdminRoute'
import AuthProvider from './context/authProvider'
import AddTournamentPage from './Components/AddTournamentPage'
import Footer from './Components/Footer';
import LolAccountService from './Services/lolAccount'
import AddLolAccountPage from './Components/AddLolAccountForm'

const App = () => {
  const [members, setMembers] = useState<Member[]>([])
  const [basicLolInfo, setBasicLolInfo] = useState<BasicLolInfo[]>([])
  const [currentSeasonLolInfo, setCurrentSeasonLolInfo] = useState<CurrentSeasonLolInfo[]>([])
  const [masteryInfo, setMasteryInfo] = useState<MasteryInfo[]>([]) 
  const [upcomingClashTournaments, setUpcomingClashTournaments] = useState<UpcomingClashTournament[]>([])
  const [tournaments, setTournaments] = useState<Tournament[]>([])
  const [lolMatchHistory, setLolMatchHistory] = useState<LolMatchHistory[]>([])
  const [token, setToken] = useState<string | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);
  const [lolAccount, setLolAccount] = useState<LolAccountInfo[]>([])
  const fetchData = async () => {
    try {
      const [
        membersData,
        basicInfoData,
        currentSeasonInfoData,
        masteryInfoData,
        tournamentsData,
        upcomingClashTournamentsData,
        lolMatchHistoryData,
        lolAccountData
      ] = await Promise.all([
        MemberService.getAll(),
        BasicLolInfoService.getAll(),
        CurrentSeasonLolInfoService.getAll(),
        MasteryInfoService.getAll(),
        TournamentService.getAllTournaments(),
        TournamentService.getAllUpcomingClashTournaments(),
        MatchHistoryService.getAll(),
        LolAccountService.getAll()
      ]);
  
      setMembers(membersData);
      setBasicLolInfo(basicInfoData);
      setCurrentSeasonLolInfo(currentSeasonInfoData);
      setMasteryInfo(masteryInfoData);
      setTournaments(tournamentsData);
      setUpcomingClashTournaments(upcomingClashTournamentsData);
      setLolMatchHistory(lolMatchHistoryData);
      setLolAccount(lolAccountData);
  
      setRefreshKey(prev => prev + 1); // this will cause Frontpage to remount
    } catch (error) {
      console.error("Error fetching initial data:", error);
    }
  };
  
  useEffect(() => {
    fetchData();
  }, []);

const props: AllProps = {
  members,
  basicLolInfo,
  currentSeasonLolInfo,
  masteryInfo,
  upcomingClashTournaments,
  tournaments,
  lolMatchHistory,
  lolAccount
}

  return (
    <div className="flex flex-col min-h-screen">
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Frontpage allProps={props} refreshKey={refreshKey}/>} />
            <Route path="/members/:id" element={<MemberInfoPage allProps={props} />} />

            <Route path="/login" element={<PublicRoute><LoginPage /></PublicRoute>} />
            <Route path="/register" element={<PublicRoute><RegisterPage /></PublicRoute>} />

            <Route path="/add-member" element={<AdminRoute><AddMemberPage fetchData={fetchData}/></AdminRoute>}/>
            <Route path="/add-tournament" element={<AdminRoute><AddTournamentPage fetchData={fetchData}/></AdminRoute>}/>
            <Route path="/members/:id/add-lol-account" element={<AdminRoute><AddLolAccountPage allProps={props} fetchData={fetchData}/></AdminRoute>}/>
          </Routes>
          <Footer />
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;