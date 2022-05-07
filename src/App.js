/* useEffect: es una función que crea internamente una variable donde podremos 
almacenar el estado de nuestro componente 
useState: Devuelve un valor con estado y una función para actualizarlo. 
Durante el renderizado inicial, el estado devuelto ( state )
*/
import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Characters from "./components/Characters";
import Pagination from "./components/Pagination";

function App() {
  const [characters, setChararcters] = useState([]);

  const [info, setInfo] = useState({});

  const initialUrl = "https://rickandmortyapi.com/api/character";

  const fetchCharacters = (url) => {
    console.log(url) //Verifica los datos obtenidos de la respuesta en formato JSON através de la consola de JavaScript.
    
    fetch(url) //
      .then((response) => response.json())
      .then((data) => {
        setChararcters(data.results);
        setInfo(data.info);
      })
      
      .catch((error) => console.log(error));
  };

  const onPrevious = () => {
    fetchCharacters(info.prev);
  }

  const onNext = () => {
    fetchCharacters(info.next);
  }

  useEffect(() => {
    fetchCharacters(initialUrl);
  }, []);

  return (
    <>
      <Navbar brand="Rick and Morty App" />
    
      <div className="container mt-5">
        <Pagination prev={info.prev} next={info.next} onPrevious={onPrevious} onNext={onNext}/>
        <Characters characters={characters}/>
        <Pagination prev={info.prev} next={info.next} onPrevious={onPrevious} onNext={onNext}/>
      </div>
    </>
  );
}

export default App;
