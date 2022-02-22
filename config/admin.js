module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', '50661422271862141abdace0f2e5cd7e'),
  },
});
