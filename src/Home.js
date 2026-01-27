import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import "./Home.css";

export default function Home({ data }) {
  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortOption, setSortOption] = useState("name-ascending");
  const [favorites, setFavorites] = useState([]);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  //Using local storage to set the favorites
  useEffect(
    () =>
      localStorage.setItem(
        "boyleCountySitesFavorites",
        JSON.stringify(favorites),
      ),
    [favorites],
  );

  //Retrieve those favorites set in the local storage
  useEffect(() => {
    const savedFavorites = localStorage.getItem("boyleCountySitesFavorites");

    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  //This was an attempt to categorize the sites based on the site name. If the JSON file is updated with site categories, this can be a great addition.
  const getCategory = (siteName) => {
    const name = siteName.toLowerCase();
    if (name.includes("church")) {
      return "Churches";
    }
    if (
      name.includes("house") ||
      name.includes("inn") ||
      name.includes("hall")
    ) {
      return "Houses";
    }
    if (
      name.includes("courthouse") ||
      name.includes("building") ||
      name.includes("office") ||
      name.includes("post office")
    ) {
      return "Public Buildings";
    }
    return "Other";

    
  };
  let interactiveData = [...data];
  if (searchText.trim() !== "") {
    interactiveData = interactiveData.filter((sites) =>
      sites.Site.toLowerCase().includes(searchText.toLowerCase()),
    );
  }

  if (selectedCategory !== "All") {
    interactiveData = interactiveData.filter(
      (sites) => getCategory(sites.Site) === selectedCategory,
    );
  }

  if (showFavoritesOnly) {
    interactiveData = interactiveData.filter((sites) =>
      favorites.includes(sites.SiteID),
    );
  }

  interactiveData = [...interactiveData].sort((a, b) => {
    if (sortOption === "name-ascending") {
      if (a.Site>b.Site)
      return 1;
      else if(b.Site>a.Site)
      {
        return -1;
      }
      else
      {
        return 0;
      }
    } 
    else if (sortOption === "name-descending") 
    {
      if (a.Site>b.Site)
      return -1;
      else if(b.Site>a.Site)
      {
        return 1;
      }
      else
      {
        return 0;
      }
    }
    return 0;
  });

  const toggleFavorite = (siteID, event) => {
    event.preventDefault();
    setFavorites((prev) =>
      prev.includes(siteID)
        ? prev.filter((id) => id !== siteID)
        : [...prev, siteID],
    );
  };

  const categories = ["All", "Churches", "Houses", "Public Buildings", "Other"];
  return (
    <>
      <div className="home-container">
        <header>
          <h1>Boyle County Sites</h1>
        </header>

        <div className="controls-section">
          <div className="searchBar">
            <input
              placeholder="Search Sites"
              value={searchText}
              onChange={(event) => setSearchText(event.target.value)}
            />
            {searchText && (
              <button
                className="clear-search"
                onClick={() => setSearchText("")}
              >
                ✕
              </button>
            )}
          </div>

          <div className="results">
            <p>
              {interactiveData.length}
              {interactiveData.length === 1 ? "site" : "sites"} found
            </p>
            {favorites.length > 0 && (
              <button
                className={`favorites-toggle ${showFavoritesOnly ? "active" : ""}`}
                onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
              >
                {showFavoritesOnly
                  ? "Show All"
                  : `Show Favorites (${favorites.length})`}
              </button>
            )}
          </div>

          <div className="filter-section">
            <div className="category-filters">
              {categories.map((category) => (
                <button
                  key={category}
                  className={`filter-chip ${selectedCategory === category ? "active" : ""}`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>

            <div className="sort-section">
              <label>Sort by: </label>
              <select
                value={sortOption}
                onChange={(event) => setSortOption(event.target.value)}
                className="sort-select"
              >
                <option value="name-ascending">Name (A-Z)</option>
                <option value="name-descending">Name (Z-A)</option>
              </select>
            </div>
          </div>
        </div>

        {interactiveData.length === 0 ? (
          <div className="no-results">
            <p>No sites found. Try adjusting your search or filters.</p>
          </div>
        ) : (
          <div className="sites-container">
            {interactiveData.map((sites) => (
              <div key={sites.SiteID} className="site-card">
                <Link to={`/sites/${sites.SiteID}`} className="site-link">
                  <div className="card-header">
                    <h2>{sites.Site}</h2>
                    <button
                      className={`favorite-button ${favorites.includes(sites.SiteID) ? "active" : ""}`}
                      onClick={(event) => toggleFavorite(sites.SiteID, event)}
                    >
                      ❤️
                    </button>
                  </div>
                  <div className="image-wrapper">
                    <img src={sites.Image} alt={sites.Site} />
                    <div className="image-overlay">
                      <span>Click to show more.</span>
                    </div>
                  </div>
                  <div className="card-category">{getCategory(sites.Site)}</div>
                </Link>
              </div>
            ))}
          </div>
        )}

        <footer>
          <p>Site by Shreyup and Mitch ;)</p>
        </footer>
      </div>
    </>
  );
}
