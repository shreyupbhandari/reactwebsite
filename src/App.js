import logo from './logo.svg';
import './App.css';
import { useEffect } from 'react';
import { useState } from 'react';
const URL = "./BoyleSites.json";

function App() {
  
  const [siteData, setSiteData] = useState([]);
  useEffect(() => {
    async function fetchSiteData()
    {
      const response =await fetch(URL);
      const result = await response.json();
      setSiteData(result);
      console.log(result);
    }
    fetchSiteData();
  },[]);

  return (
    <>
    </>
  );
}

export default App;
