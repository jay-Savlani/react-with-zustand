import React, {useEffect} from "react";
import { useStore } from "./App";
import "./pokemon.css";

const Pokemon = () => {
    const pokemon = useStore((state) => state.pokemon);
    const setPokemon = useStore((state) => state.setPokemon);
    const filter = useStore((state) => state.filter);
    const setFilter = useStore((state) => state.setFilter);
  
    useEffect(() => {
      console.log("Use Effect called");
      fetch("https://jherr-pokemon.s3.us-west-1.amazonaws.com/index.json")
        .then((resp) => resp.json())
        .then((data) => setPokemon(data));
    }, []);
  
    return (
      
        
  
        <div className="container">
          {pokemon
            ?.filter((p) => p.name.toLowerCase().includes(filter))
            .slice(0, 20)
            .map((p) => {
              return (
                <div key={p.id} className="image">
                  <img
                    alt={p.name}
                    src={`https://jherr-pokemon.s3.us-west-1.amazonaws.com/${p.image}`}
                  />
                  <h2 className="name">{p.name}</h2>
                </div>
              );
            })}
        </div>
     
    );
}

export default Pokemon;