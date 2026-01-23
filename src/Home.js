import React from 'react';
import {Link} from 'react-router-dom';
import {useState} from 'react';
import './Home.css';

export default function Home({data})
{
 const [sortDirectiion, setSortDirection]=useState(null); 
 const interativeData=[...data];

return(
<>


<div className="home-container">
    <header><h1>Boyle County Sites</h1></header>

{/* i'm not sure why this doesnt make the whole div container a think imma try something else */}
        {interativeData.map(sites=>
            <Link to={`/sites/${sites.SiteID}`}>
            <div className="sites-container">
                <div className={sites.Site}>
                <h1>{sites.Site}</h1>
                <img src ={sites.Image}/>
                </div>
            </div>
            </Link>  
        )}

   

    <footer><p>Site by Shreyup and Mitch ;)</p></footer>
</div>

</>
);



}