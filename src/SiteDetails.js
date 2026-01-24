import { useParams, Link, useNavigate } from "react-router-dom";
import "./sites.css";

export default function SiteDetails({ data }) {
  const { siteId } = useParams();
  const site = data.find((site) => site.SiteID === parseInt(siteId));
  const siteIndex= data.findIndex(site => site.SiteID === parseInt(siteId));
  const navigate=useNavigate();

  const nextButton=()=>
  {
    navigate(`/sites/${data[siteIndex+1].SiteID}`);
    
   
  }
  const previousButton=()=>
  {
    navigate(`/sites/${data[siteIndex-1].SiteID}`);

  }
  


  return (
    <>
      {site ? (
        <>
          <div className="site-level-container">
            <h2>{site.Site}</h2>
            <img src={`/${site.Image}`} alt={site.Site} />
            <p>{site.Description}</p>
            <div className="previousButton">
               {siteIndex>0&&<button onClick={previousButton}>Go Back 1 page</button>}
            </div>
            <div className="nextButton">
                {siteIndex<data.length-1&&<button onClick={nextButton}>Next Page</button>}
            </div>

            <Link to="/">Go to Home</Link>
          </div>
        </>
      ) : (
        <>
          <h2>Error 404 Page Not Found!</h2>
          <Link to="/">Go to Home</Link>
        </>
      )}
    </>
  );
}
