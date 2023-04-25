import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const SingleConversatonCard = ({ item, onDelete }) => {
  const nav = useNavigate();
  const myUser = useSelector((state) => state.data.myUser);

  const filterName = () => {
    return item.participants.filter((x) => x !== myUser.username);
  };

  const deleteConversation = async () => {
    const options = {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
      },
    };

    await fetch(`http://localhost:3007/conversation/${item._id}`, options);
    onDelete(item._id); 
  };

  return (
    <div className="singleConvo">
      <h2>Conversation with: {filterName()[0]}</h2>
      <h4>Messages: {item.messages.length}</h4>
      <button onClick={() => nav('/chat/' + item._id)}>Send Massage</button>
      <button onClick={() => deleteConversation()}>Delete</button>
    </div>
  );
};

export default SingleConversatonCard;
