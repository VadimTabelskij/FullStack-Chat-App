import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setAllUsers } from '../features/dataSlice';
import UserCard from '../components/UserCard';

const AllUsersPage = () => {
  const dispatch = useDispatch();
  const allUsers = useSelector((state) => state.data.allUsers);

  useEffect(() => {
    fetch('http://localhost:3007/allUsers')
      .then((response) => response.json())
      .then((data) => {
        dispatch(setAllUsers(data));
      })
      .catch((error) => console.log(error));
  }, [dispatch]);

  return (
    <div className="all-users-layout">
      <h1 className="all-users-title">All Users</h1>
      <div className="user-list">
        {allUsers.map((user) => (
          <UserCard key={user.secret} user={user} />
        ))}
      </div>
    </div>
  );
};

export default AllUsersPage;
