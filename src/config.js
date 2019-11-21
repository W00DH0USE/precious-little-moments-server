module.exports = {
  PORT: process.env.PORT || 8000,
  NODE_ENV: process.env.NODE_ENC || 'development',
  DB_URL: process.env.DATABASE_URL || 'postgresql://postgresql@localhost/mandalorianfriends',
  JWT_SECRET: process.env.JWT_SECRET || 'mandalorian',
  API_KEY: 'starwars',
}