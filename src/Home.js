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
let interactiveData=[...data];

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
  if (name.includes("house") || name.includes("inn") || name.includes())



}
if (searchText.trim()!=='')
{
    interactiveData=interactiveData.filter(sites=>sites.Site.toLowerCase().includes(searchText.toLowerCase()));
}

return(
<>

<div className="home-container">
    <header><h1>Boyle County Sites</h1></header>
    <div className = "searchBar">
     <input
      placeholder="Search Sites"
      value={searchText}
      onChange={event => setSearchText(event.target.value)}/>
    </div>

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