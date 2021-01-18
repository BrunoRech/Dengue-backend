require('dotenv').config({
  path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env',
});

module.exports = {
  dialect: process.env.DB_DIALECT || 'postgres',
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PSWD,
  database: process.env.DB_DATABASE,
  storage: './__tests__/database.sqlite',
  define: {
    timestamps: false,
    underscored: false,
  },
};
