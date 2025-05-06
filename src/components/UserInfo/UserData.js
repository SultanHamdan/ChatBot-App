import React, { useEffect, useState } from 'react';
import './UserData.css';

function UserData({ onSubmit }) {
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowForm(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(name); // send name to parent
    }
  };

  if (!showForm) return null;

  return (
    <div className="popup-overlay">
      <div className="form-popup">
        <h2>User Information</h2>
        <form className="user-form" onSubmit={handleSubmit}>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <label htmlFor="age">Age:</label>
          <input type="number" id="age" name="age" placeholder="Enter your age" />

          <label htmlFor="gender">Gender:</label>
          <select id="gender" name="gender">
            <option value="">Select</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>

          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default UserData;
