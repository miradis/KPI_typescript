import './App.css';
import { MainContent } from './component/MainContent/MainConstent';
import { Layout} from 'antd';
import {Route, Routes} from 'react-router-dom'
import { MainPage } from './component/pages/MainPage/MainPage';
import ProfilePage from './component/pages/ProfilePage';
import { EventPage } from './component/pages/EventListPage';
import { TeacherPageList } from './component/pages/TeacherPageList/TeacherPageList';
import { LoginPage } from './component/pages/LoginPage/LoginPage';
import {getCurrentUser} from './services/authServies';
import { useEffect, useState } from 'react';
import { IUser } from './common/IUser';
import { EventsInfo } from './component/pages/EventInfo/EventInfo';
import { SubmissionBox } from './component/pages/SubmissionPage/SubmissionBox';
import { getUser } from './services/authServies';
function App() { 
  const [currentUser, setCurrentUser] = useState<IUser | undefined>(undefined);
  
  useEffect(() => {
    const fetchCurrentUser = async () => {
      const user = await getUser();
      setCurrentUser(user || undefined);
    };
    fetchCurrentUser();
  }, []);
  
  
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Routes>
        {/* {!currentUser && <Route path='/login' element={<LoginPage/>}></Route>}
        <Route path="/" element={<MainContent><MainPage /></MainContent>}></Route> */}
        {currentUser ? <Route path='/' element={<LoginPage/>}></Route>: <Route path='/Main' element={<MainContent><MainPage /></MainContent>}></Route>}
        {currentUser && <Route path='/Main' element={<MainContent><MainPage /></MainContent>}></Route>}
        <Route path='/events/Info'element={<MainContent><EventsInfo></EventsInfo></MainContent>}></Route>
        <Route path='/events' element={<MainContent><EventPage/></MainContent>}></Route>
        <Route path="/teachers" element={<MainContent><TeacherPageList/></MainContent>}></Route>
        <Route path='/profile' element={<MainContent><ProfilePage/></MainContent>}></Route>
        <Route path='/submission' element={<MainContent><SubmissionBox></SubmissionBox></MainContent>}></Route>
      </Routes>
    </Layout>
  );
}    

export default App;
