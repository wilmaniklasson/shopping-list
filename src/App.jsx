import React from 'react';
import './App.css';
import ShoppingList from './ShoppingList'; 

function App() {
  return (
    <div className="App">
      <div className="container">
        <h1>Inköpslista</h1>
        <ShoppingList /> 
      </div>
    </div>
  );
}

export default App;
