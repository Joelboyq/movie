import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, Heart, X } from "lucide-react";
import DarkModeToggle from "./DarkModeToggle";

const Header = () => {
  // State to manage the search bar expansion
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  // State to manage the search query input
  const [searchQuery, setSearchQuery] = useState("");
  // State to manage screen size check for responsive design
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 640);
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const searchContainerRef = useRef(null);

  // Effect to handle window resize and update screen size state
  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 640);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Effect to focus the search input when search bar is expanded
  useEffect(() => {
    if (isSearchExpanded && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isSearchExpanded]);

  // Effect to handle clicks outside the search bar to collapse it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target)
      ) {
        setIsSearchExpanded(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Function to handle search form submission
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
      setIsSearchExpanded(false);
    }
  };

  // Function to toggle the search bar expansion
  const toggleSearch = () => {
    if (isSmallScreen) {
      if (isSearchExpanded && searchQuery.trim()) {
        handleSearchSubmit({ preventDefault: () => {} });
      } else {
        setIsSearchExpanded(!isSearchExpanded);
      }
    } else {
      handleSearchSubmit({ preventDefault: () => {} });
    }
  };

  // Function to clear the search input
  const clearSearch = () => {
    setSearchQuery("");
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <header className="bg-accent dark:bg-gray-800 text-background dark:text-white py-4 px-6 flex justify-between items-center">
      <Link
        to="/"
        className={`text-2xl font-bold ${
          isSearchExpanded && isSmallScreen ? "hidden" : "block"
        } sm:block`}
      >
        Filmo
      </Link>
      <div className="flex items-center space-x-4 flex-grow justify-end">
        <div
          ref={searchContainerRef}
          className={`relative ${
            isSearchExpanded && isSmallScreen ? "w-full" : "w-auto"
          }`}
        >
          <form onSubmit={handleSearchSubmit} className="flex items-center">
            <input
              ref={inputRef}
              type="text"
              placeholder="Search movies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`bg-secondary text-background placeholder-background/70 rounded-full py-2 pl-4 pr-10 focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300 ${
                isSmallScreen
                  ? isSearchExpanded
                    ? "w-full"
                    : "w-0 opacity-0"
                  : "w-64 opacity-100"
              }`}
            />
            {((isSmallScreen && isSearchExpanded) || !isSmallScreen) &&
              searchQuery && (
                <button
                  type="button"
                  onClick={clearSearch}
                  className="absolute right-12 top-1/2 transform -translate-y-1/2 p-1"
                >
                  <X size={20} className="text-background" />
                </button>
              )}
            <button
              type="button"
              onClick={toggleSearch}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 p-2 bg-secondary rounded-full"
            >
              <Search size={24} className="text-background" />
            </button>
          </form>
        </div>
        <DarkModeToggle />
        <Link
          to="/favorites"
          className="text-background dark:text-white hover:text-primary"
        >
          <Heart size={24} />
        </Link>
      </div>
    </header>
  );
};

export default Header;
