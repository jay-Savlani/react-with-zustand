# Pokemon Search Application which uses Zustand as state management library

This is a simple application to search Pokemon using a search bar. On searching for a pokemon it will update both left (name panel) and right side(images panel) of the web app which are created through different components (hence showcasing the state management funtionality of zustand).

Branch (with_zustand): 

Zustand is a state management library far more simpler than redux.
Similar to redux it has single source of truth that is a store. 
But unlike Redux, zustand does not require contexts providers to be used (Cool..? Right!)

Create function of zustand library gives us the custom hook through which we can use the state in any and all components of the application. 

**App.js file** contains the **store** that is created by zustand using create function.

Location: **src/App.js**

```javascript 
import create from "zustand";


export const useStore = create((set) => ({
  pokemon: [],
  filter: "",
  setPokemon: (pokemon) => set({ pokemon }),
  setFilter: (filter) => set({ filter }),
}));
```

From the code above, we can see that create function returns custom hook defined as useStore which lets us hook into the states stored in the zustand store. 

Create function takes in an argument set (which is a function in itself) to set the state of the store. 

By default, set merges the state to the original state **(no spread operators are required)**.

This store contains four state parameters : 

Parameter  |Type|What does it do ? 
------------- |--- |-------------
 pokemon      |Array    |Pokemon array
 filter       |String    |stores the search string
 setPokemon   |Function    |sets the pokemon array(state pokemon array)
 setFilter    |Function    |sets the filter(state), used as onChange for input element to update the filter(state)
 
 How this application Application works ? 
 
 --------------------------
 
 The Pokemon component (in src folder) runs a useEffect (which runs when the component is mounted by the react) and does a Pokemon array fetching from REST Endpoint. 
 To prevent errors in the application , we are using a promise inside the useEffect Function. 
 
 Promises are generally used with actions that are asynchronous and they make sure that certain actions (user defined) are done only after promise resloves (i.e Async functions are done), otherwise we would end up with values that are undefined (and result in errors) because the asynchronous functions are not done yet and we start using the values that are returned from Asynchronous functions. 
 
 UseEffect also takes in a dependancy array as the second argument (first argument being callback function), to list the dependancies which if they change then useEffect is called again. But since what the user sees is entirely controlled by the internal state of the application (filter), we do not want any extra API calls to be made. 
 
 ```javascript 
  useEffect(() => {
      console.log("Use Effect called");
      fetch("https://jherr-pokemon.s3.us-west-1.amazonaws.com/index.json")
        .then((resp) => resp.json())
        .then((data) => setPokemon(data));
    }, []);
 ````
 
 If we observer then this piece of uses a function called setPokemon (which is stored in the state). Hence we need to use our store inside the Pokemon component to be able to access the state values before we use any state values inside the component. 
 
 **Now our code looks like this :**
 
 ```javascript
  const pokemon = useStore((state) => state.pokemon);
    const setPokemon = useStore((state) => state.setPokemon);
  
    useEffect(() => {
      console.log("Use Effect called");
      fetch("https://jherr-pokemon.s3.us-west-1.amazonaws.com/index.json")
        .then((resp) => resp.json())
        .then((data) => setPokemon(data));
    }, []);
 ```
 
Wait..! We are yet to return something from this Pokemon Component. We will return a grid from this Component which will list all the pokemons (along with their images and name)

**The complete Pokemon.js code looks like this now: **

```javascript 
 import React, {useEffect} from "react";
import { useStore } from "./App";   // the store that we created in App.js
import "./pokemon.css";  // you can use your own css here

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
```

The pokmeon is the array that we get from the zustand store (useStore) and we are filtering it based on the the filter (which is entered by user in the search bar) and subsequently we also take a slice of the array (first 20 pokemons). Yeah you got it right...! This is infact a very simple react application. 

Now the question comes where the heck is Input Component. And without it how are we using the filter (where is the logic that takes in input from user and sets it in filter state..?). 

To demostrate the capacity of global state store , I have created the **Input component as a seperate component** which is as below:

Location : **src/SearchPokemon.js**

```javscript
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
```
 
We are again using the store that we created from the App.js file. This is pretty simple and straightforward , we are reading the state values filter and SetFilter. The value of input element is driven by filter value and onChange of the input we are updating the filter value stored in the state. 

And finally an extra component which just renders the list of pokemon names based on the filter (again to demonstrate global state store of zustand)

Location: **src/Info.js**

```javascript
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
```

The flow now looks like this: 

Pokemon (data is fetched by useEffect on component mount) -> Input Component (updates or sets filter) -> Pokemon image list is rendered | Parallely Info list is also rendered.  

**App.js file looks like this now: **

```javascript 
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

```

Here the Main Container is just a container (grid container - purely CSS).  

For more information on the zustand , please read the zustand github readme file. 

Hope this helps..!

URL:     https://github.com/pmndrs/zustand 
