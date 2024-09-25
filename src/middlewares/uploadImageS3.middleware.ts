import multer from 'multer';
import multerS3 from 'multer-s3';
import s3 from '../../config/aws.config';

export const uploadImageS3 = multer({
  storage: multerS3({
    s3,
    bucket: 'filmlist.io',
    acl: 'public-read',
    key(req, file, cb) {
      const folder_name = 'images/';
      cb(null, folder_name + Date.now().toString() + '-' + file.originalname);
    },
  }),
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
  fileFilter(req, file, cb) {
    if (/^image\/(jpeg|png|gif|bmp|webp)$/.test(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('File type not supported. Only image files are allowed.'));
    }
  },
});
