const bcrypt = require('bcrypt');
const uid = require('uid');
const userSchema = require('../schemas/userSchema');

module.exports = {
  register: async (req, res) => {
    const { username, password, imageUrl } = req.body;

    const hashedPass = await bcrypt.hash(password, 10);

    const userInDb = new userSchema({
      secret: uid.uid(),
      username,
      password: hashedPass,
      imageUrl,
    });

    await userInDb.save();

    res.send({ success: true, message: '' });
  },
  login: async (req, res) => {
    const { username } = req.body;
    const userExists = await userSchema.findOne({ username });

    if (!userExists)
      return res.send({ success: false, message: 'Bad credentials' });

    return res.send({
      success: true,
      message: '',
      secret: userExists.secret,
      username: userExists.username,
      imageUrl: userExists.imageUrl,
    });
  },
  updatePhoto: async (req, res) => {
    const { secret, imageUrl } = req.body;

    const user = await userSchema.findOne({ secret });
    if (!user) {
      return res
        .status(404)
        .send({ success: false, message: 'User not found' });
    }

    user.imageUrl = imageUrl;
    await user.save();

    res.send({ success: true, message: '', user });
  },


  updateName: async (req, res) => {
    const { secret, newName } = req.body;

    const user = await userSchema.findOne({ secret });
    if (!user) {
      return res
        .status(404)
        .send({ success: false, message: 'User not found' });
    }


    user.username = newName;
    await user.save();


    res.send({ success: true, message: '', user });
  },

  updatePassword: async (req, res) => {
    const { secret, newPassword } = req.body;
    
    const user = await userSchema.findOne({ secret });
    if (!user) {
      return res
        .status(404)
        .send({ success: false, message: 'User not found' });
    }

    user.password = newPassword;
    await user.save();

    res.send({ success: true, message: '', user });
  },

  checkUsername:async (req, res) => {
    try {
      const username = req.params.username;
      const user = await userSchema.findOne({ username });
      if (user) {
        res.json({ success: true });
      } else {
        res.json({ success: false });
      }
    } catch (error) {
      console.error(error);
      res.json({ success: false, message: error.message });
    }
  },

  getUserImage: async (req, res) => {
    const secret = req.params.secret;
    const user = await userSchema.findOne({ secret });

    if (!user) {
      return res
        .status(404)
        .send({ success: false, message: 'User not found' });
    }

    const imageUrl = user.imageUrl;

    res.send({ success: true, message: '', imageUrl });
  },
  getAllUsers: async (req, res) => {
    try {
      const allUsers = await userSchema.find();
      res.send(allUsers);
    } catch (err) {
      console.error(err);
      res.status(500).send({ success: false, message: 'Server error' });
    }
  },
  
  getUserProfile: async (req, res) => {
    const username = req.params.username;
    const user = await userSchema.findOne({ username });

    if (!user) {
      return res
        .status(404)
        .send({ success: false, message: 'User not found' });
    }


    res.send({
      success: true,
      message: '',
      user: {
        id: user._id,
        username: user.username,
        imageUrl: user.imageUrl,
        secret: user.secret,
      },
    });
  },
};




