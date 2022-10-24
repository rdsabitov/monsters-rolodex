import {useState, useEffect} from 'react';

import CardList from './components/card-list/card-list.component';
import './App.css';
import SearchBox from './components/search-box/search-box.component';


const App = () => { 

  const [searchField, setSearchField] = useState(''); //[value, setValue]
  const [monsters, setMonsters] = useState([]);
  const [filteredMonsters, setFilteredMonsters] = useState(monsters)
  const [title, setTitle] = useState('');
  // const [stringField, setStringField] = useState('');

  console.log('render'); 

  useEffect(() => { 
    fetch('https://jsonplaceholder.typicode.com/users')
    .then((response) => response.json())
    .then((users)=>
    setMonsters(users)
    );
  }, []);

 
  useEffect(() => { 
    const newFilteredMonsters = monsters.filter((monster) => { 
      return monster.name.toLocaleLowerCase().includes(searchField)
    }); 

    setFilteredMonsters(newFilteredMonsters)
  }, [monsters, searchField]);

  const onSearchChange = (event) => { 
    const searchFieldString = event.target.value.toLocaleLowerCase();
    setSearchField(searchFieldString);
 
  };

  const onTitleChange = (event) => { 
    const searchFieldString = event.target.value.toLocaleLowerCase();
    setTitle(searchFieldString);
  }


  // const filteredMonsters = monsters.filter((monster) => { 
  //     return monster.name.toLocaleLowerCase().includes(searchField)
  // });


    return ( 
      <div className='App'> 
      <h1 className='app-title'>{title}</h1>
      <SearchBox 
          className='monsters-search-box'
          onChangeHandler={onSearchChange} 
          placeholder='search monsters'
          />
          <br /> 
      <SearchBox
      className='title-search-box'
      onChangeHandler={onTitleChange}
      placeholder='set title'
       />
          <CardList monsters={filteredMonsters}/>
      </div>
    );};
export default App;
      