import jwt from 'jsonwebtoken';
import config from '../../config/config';

export const sign = (info: any) => {
  return jwt.sign(JSON.stringify(info), config.JWT_SECRET);
};

export const verify = (token: string) => {
  return jwt.verify(token, config.JWT_SECRET);
};
