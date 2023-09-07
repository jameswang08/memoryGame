import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [spriteList, setSpriteList] = useState([]);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);


  async function getSprites(){
    //Get pokedex and extract list of pokemon
    try{
      const rawData = await fetch("https://pokeapi.co/api/v2/pokedex/kanto/");
      const pokedex = await rawData.json();
      const pokeList = pokedex.pokemon_entries;
      //Get corresponding sprite for each pokemon
      const sprites = await Promise.all(
        pokeList.map(async (item) => {
          try {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${item.pokemon_species.name}/`);
            const pokemon = await response.json();
            return {link: pokemon.sprites.front_default, clicked: false};
          } catch (error) {
            console.error("Error:", error);
            return null; 
          }
        })
      );
      setSpriteList(sprites);
    }
    catch(error){
      console.log("Error:", error);
    }
  }



  useEffect(() => {
    getSprites();
  },[]);

  return (
    <>
      <div className='score'>
        <h1>Score: {score}</h1>
        <h1>High Score: {highScore}</h1>
      </div>
      {spriteList.map((item, index) => {
        return <img src={item.link} alt="Image of a Pokemon" key={index}></img>
      })}
    </>
  );
}
export default App
