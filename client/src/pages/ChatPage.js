import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import ConvertTime from '../components/ConvertTime';

const ChatPage = () => {
  const { id } = useParams();
  const messageRef = useRef();
  const myUser = useSelector((state) => state.data.myUser);
  const [conversation, setConversation] = useState(null);

  const sendMessage = () => {
    const user = {
      id,
      username: myUser.username,
      imageUrl: myUser.imageUrl,
      secret: myUser.secret,
      message: messageRef.current.value,
    };

    const options = {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(user),
    };

    fetch('http://localhost:3007/sendMessage', options)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setConversation(data.conversation);
        messageRef.current.value = ''
      });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      fetch('http://localhost:3007/chat/' + id)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setConversation(data.conversation);
        });
    }, 1000); // fetch every 1 seconds

    return () => clearInterval(interval);
  }, [id]);

  const like = (index) => {
    fetch(`http://localhost:3007/like/${id}/${index}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setConversation(data.conversation);
      });
  };

  return (
    <div className="chat">
      <div>
        {conversation?.messages.map((x, i) => (
          <div key={i} className={`singleMessage ${x.username === myUser.username ? 'myMessage' : 'otherMessage'}`}>
            <div className="user-info">
              <img src={x.imageUrl} alt="" id="myProfileImg" />
              <h3>{x.username}</h3>
            </div>
            <div className="single-message-line">
              {x.message.includes('http') ? (
                <img className="chatImage" src={x.message} alt="" />) : (x.message)}
            </div>
            <div>
              <div>
                <div>Likes: {x.likes}</div>
                <div className="chat-date">
                  <b>{ConvertTime(x.time)}</b>
                </div>
                <button
                  className="chat-like-btn-small"
                  onClick={() => like(i)}
                  disabled={myUser.username === x.username}
                >
                  <FontAwesomeIcon icon={faThumbsUp} /> Like
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="chatBottom">
        <input type="text" ref={messageRef} placeholder="message" />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatPage;
