import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../features/dataSlice';

const ProfilePage = () => {
  const [imageUrl, setImageUrl] = useState('');
  const [newName, setNewName] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const dispatch = useDispatch();

  const currentUser = useSelector((state) => state.data.currentUser);

  useEffect(() => {
    fetch(`http://localhost:3007/getUserImage/${currentUser.secret}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setImageUrl(data.imageUrl);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, [currentUser]);

  const handleImageUrlChange = (event) => {
    setImageUrl(event.target.value);
  };

  const handleImageUrlSubmit = () => {
    fetch('http://localhost:3007/updatePhoto', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        secret: currentUser.secret,
        imageUrl: imageUrl,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          console.log('Image URL updated successfully!');
        } else {
          alert(data.message);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNameSubmit = () => {
    fetch(`http://localhost:3007/checkUsername/${newName}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          alert('Username already exists!');
          return;
        }
  
        fetch('http://localhost:3007/updateName', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            secret: currentUser.secret,
            newName: newName,
          }),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.success) {
              console.log('Name updated successfully!');
              const updatedUser = { ...currentUser, username: newName };
              dispatch(setUser(updatedUser));
              setNewName('');
            } else {
              alert(data.message);
            }
          })
          .catch((error) => {
            console.error(error);
          });
      })
      .catch((error) => {
        console.error(error);
      });
  };
  
  const handlePasswordChange = (event) => {
    setNewPassword(event.target.value);
  };

  const handlePasswordSubmit = () => {
    fetch('http://localhost:3007/updatePassword', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        secret: currentUser.secret,
        newPassword: newPassword,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          console.log('Password updated successfully!');
          setNewPassword('');
        } else {
          alert(data.message);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="profile-layout">
      <h1>Welcome to your profile, {currentUser.username}!</h1>
      <div className="profile-content">
        {imageUrl ? (
          <img src={imageUrl} alt="User profile" />
        ) : (
          <p>Loading image...</p>
        )}
        <br />
        <br />
        <button onClick={handleImageUrlSubmit}>Update Photo</button>
        <input type="text" value={imageUrl} onChange={handleImageUrlChange} />
        <br />
        <button onClick={handleNameSubmit}>Update Name</button>
        <input type="text" value={newName} onChange={handleNameChange} />
        <button onClick={handlePasswordSubmit}>Update Password</button>
        <input type="text" value={newPassword} onChange={handlePasswordChange} />
        <p>Your current username is: {currentUser.username}</p>
      </div>
    </div>
  );

}
export default ProfilePage;