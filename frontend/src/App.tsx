import React, {useState, useEffect} from 'react'
import './index.css'
import Frontpage from '../Components/Frontpage'
import MemberService from '../Services/Member'
import BasicLolInfoService from '../Services/BasicLolInfo'
import { AllProps, BasicLolInfo, CurrentSeasonLolInfo, MasteryInfo, Member } from '../types'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MemberInfoPage from '../Components/MemberInfoPage'
import CurrentSeasonLolInfoService from '../Services/CurrentSeasonLolInfo'
import MasteryInfoService from '../Services/MasteryInfo'

const App = () => {
  const [members, setMembers] = useState<Member[]>([])
  const [basicLolInfo, setBasicLolInfo] = useState<BasicLolInfo[]>([])
  const [currentSeasonLolInfo, setCurrentSeasonLolInfo] = useState<CurrentSeasonLolInfo[]>([])
  const [masteryInfo, setMasteryInfo] = useState<MasteryInfo[]>([]) 
  useEffect(() => {
  Promise.all([
    MemberService.getAll(),
    BasicLolInfoService.getAll(),
    CurrentSeasonLolInfoService.getAll(),
    MasteryInfoService.getAll()
  ]).then(([membersData, basicInfoData, currentSeasonInfoData, masteryInfoData]) => {
    setMembers(membersData);
    setBasicLolInfo(basicInfoData);
    setCurrentSeasonLolInfo(currentSeasonInfoData);
    setMasteryInfo(masteryInfoData);
  });
}, []);

const props: AllProps = {
  members,
  basicLolInfo,
  currentSeasonLolInfo,
  masteryInfo
}

  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Frontpage members={members}/>} />
          <Route path="/members/:id" element={<MemberInfoPage allProps={props} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
