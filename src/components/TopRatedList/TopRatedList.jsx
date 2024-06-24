// src/components/TopRatedList.js
import React from 'react';

const TopRatedList = ({ title, items }) => {
  return (
    <div className="mb-4">
      <h3 className="text-lg font-bold">{title}</h3>
      <ul>
        {items.map(item => (
          <li key={item.id}>{item.name} - Rating: {item.rating}</li>
        ))}
      </ul>
    </div>
  );
};

export default TopRatedList;
