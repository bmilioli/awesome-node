import * as jwtUtil from '../utils/jwt.util';
import { Request, Response } from 'express';
import { NextFunction } from 'connect';
import * as userRepo from '../repositories/user.repo';

const jwt = (req: Request, res: Response, next: NextFunction) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization.toString().split(' ')[1];
    try {
      const user: any = jwtUtil.verify(token);
      if (user) {
        userRepo.getById(user._id).then(
          (userRes: any) => {
            if (!userRes) {
              res.status(401).json({ message: 'User is not exist' });
              return;
            }
            if (!userRes.active) {
              res
                .status(401)
                .json({ message: 'The account need to confirm the email' });
              return;
            }
            req.body.user = user;
            next();
            return;
          },
          (err) => {
            res.status(401);
            res.send('Unauthorized');
          },
        );
      } else {
        res.status(401);
        res.send('Unauthorized');
      }
    } catch (exception) {
      res.status(401);
      res.send('Unauthorized');
    }
  } else {
    res.status(401);
    res.send('Unauthorized');
  }
};

export default jwt;
