import {React} from 'react';

function Home({siteData})
{
<>
{siteData.map(sites=>
<div className={sites.Site}>
<Link to={`/sites/${sites.Site}`}/><h1>{sites.Site}</h1><img src ={sites.Image}/></div>)}
</>




}