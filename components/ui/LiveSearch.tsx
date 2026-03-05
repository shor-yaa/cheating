"use client";
import React, { useState } from 'react';

export default function LiveSearch() {
  const items = ["Apple", "Banana", "Cherry", "Date", "Elderberry", "Fig", "Grape"];
  const [searchTerm, setSearchTerm] = useState("");

  const filteredItems = items.filter(item =>
    item.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 border rounded-xl bg-card my-6 max-w-md mx-auto shadow-md">
      <h3 className="text-lg font-bold mb-3">Task 6: Live Search</h3>
      <input
        type="text"
        placeholder="Type to filter list..."
        className="w-full p-2 border rounded bg-background mb-4"
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <ul className="space-y-1">
        {filteredItems.map(item => (
          <li key={item} className="p-2 bg-muted rounded-md text-sm">{item}</li>
        ))}
      </ul>
    </div>
  );
}