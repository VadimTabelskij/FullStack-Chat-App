const userSchema = require('../schemas/userSchema');

module.exports = async (req, res, next) => {
  const { secret } = req.body;

  const myUser = await userSchema.findOne({ secret });

  if (!myUser) return res.send({ error: true, message: 'bad auth' });
  req.body.username = myUser.username;

  next();
};
