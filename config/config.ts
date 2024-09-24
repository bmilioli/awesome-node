const config = {
  DB_URL:
    'mongodb+srv://user:password@database.xxxx.mongodb.net/Colection?retryWrites=true&w=majority',
  PORT: 3000,
  JWT_SECRET: 'YOUR_SECRET_KEY',
  version: '1.0.0',
  origin: '*',
  env: 'prod',
  frontUrl: 'https://frontend.io/',
  timezone: 'America/New_York',
  mailerTransportData: {
    dev: {
      host: 'sandbox.smtp.mailtrap.io',
      port: 2525,
      auth: {
        user: '11111111',
        pass: 'xxxxxxxx',
      },
    },
    prod: {
      smtp: {
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
          user: 'email@google.com',
          pass: 'yourpassword',
        },
      },
      simple: {
        service: 'gmail.com',
        auth: {
          user: 'email@google.com',
          pass: 'yourpassword',
        },
      },
    },
  },
};

export default config;
