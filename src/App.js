import React, {useState,useEffect} from "react";
import "./app.css";

function App() {

  const [filter, setFilter] = useState("");
  const [pokemon, setPokemon] = useState([]);

  useEffect(() => {
    fetch("https://jherr-pokemon.s3.us-west-1.amazonaws.com/index.json")
    .then(resp => resp.json())
    .then(data => setPokemon(data));
  }, []);


  return (
    <div className="main">
  
    <input
      className="search"
      type="text"
      placeholder="Search Pokemon"
      value={filter}
      onChange={(e) => setFilter(e.target.value)}
    />
    
      <div className="container">
        {pokemon?.filter(p => p.name.toLowerCase().includes(filter)).slice(0, 20).map((p) => {
          return (
            <div key={p.id} className="image">
              <img
                alt={p.name}
                src={`https://jherr-pokemon.s3.us-west-1.amazonaws.com/${p.image}`}
              />
              <h2 className="name" >{p.name}</h2>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
