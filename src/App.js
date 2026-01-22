import logo from './logo.svg';
import './App.css';
import {useEffect} from 'react';
import { useState } from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import SiteDetails from './SideDetails.js';
import Home from './Home.js';
const URL = "./BoyleSites.json";
function App() {
  
  const [siteData, setSiteData] = useState([]);
  useEffect(() => {
    async function fetchSiteData()
    {
      const response =await fetch(URL);
      const result = await response.json();
      setSiteData(result);
    }
    fetchSiteData();
  },[]);

  return (
    <>
    <h1>Boyle County Sites</h1>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home data={siteData}/>}/>
        <Route path="/sites/:siteName" element={<SiteDetails data={siteData}/>}/>
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
