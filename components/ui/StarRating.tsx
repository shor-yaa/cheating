"use client";
import React, { useState } from 'react';

export default function StarRating() {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  return (
    <div className="p-6 border border-white/10 rounded-xl bg-slate-900/50 my-6 max-w-md mx-auto shadow-lg text-center">
      <p className="text-xs text-cyan-400 uppercase tracking-widest mb-2 font-semibold">Requirement: Rating System</p>
      <h3 className="text-lg font-bold mb-4 text-white">Rate your Experience</h3>
      
      <div className="flex justify-center gap-2">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            className={`text-4xl transition-all duration-200 transform hover:scale-125 ${
              star <= (hover || rating) ? 'text-yellow-400' : 'text-gray-600'
            }`}
            onClick={() => setRating(star)}
            onMouseEnter={() => setHover(star)}
            onMouseLeave={() => setHover(0)}
          >
            ★
          </button>
        ))}
      </div>
      
      <p className="mt-4 text-sm text-gray-400">
        {rating > 0 ? `You gave it ${rating} stars!` : "Click a star to rate"}
      </p>
    </div>
  );
}