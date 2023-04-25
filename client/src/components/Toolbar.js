import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { clearUser } from '../features/dataSlice';

const Toolbar = () => {
  const isLoggedIn = useSelector((state) => state.data.isLoggedIn);
  const user = useSelector((state) => state.data.myUser);

  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(clearUser());
  };

  return (
    <div className="toolbar">
      <div>
        <Link to="/">Home</Link>
        {!isLoggedIn && <Link to="/register">Register</Link>}
        {isLoggedIn && (
          <>
            <Link to="/profile">Profile</Link>
            <Link to="/allusers">All Users</Link>
            <Link to="/conversations">Conversations</Link>
            <Link to="/" onClick={handleLogout}>Logout</Link>
          </>
        )}
        {!isLoggedIn && <Link to="/login">Login</Link>}
      </div>
      <div className='color-name'>Welcome {user?.username}!</div>

    </div>
  );
};

export default Toolbar;
