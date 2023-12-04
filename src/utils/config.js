const config = () => ({
    db_user: process.env.DB_USER || 'BECHU',
    db_host: process.env.DB_HOST || 'BECHU',
    db_password: process.env.DB_PASSWORD || 'BECHU',
    db_name: process.env.DB_NAME || 'BECHU'
  })

  module.exports = config