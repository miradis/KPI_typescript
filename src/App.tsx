import './App.css';
import { MainContent } from './component/MainContent/MainContent';
import { Layout, Spin} from 'antd';
import {Navigate, Route, Routes, useLocation, useNavigate} from 'react-router-dom'
import { MainPage } from './component/pages/MainPage/MainPage';
import ProfilePage from './component/pages/ProfilePage';
import { EventPage } from './component/pages/EventListPage';
import { TeacherPageList } from './component/pages/TeacherPageList/TeacherPageList';
import { LoginPage } from './component/pages/LoginPage/LoginPage';
import { getRole} from './services/authServies';
import { useEffect, useState } from 'react';

import { EventsInfo } from './component/pages/EventInfo/EventInfo';
import { SubmissionBox } from './component/pages/SubmissionPage/SubmissionBox';
import { AssignPage } from './component/pages/AssignPage/AssignPage';
import { CreateAccountPage } from './component/pages/CreatePage/CreateAccountPage';
import { Unauthorized } from './component/pages/UnauthorizedPage/UnauthorizedPage';
import { ProtectedRoute } from './common/ProtectedRoute';
import { NotFoundPage } from './component/pages/NotFoundPage/NotFoundPage';
import { CreateTaskPage } from './component/pages/CreateTaskPage/CreateTaskPage';
import { EventProgressPage } from './component/pages/EventProgressPage/EventProgressPage';
import { EditAccountPage } from './component/pages/EditAccountPage/EditAccountPage';
import { EditPage } from './component/pages/EditPage/EditPage';
function App() { 
  
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<LoginPage />} />

        {/* Protected routes */}
        <Route element={<ProtectedRoute/> } >
        <Route path="/main" element={
        <MainContent><MainPage /></MainContent>} />
        <Route path="/main" element={
        <MainContent><MainPage /></MainContent>} />
        <Route path="/events/:id" element={
        <MainContent><EventsInfo /></MainContent>} />
        <Route path="/events/:teacherId/:eventId" element={
        <MainContent><EventsInfo /></MainContent>} />
        <Route path="/events/tasks" element={
        <MainContent><EventPage /></MainContent>}/>
        <Route path='/events/tasks/:id' element={
        <MainContent><EventProgressPage/></MainContent>}/>
        <Route path='/events/tasks/create/:id' element={
        <MainContent><CreateTaskPage/></MainContent>}/>
        <Route path="/events/tasks/edit/:id" element={
        <MainContent><CreateTaskPage /></MainContent>} />
        <Route path="/events/assigning" element={
        <MainContent><AssignPage /></MainContent>} />
        <Route path="/events/assigning/createPage" element={
        <MainContent><CreateAccountPage /></MainContent>} />
        <Route path="/events/assigning/editPage" element={
        <MainContent><EditAccountPage/></MainContent>}/>
        <Route path="/teachers" element={
        <MainContent><TeacherPageList /></MainContent>} />
        <Route path="/events/assignins/editPage/:id/:status" element={<MainContent><EditPage/></MainContent>}></Route>
        <Route path="/teachers/:id" element={
        <MainContent><ProfilePage /></MainContent>} />
        <Route path="/profile" element={
        <MainContent><ProfilePage /></MainContent>} />
        <Route path="/submission/:id" element={
        <MainContent><SubmissionBox /></MainContent>}/>
        
        </Route>
        <Route path='/LogOut'/>
        <Route path="/unauthorized" element={
        <Unauthorized />}/>
        <Route path="*" element={
        <NotFoundPage/>}/>

      </Routes>
    </Layout>
  );
}    

export default App;
