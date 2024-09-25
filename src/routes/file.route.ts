import express from 'express';
import jwtMiddleware from '../middlewares/jwt.middleware';
import { uploadImageS3 } from '../middlewares/uploadImageS3.middleware';
import * as fileController from '../controllers/file.controller';

const router = express.Router();

router.post(
  '/uploadImage',
  jwtMiddleware,
  uploadImageS3.single('image'),
  fileController.uploadImageS3,
);

export default router;
