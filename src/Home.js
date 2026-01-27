import React from 'react';
import {Link} from 'react-router-dom';
import {useState, useEffect} from 'react';
import './Home.css';

export default function Home({data})
{
const [searchText,setSearchText]=useState('');
const [selectedCategory, setSelectedCategory]=useState('All');
const [sortOption,setSortOption]=useState('name-ascending');
const [favorites,setFavorites]= useState([]);
const [showFavoritesOnly,setShowFavoritesOnly]=useState(false);

//Using local storage to set the favorites 
useEffect(()=>
localStorage.setItem('boyleCountySitesFavorites',JSON.stringify(favorites))
,[])

//Retrieve those favorites set in the local storage
useEffect(()=>
{
  const savedFavorites=localStorage.getItem('boyleCountySitesFavorites');

  if (savedFavorites)
{
  setFavorites(JSON.parse(savedFavorites));
}
},[favorites])

//This was an attempt to categorize the sites based on the site name. If the JSON file is updated with site categories, this can be a great addition.
const getCategory=(siteName)=>
{
  const name=siteName.toLowerCase();
  if(name.includes("church"))
  {
    return "Churches";
  }
  if (name.includes("house") || name.includes("inn") || name.includes("hall"))
  {
    return "Houses";
  }
   if (name.includes("courthouse") || name.includes("building") || name.includes("office")|| name.includes("post office"))
  {
    return "Public Buildings";
  }
  return "Other";
  
let interactiveData=[...data];
}

if (searchText.trim()!=='')
{
    interactiveData=interactiveData.filter(sites=>sites.Site.toLowerCase().includes(searchText.toLowerCase()));
}

if (selectedCategory!=="All")
{
  interactiveData=interactiveData.filter((sites)=>getCategory(sites.Site)===selectedCategory);
}

if (showFavoritesOnly)
{
  interactiveData=interactiveData.filter(sites=>
    favorites.includes(sites.SiteID));
}

interactiveData=[...interactiveData].sort((a,b)=>
{
  if (sortOption==="name-ascending")
  {
    return a.Site-b.Site;
  }
  else if (sortOption==="name-descending")
  {
    return b.Site-a.Site;
  }
  return 0;
});

const toggleFavorite=(siteID,event)=>
{
  event.preventDefault();
  setFavorites(prev=> prev.includes(siteID)? prev.filter(id=>id!==siteID):[...prev, siteID]);
};

const categories=["All","Churches","Houses","Public Buildings","Other"];
return(
<>

<div className="home-container">
    <header>
    <h1>Boyle County Sites</h1>
    </header>

    <div className = "controls-section">
      <div className='searchBar'>
        <input
        placeholder="Search Sites"
        value={searchText}
        onChange={event => setSearchText(event.target.value)}/>
        {searchText && (<button className="clear-search" onClick={()=>setSearchText('')}}>
        ✕
        </button>)}
    </div>

    <div className='results'>
      <p>{interactiveData.length}{interactiveData.lebgth===1?'site':'sites'} found
      </p>
      {favorites.length>0 &&
      (<button className={`favorites-toggle ${showFavoritesOnly ? 'active':''}`} onClick={()=>setShowFavoritesOnly(!showFavoritesOnly)}>
        {showFavoritesOnly?"Show All":"Show Favorites"}</button>)}

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