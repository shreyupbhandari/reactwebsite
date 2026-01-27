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
            {/*Breadcrumb is a cool feature in webpages that help you show the page's heirarchy.*/}
            <div className="breadcrumb">
              <Link to="/">Home</Link>
              <span>/</span>
              <span>{site.Site}</span>
            </div>
            
            <h2>{site.Site}</h2>
            <div className="image-container">
            <img src={`/${site.Image}`} alt={site.Site} className="site-image"/>
            <p className="image-short-info">{site.Site}</p>
            </div>
            <div className="image-description-container">{site.Description}</p></div>
            
            <div className = "action-buttons">
              <div className = "navigation-buttons">
                  {siteIndex>0&&(<button onClick={previousButton}>←Previous Site</button>}
                </div>
                <div className="nextButton">
                  {siteIndex<data.length-1&&<button onClick={nextButton}>Next Site→</button>}
                </div>
              </div>
              <Link to="/">Go to Home</Link>
            </div>
          
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
