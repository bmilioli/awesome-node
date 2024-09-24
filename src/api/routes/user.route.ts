import express from 'express';
import jwtMiddleware from '../middlewares/jwt.middleware';
import * as userController from '../controllers/user.controller';

const router = express.Router();

router.post('/create', (req, res) => {
  userController.createUser(req, res);
});

router.post('/login', (req, res) => {
  userController.login(req, res);
});

router.get('/getById/:id', (req, res) => {
  userController.getUserById(req, res);
});

router.get('/activeAccount/:confirmCode', (req, res) => {
  userController.activeAccount(req, res);
});

router.post('/forgotPassword', (req, res) => {
  userController.forgotPassword(req, res);
});

router.post('/renewPassword', (req, res) => {
  userController.renewPassword(req, res);
});

router.get('/listProjectsByUser/:id', jwtMiddleware, (req, res) => {
  userController.listProjectsByUser(req, res);
});

router.post('/updateUser', jwtMiddleware, (req, res) => {
  userController.updateUser(req, res);
});

router.post('/updatePassword', jwtMiddleware, (req, res) => {
  userController.updatePassword(req, res);
});

export default router;
