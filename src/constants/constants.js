module.exports = {
  USER_ROLES: ['admin', 'user'],
  SALT_ROUNDS: 5,
  ACCESS_TOKEN_TIME: 60 * 60 * 24,
  JWT_SECRET: process.env.JWT_SECRET
}