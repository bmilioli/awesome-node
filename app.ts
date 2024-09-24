import express, { NextFunction, Request, Response } from 'express';
import config from './config/config';
import path from 'path';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';

import userRoute from './src/routes/user.route';
import fileRoute from './src/routes/file.route';

const server = express();
const port = config.PORT;

mongoose.connect(config.DB_URL, {});

// config for angular server
server.use(express.static('fe'));

server.get('/appversion', (req, res) => {
  res.status(200).json({ version: config.version });
});

// server start

server.use(bodyParser.json({ limit: '50mb' }));
server.use(bodyParser.urlencoded({ extended: true }));
server.use(cors({ origin: config.origin, credentials: true }));
//server.use(pdf);

server.use('/user', userRoute);
server.use('/file', fileRoute);

server.listen(port, async () => {
  await new Promise((resolve, reject) => setTimeout(resolve, 1000));
  console.clear();
  console.log('Product by: Milioli Solutions');
  console.log('----------------------------------------');
});
