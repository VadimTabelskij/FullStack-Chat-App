import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const UserProfilePage = () => {

  const myUser = useSelector((state) => state.data.myUser);
  const navigate = useNavigate();

  const { username } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3007/user/${username}`)
      .then((response) => response.json())
      .then((data) => {
        setUser(data.user);
        console.log(data);
      })
      .catch((error) => console.log(error));
  }, [username]);


  if (!user) {
    return <div>Loading...</div>;
  }

  const message = () => {
    const data = {
      secret: myUser.secret,
      from: myUser.username,
      to: user.username,
    };

    const options = {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(data),
    };

    fetch('http://localhost:3007/newConversation', options)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        navigate('/conversations');
      });
  };

  return (
    <div className="user-profile-layout">
      <h1>{username}'s Profile</h1>
      {user.imageUrl && (<img src={user.imageUrl} alt={`${user.user}'s profile`} />)}
      {!user.imageUrl && <p>No image available.</p>}
      <button onClick={message}>Send Message</button>
    </div>
  );
};

export default UserProfilePage;
