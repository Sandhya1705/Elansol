import React from 'react';
import { Redirect } from 'react-router-dom';

const ProtectedPage = () => {
  const user = JSON.parse(localStorage.getItem('user'));

  if (!user) {
    return <Redirect to="/login" />;
  }

  return (
    <div>
      <h1>Welcome, {user.name}</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Date of Birth</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{user.name}</td>
            <td>{user.dob}</td>
            <td>{user.email}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ProtectedPage;
