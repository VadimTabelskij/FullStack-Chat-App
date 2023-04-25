const express = require('express');

const router = express.Router();
const {
  register,
  login,
  updatePhoto,
  getUserImage,
  getAllUsers,
  getUserProfile,
  updateName,
  updatePassword,
  checkUsername,
} = require('../controllers/authController');

const {
  createConversation,
  allConversations,
  getChat,
  sendMessage,
  likeMessage,
  deleteConversation,
} = require('../controllers/chatController');


const loggedIn = require('../middleware/loggedIn');

router.post('/register', register);
router.post('/login', login);

router.post('/updatePhoto', updatePhoto);
router.put('/updateName', updateName);
router.put('/updatePassword', updatePassword);

router.get('/getUserImage/:secret', getUserImage);

router.get('/allUsers', getAllUsers);
router.get('/user/:username', getUserProfile);
router.get('/checkUsername/:username', checkUsername);


router.post('/newConversation', loggedIn, createConversation);
router.post('/getConversations', loggedIn, allConversations);
router.delete('/conversation/:id', deleteConversation);

router.get('/chat/:id', getChat);
router.post('/sendMessage', loggedIn, sendMessage);
router.get('/like/:id/:index', likeMessage);

module.exports = router;
