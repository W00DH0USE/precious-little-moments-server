module.exports = {
  PORT: process.env.PORT || 8000,
  NODE_ENV: process.env.NODE_ENC || 'development',
  DATABASE_URL: process.env.DATABASE_URL || 'postgresql://postgresql@localhost/mandalorianfriends',
  TEST_DATABASE_URL: process.env.TEST_DATABASE_URL || 'postgresql://postgresql@localhost/mandalorianfriends',
  JWT_SECRET: process.env.JWT_SECRET || 'mandalorian',
  API_KEY: process.env.API_KEY,
}