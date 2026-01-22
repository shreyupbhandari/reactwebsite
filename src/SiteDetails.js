import {React} from 'react';
import {useParams,Link} from 'react-router-dom';
export default function SiteDetails({siteData})

{
    const {siteName}=useParams();
    const site = siteData.find(site=>site.Site===siteName);

    return(<>

    {
        site ? <>
        <h2>{site.Site}</h2>
        <img src={site.Image} alt={site.Site}/>
        <p>{site.Description}</p></>:<><h2>Error 404 Page Not Found!</h2>
        <Link to ="/">Go to Home</Link></>
    }
    </>
    );

}
