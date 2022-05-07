import React from "react";
import create from "zustand";
import SearchPokemon from "./SearchPokemon";
import MainContainer from "./MainContainer";
import Pokemon from "./Pokemon";
import Info from "./Info";
import "./app.css";

export const useStore = create((set) => ({
  pokemon: [],
  filter: "",
  setPokemon: (pokemon) => set({ pokemon }),
  setFilter: (filter) => set({ filter }),
}));

function App() {
  return (
    <div className="app-container">
      <SearchPokemon />
      <MainContainer>
        <Info />
        <Pokemon />
      </MainContainer>
    </div>
  );
}

export default App;
