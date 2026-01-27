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
            <div className="image-description-container">
              <p>{site.Description}</p>
              </div>
            
            <div className = "action-buttons">
              <div className = "navigation-buttons">
                  {siteIndex>0&&(<button onClick={previousButton} className="previous-button">←Previous Site</button>)}
                
                  {siteIndex<data.length-1&&(<button onClick={nextButton} className="next-button">Next Site→</button>)}
              </div>
              <div className="Home-button">
                 <Link to="/" className="home-link">🏠 Go to Home</Link>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="error-container">
          <h2>Error 404 Page Not Found!</h2>
          <p>The sites you are looking for doesn't exist.</p>
          <Link to="/" className="home-link">Go to Home to explore furthter.</Link>
        </div>
      )}
    </>
  );
}
