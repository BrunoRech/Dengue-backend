const { promisify } = require('util');
const jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {
  try {
    const auth = req.headers.authorization;
    const [, token] = auth.split(' ');
    const codigo = await promisify(jwt.verify)(token, process.env.APP_SECRET);
    req.userId = codigo.id;
    return next();
  } catch (error) {
    return res
      .status(401)
      .json([{ msg: 'Sessão expirada, realize o login novamente' }]);
  }
};
