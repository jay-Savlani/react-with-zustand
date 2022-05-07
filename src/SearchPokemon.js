import React from "react";

import { useStore } from "./App";
import "./searchPokemon.css"

const SearchPokemon = () => {

    const filter = useStore(state => state.filter);
    const setFilter = useStore(state => state.setFilter);

    return (
        <input
          className="search"
          type="text"
          placeholder="Search Pokemon"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
    )
}

export default SearchPokemon;