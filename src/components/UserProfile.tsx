import React from 'react';

export const UserProfile = () => {
const user = { name: "John Doe" };

  return (
    <div>
      <h2>User Profile</h2>
      <p>Name: {user.name}</p>
    </div>
  );
};