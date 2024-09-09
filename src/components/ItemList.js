// ItemList.js
import React from 'react';

const ItemList = ({ items }) => {
  const sanitizeString = (str) => str.replace(/[^\x20-\x7E]/g, ''); // Sanitizing

  return (
    <ul className="item-list">
      {items.map((item, index) => (
        <li key={index} className="item">
          {sanitizeString(item)}
        </li>
      ))}
    </ul>
  );
};

export default ItemList; // <-- Ensure this export is present
