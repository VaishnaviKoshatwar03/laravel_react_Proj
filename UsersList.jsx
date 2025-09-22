import React, { useEffect, useState } from 'react';

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://127.0.0.1:8001/api/users')
      .then(res => res.json())
      .then(data => setUsers(data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h2>Users</h2>
      <ul>
        {users.length > 0
          ? users.map(user => <li key={user.id}>{user.name} - {user.email}</li>)
          : <li>No users found</li>}
      </ul>
    </div>
  );
};

export default UsersList;
