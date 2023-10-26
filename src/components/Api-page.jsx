import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export default function Api() {
  const api_key = 'RGAPI-b7bec633-ee5b-481f-a0ef-2bef22fb2';
  const location = useLocation();
  const [name, setName] = useState(new URLSearchParams(location.search).get('name'));
  const urlB = `https://ddragon.leagueoflegends.com/cdn/13.19.1/data/en_US/champion/${name}.json?api_key=${api_key}`;
  const urlC = `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${name}_0.jpg`;

  const [championName, setChampionName] = useState('');
  const [championLore, setChampionLore] = useState('');
  const [championPar, setChampionPar] = useState('');
  const [championTitle, setChampionTitle] = useState('');
 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(urlB);
        const dataB = await response.json();
        setChampionName(dataB.data[name].name);
        setChampionLore(dataB.data[name].lore);
        setChampionPar(dataB.data[name].partype);
        setChampionTitle(dataB.data[name].title);
       
      } catch (error) {
        console.log(error);
      }
    };
    console.log(urlB);
    fetchData();
  }, [urlB, name]);
 
  const handleInputChange = (e) => {
    const input = e.target.value;
    const capitalizedInput = input.charAt(0).toUpperCase() + input.slice(1);
    setName(capitalizedInput);
  };
  return (
    <div className="api">
      <div className='center'>
        <div className='flex-box'>
          <div className='left-side'>
            
              <>
                <span className="Name">{`Champion Name: ${championName}`}</span>
                <span className="bar">{`ParType : ${championPar}`}</span>
                <span className="title">{`Title : ${championTitle}`}</span>
                <span className="Lore">{`Lore : ${championLore}`}</span>
              </>
          
          </div>
          <div className='right-side'>
            <img src={urlC} alt='Champion' loading='lazy'></img>
          </div>
        </div>
        <input className='change' type="text"  onChange={handleInputChange} placeholder='Research'/>
      </div>
    </div>
  );
}