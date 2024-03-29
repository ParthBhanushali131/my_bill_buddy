import React from 'react'
import ReactDOM from 'react-dom/client'
// import App from './App.jsx'
import './index.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage.jsx';
import LoginPage from './components/LoginPage.jsx';
import SignUpPage from './components/SignUpPage.jsx';
import Header from './components/Header.jsx';
import PageWrapper from './components/PageWrapper.jsx';
import GroupsPage from './components/GroupsPage.jsx';
import Group from './components/Group.jsx';
import CreateGroupForm from './components/CreateGroupForm.jsx';
import LogOut from './components/LogOut.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Router>

    
    <Routes>
    <Route path="/" element={<HomePage/>}/>
    <Route path="/login" element={<LoginPage/>}/>
    <Route path="/signup" element={<SignUpPage/>}/>
    <Route path="/header" element={<Header/>}/>
    <Route path='/groups' element={<PageWrapper><GroupsPage/></PageWrapper>}/>
    <Route path='/group/:id' element={<PageWrapper><Group /></PageWrapper>}></Route>
    <Route path='/creategroup' element ={<CreateGroupForm/>}/>
    <Route path='/logout' element ={<LogOut/>}/>
    </Routes>
    

  </Router>
)