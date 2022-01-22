module.exports = ({ env }) => ({
  // ...
  email: {
    config: {
      provider: 'nodemailer',
      providerOptions: {
        host: env('SMTP_HOST', 'smtp.163.com'),
        port: env('SMTP_PORT', 465),
        auth: {
          user: 'lingthinksys@163.com',
          pass: 'DCWZJYLMAKUISQVH',
        },
        // ... any custom nodemailer options
      },
      settings: {
        defaultFrom: 'lingthinksys@163.com',
        defaultReplyTo: 'gonorth@qq.com',
        testAddress: 'gonorth@lingthink.com',
      },
    },
  },
  // ...
});
