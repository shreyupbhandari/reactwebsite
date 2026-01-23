import React from 'react';
import {Link} from 'react-router-dom';
import {useState} from 'react';

export default function Home({data})
{
 const [sortDirectiion, setSortDirection]=useState(null); 
 const interativeData=[...data];

return(
<>

<header><h1>Boyle County Sites</h1></header>
<div className="sites-container">
{interativeData.map(sites=>
<div className={sites.Site}>
<Link to={`/sites/${sites.SiteID}`}><h1>{sites.Site}</h1></Link><img src ={sites.Image}/></div>)}
</div>
</>
);



}