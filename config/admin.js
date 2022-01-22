module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', '6b7e52dfec5ef9fdf574de2b37a86537'),
  },
});
