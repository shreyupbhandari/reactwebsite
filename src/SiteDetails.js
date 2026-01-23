import React from 'react';
import {useParams,Link} from 'react-router-dom';
import './sites.css'; 

export default function SiteDetails({data})

{
    const {siteId}= useParams();
    const site = data.find(site=>site.SiteID===parseInt(siteId));
    console.log(site);

    return(<>

    {
        site ? <>
        <h2>{site.Site}</h2>
        <img src={`/${site.Image}`} alt={site.Site}/>
        <p>{site.Description}</p> <Link to ="/">Go to Home</Link></>:<><h2>Error 404 Page Not Found!</h2>
        <Link to ="/">Go to Home</Link></>
    }
    </>
    );

}
