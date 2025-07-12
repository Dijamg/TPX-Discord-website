import React, {useState, useEffect} from 'react'
import './index.css'
import Frontpage from '../Components/Frontpage'
import MemberService from '../Services/Member'
import BasicLolInfoService from '../Services/BasicLolInfo'
import { AllProps, BasicLolInfo, Member } from '../types'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MemberInfoPage from '../Components/MemberInfoPage'

const App = () => {
  const [members, setMembers] = useState<Member[]>([])
  const [basicLolInfo, setBasicLolInfo] = useState<BasicLolInfo[]>([])

  useEffect(() => {
  Promise.all([
    MemberService.getAll(),
    BasicLolInfoService.getAll()
  ]).then(([membersData, basicInfoData]) => {
    setMembers(membersData);
    setBasicLolInfo(basicInfoData);
  });
}, []);

const props: AllProps = {
  members,
  basicLolInfo
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
