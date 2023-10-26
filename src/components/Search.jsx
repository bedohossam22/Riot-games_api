import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
const Riotgamesapi = () => {
  const navigate = useNavigate();
  const api_key = 'RGAPI-b7bec633-ee5b-481f-a0ef-2bef22fb2';
  const [championNames , setChampionNames] = useState([]);
  const [filterChampions , setfilterChampions] = useState([]);
  const [options , setoptions] = useState(false);
  const [ischampion , setIschampion] = useState(false);
  useEffect (() => {
    const fetchchampionsnames =  async () => {
      try {
        const url = `https://ddragon.leagueoflegends.com/cdn/13.19.1/data/en_US/champion.json?api_key=${api_key}`;
        const response = await fetch(url);
        const dataA = await response.json();
        const names = Object.keys(dataA.data)
        setChampionNames(names);
        setfilterChampions(names);
       
      }
      catch {
        setChampionNames([]);
        setfilterChampions([]);
      }
    }
    
    fetchchampionsnames();
  }, []);
  
 
  const handleSearch = (searchValue) => {
    const filteredNames = championNames.filter((name) =>
      name.toLowerCase().includes(searchValue.toLowerCase())
    );
    setfilterChampions(filteredNames);
    setoptions(searchValue.length > 0); 
  
  };
  const handleListItemClick = (name) => {
    document.querySelector('.search-bar').value = name;
    setfilterChampions([]); 
  };
  const apihandle = async () => {
   
    const name = document.querySelector('.search-bar').value 
    if (championNames.includes(name)){
      navigate(`/api-page?name=${name}`);
    }
    else {
    setIschampion(true);
     console.log('error');
     setoptions(false);
    }
  }
 
  return (
    <div className="bg">
      
      <div className="interface">
      <div className='flex'>
        <input
          className="search-bar"
          placeholder="Search champion names"
          onChange={(e) => handleSearch(e.target.value)}
        
        />
        {ischampion &&     <span className='HI'>Champion Dosent Exist!</span> }
       <button onClick={() => apihandle()}>Search</button>
        </div>
       {options && (
          <ul>
            {filterChampions.slice(0, 5).map((name, index) => (
              <li key={index} onClick={() => handleListItemClick(name)}>
                {name}
              </li>
            ))}
          </ul>
        )}

      </div>
  
    </div>
  );
          }
export default Riotgamesapi;