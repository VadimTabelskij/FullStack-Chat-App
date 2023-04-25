import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import SingleConversatonCard from '../components/SingleConversatonCard';

const ConversationPage = () => {
  const myUser = useSelector((state) => state.data.myUser);

  const [convos, setConvos] = useState([]);

  useEffect(() => {
    const data = {
      secret: myUser.secret,
      username: myUser.username,
    };

    const options = {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(data),
    };

    fetch('http://localhost:3007/getConversations', options)
      .then((res) => res.json())
      .then((data) => {
        setConvos(data.conversations);
        console.log(data);
      });
  }, [myUser.secret, myUser.username]);

  const handleDelete = (id) => {
    const updatedConvos = convos.filter((convo) => convo._id !== id);
    setConvos(updatedConvos);
  };

  return (
    <div className="convers-page">
      <div>
        {convos.map((x, i) => (
          <SingleConversatonCard item={x} key={i} onDelete={handleDelete} />
        ))}
      </div>
    </div>
  );
};

export default ConversationPage;
