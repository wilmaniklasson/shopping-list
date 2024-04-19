import React, { useState, useEffect } from 'react';
import './ShoppingList.css';

function ShoppingList() {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState('');

  useEffect(() => {
    const storedItems = localStorage.getItem('shoppingListItems');
    if (storedItems) {
  
      setItems(JSON.parse(storedItems));
    }
  }, []);

  useEffect(() => {
    if (items.length > 0) {
      localStorage.setItem('shoppingListItems', JSON.stringify(items));
    }
  }, [items]);

  const addItem = (event) => {
    event.preventDefault();
    if (newItem.trim() !== '') {
      const newItemObject = {
        name: newItem,
        checked: false
      };
      setItems([...items, newItemObject]);
      setNewItem('');
    }
  };

  const toggleChecked = (index) => {
    const newItems = [...items];
    newItems[index].checked = !newItems[index].checked;
    setItems(newItems);
  };

  const clearList = () => {
    setItems([]); // Detta kommer också att rensa listan i localStorage
    localStorage.removeItem('shoppingListItems'); // Rensa specifikt för att undvika att ladda en tom lista nästa gång
  };

  return (
    <div className="shopping-list">
      <form onSubmit={addItem}>
        <input
          type="text"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          placeholder="Lägg till vara..."
        />
        <button className='submit-btn' type="submit">Lägg till</button>
      </form>
      <ul>
        {items.map((item, index) => (
          <li key={index} className={item.checked ? 'checked' : ''}>
            <input
              type="checkbox"
              checked={item.checked}
              onChange={() => toggleChecked(index)}
            />
            {item.name}
          </li>
        ))}
      </ul>
      {items.length > 0 && (
        <button onClick={clearList} className="clear-button">Radera listan</button>
      )}
    </div>
  );
}

export default ShoppingList;
