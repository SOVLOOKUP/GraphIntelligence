module.exports = ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  url: env('PUBLIC_URL', 'https://api.lingthink.com:4443'),
  port: env.int('PORT', 1337),
})
