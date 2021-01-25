const jwt = require('jsonwebtoken');
const { promisify } = require('util');

module.exports = async (req, res, next) => {
  const auth = req.headers.authorization;
  if (!auth) {
    return res.status(401).json({});
  }

  const [, token] = auth.split(' ');
  try {
    const codigo = await promisify(jwt.verify)(token, process.env.APP_SECRET);
    req.userId = codigo.id;
    return next();
  } catch (error) {
    return res
      .status(401)
      .json([{ msg: 'Sessão expirada, realize o login novamente' }]);
  }
};
