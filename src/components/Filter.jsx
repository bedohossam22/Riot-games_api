import { useState, useEffect } from "react";

export default function Filter({ onSearch }) {
  const api_key = 'RGAPI-b7bec633-ee5b-481f-a0ef-2bef22fb2';

  const [championNames, setChampionNames] = useState([]);
  const [filteredChampionNames, setFilteredChampionNames] = useState([]);
  const [showOptions, setShowOptions] = useState(false);

  useEffect(() => {
    const fetchChampionNames = async () => {
      try {
        const url = `https://ddragon.leagueoflegends.com/cdn/13.19.1/data/en_US/champion.json?api_key=${api_key}`;
        const response = await fetch(url);
        const data = await response.json();

        const names = Object.keys(data.data);
        setChampionNames(names);
        setFilteredChampionNames(names);
      } catch (error) {
        console.log("Error fetching champion names:", error);
        setChampionNames([]);
        setFilteredChampionNames([]);
      }
    };

    fetchChampionNames();
  }, []);

  const handleSearch = (searchValue) => {
    const filteredNames = championNames.filter((name) =>
      name.toLowerCase().includes(searchValue.toLowerCase())
    );
    setFilteredChampionNames(filteredNames);
    setShowOptions(searchValue.length > 0);
    onSearch(filteredNames);
  };

  return null; // No JSX code is returned in the Filter component
}