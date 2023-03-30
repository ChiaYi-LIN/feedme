// import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from './HomePage/HomePage';
import MyFridge from './MyFridge/myfridge';
import Startup from './Startup/Startup';
import Recipe from './Recipe/recipe';
import LoginPage from './Login/LoginPage';
import SignupPage from './Signup/SignupPage';
import SetPassword from './SetPassword/SetPassword';
import Header from "./Header/Header";
import Detail from "./Recipe/detail";
import Recipe_search_result from './Recipe/recipe-search-result';
import MyArchive from "./MyArchive/MyArchive";
import styled from 'styled-components';
import { useState } from "react";

const Wrapper = styled.div`
  position: fixed;
  width:100%;
  height:100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow:scroll;
`
// align-items: center;
// justify-content: center;

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // you can play with this and click the user icon on the header

  return (
    <Wrapper id="rootMain">
      <Router>
        <Header isLoggedIn={isLoggedIn}/>
        <Routes>
          <Route path='/' element={ <HomePage/> } />
          <Route path='/myfridge' element={ <MyFridge/> } />
          <Route path='/recipe' element={ <Recipe/> } />
          <Route path='/login' element={ <LoginPage/> } />
          <Route path='/Signup' element={ <SignupPage/> } />
          <Route path='/SetPassword' element={ <SetPassword/> } />
          <Route path="/modal" element={ <Detail/> }/>
          <Route path='/recipe-search-result' element={ <Recipe_search_result/> } />
          <Route path='/startup' element={ <Startup/> } />
          <Route path='/myArchive' element={ <MyArchive /> } />
        </Routes>
      </Router>
    </ Wrapper>
  );
}

export default App;
