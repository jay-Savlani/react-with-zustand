import React from "react";
import { useStore } from "./App";
import "./info.css"

const Info = () => {
    const pokemon = useStore(state => state.pokemon);
    console.log(pokemon[1]);
    const filter = useStore(state => state.filter);
    return (
        <div className="info-container">
            <h2>Pokemon Name</h2>
            <ul>
                {
                    pokemon?.slice(0,20)
                    .filter(p => p.name.toLowerCase().includes(filter.toLowerCase()))
                    .map(p => (
                        <li key={p.id}>{p.name}</li>
                    ))
                }
            </ul>
        </div>
    )
}
 
export default Info;