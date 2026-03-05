"use client";
import React, { useState } from 'react';

export default function AuthForm() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const getStrength = () => {
    if (password.length === 0) return "";
    if (password.length < 6) return "Weak";
    if (password.length < 10) return "Medium";
    return "Strong";
  };

 
const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 6) {
      setError("Password must be at least 6 characters!");
    } else {
      // This is Task 9: Confirm dialog
      const confirmed = window.confirm("Are you sure you want to register with this password?");
      if (confirmed) {
        setError("");
        alert("Account Created!");
      }
    }
  };
  return (
    <div className="p-8 border rounded-lg bg-card text-card-foreground shadow-sm max-w-md mx-auto my-10 relative z-50">
      <h2 className="text-2xl font-bold mb-4">Register</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Password</label>
          <input 
            type="password" 
            className="w-full p-2 border rounded bg-background text-foreground"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          <div className="mt-2 text-sm">
            Strength: <span className="font-bold">{getStrength()}</span>
            <div className="h-2 w-full bg-gray-200 rounded mt-1">
              <div className={`h-full rounded transition-all duration-300 ${
                getStrength() === 'Weak' ? 'w-1/3 bg-red-500' : 
                getStrength() === 'Medium' ? 'w-2/3 bg-yellow-500' : 
                getStrength() === 'Strong' ? 'w-full bg-green-500' : 'w-0'
              }`}></div>
            </div>
          </div>
        </div>
        <button type="submit" className="w-full bg-primary text-primary-foreground p-2 rounded hover:opacity-90">
          Submit
        </button>
      </form>
    </div>
  );
}