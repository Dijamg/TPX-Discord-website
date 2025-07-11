import React, {useState, useEffect} from 'react'
import './index.css'
import Frontpage from '../Components/Frontpage'
import MemberService from '../Services/Member'
import { Member } from '../types'

const App = () => {
  const [members, setMembers] = useState<Member[]>([])

  useEffect(() => {
    MemberService.getAll().then(data => {
      setMembers(data)
    })
  }, [])

  return (
    <div>
       <Frontpage members={members}/>
    </div>
  );
}

export default App;
