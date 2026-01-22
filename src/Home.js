import React from 'react';
import {Link} from 'react-router-dom';

export default function Home({data})
{

return(
<>
{data.map(sites=>
<div className={sites.Site}>
<Link to={`/sites/${sites.Site}`}><h1>{sites.Site}</h1></Link><img src ={sites.Image}/></div>)}
</>
);



}