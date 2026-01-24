import React from 'react';
import {Link} from 'react-router-dom';
import {useState} from 'react';
import './Home.css';

export default function Home({data})
{
const [searchText,setSearchText]=useState('');
let interactiveData=[...data];



if (searchText.trim()!=='')
{
    interactiveData=interactiveData.filter(sites=>sites.Site.toLowerCase().includes(searchText.toLowerCase()));
}

return(
<>

<div className="home-container">
    <header><h1>Boyle County Sites</h1></header>
     <input
      placeholder="Search Sites"
      value={searchText}
      onChange={event => setSearchText(event.target.value)}/>


    <div className="sites-container">
        {interactiveData.map(sites=>
            <Link to={`/sites/${sites.SiteID}`}>
                <div className={sites.Site}>
                <h1>{sites.Site}</h1>
                <img src ={sites.Image} alt={sites.description}/>
                </div>
            </Link>
        )}
    </div>

    <footer><p>Site by Shreyup and Mitch ;)</p></footer>
</div>

</>
);

}