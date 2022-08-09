import './App.css';
import React, {useEffect, useState} from 'react';
import useFetch from 'use-http';
import Modal from './components/Modal';
import Timer from './components/Timer';
import Input from './components/Input'
import List from './components/List';

const KEY = "&apikey=a1c05d99";
const HOST= 'http://www.omdbapi.com'

function App() {

  const {loading, response, get} = useFetch(HOST);
  const [list, setMovieList] = useState([]);
  const [search, setSearch] = useState('');
  const [ shouldShowModal, setShouldShowModal] = useState(false);
  const [id, setID]= useState();
  const [current, setCurrent] = useState();



  let search_title = `?s=${search}`

  async function getMovie () {
    try {
      const movie = await get(`/${search_title}${KEY}`)
      let arr_search = movie.Search
      if (response.ok){setMovieList(arr_search)}
      
      
    } catch (error) {
      console.log(error)    
    }
  
  }


  useEffect (()=> {
    getMovie()

  },[search])

  return (
    <div className="App">
      <header>
        <h2>Search For Your Favourite Movies</h2>
        <Timer />
      </header>
      <Input  setSearch={setSearch}/>
      <List list={list} loading={loading} setShouldShowModal={setShouldShowModal} setID={setID} setCurrent={setCurrent}/>
      <Modal shouldShow={shouldShowModal} onRequestClose= {()=> setShouldShowModal(false)} id={id} position={current}
      setPosition = {setCurrent} list_len={list?.length} newId={setID}
      />
    </div>
  );
}

export default App;
